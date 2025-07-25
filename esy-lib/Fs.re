let toRunAsync = (~desc="I/O failed", promise) => {
  open RunAsync.Syntax;
  try%lwt(
    {
      let%lwt v = promise();
      return(v);
    }
  ) {
  | Unix.Unix_error(err, _, _) =>
    let msg = Unix.error_message(err);
    error(Printf.sprintf("%s: %s", desc, msg));
  };
};

let readFile = (path: Path.t) => {
  let path = Path.show(path);
  let desc = Printf.sprintf("Unable to read file %s", path);
  toRunAsync(
    ~desc,
    () => {
      let f = ic => Lwt_io.read(ic);
      Lwt_io.with_file(~mode=Lwt_io.Input, path, f);
    },
  );
};

let writeFile = (~perm=?, ~data, path: Path.t) => {
  let path = Path.show(path);
  let desc = Printf.sprintf("Unable to write file %s", path);
  toRunAsync(
    ~desc,
    () => {
      let f = oc => Lwt_io.write(oc, data);
      Lwt_io.with_file(~perm?, ~mode=Lwt_io.Output, path, f);
    },
  );
};

let openFile = (~mode, ~perm, path) =>
  toRunAsync(() => Lwt_unix.openfile(Path.show(path), mode, perm));

let readJsonFile = (path: Path.t) => {
  open RunAsync.Syntax;
  let* data = readFile(path);
  try(return(Yojson.Safe.from_string(data))) {
  | Yojson.Json_error(msg) =>
    errorf("while reading JSON file: %a@\n%s", Path.pp, path, msg)
  };
};

let writeJsonFile = (~json, path) => {
  let data = Yojson.Safe.pretty_to_string(json);
  writeFile(~data, path);
};

let exists = (path: Path.t) => {
  let path = Path.show(path);
  let%lwt exists = Lwt_unix.file_exists(path);
  RunAsync.return(exists);
};

let chmod = (permission, path: Path.t) =>
  RunAsync.contextf(
    try%lwt({
      let path = Path.show(path);
      let%lwt () = Lwt_unix.chmod(path, permission);
      RunAsync.return();
    }) {
    | Unix.Unix_error(errno, _, _) =>
      let msg = Unix.error_message(errno);
      RunAsync.error(msg);
    },
    "changing permissions for path %a",
    Path.pp,
    path,
  );

let createDirLwt = (~perms=0o777, path: Path.t) => {
  let rec create = path =>
    try%lwt({
      let path = Path.show(path);
      let%lwt () = Lwt_unix.mkdir(path, perms);
      Lwt.return(`Created);
    }) {
    | Unix.Unix_error(Unix.EEXIST, _, _) => Lwt.return(`AlreadyExists)
    | Unix.Unix_error(Unix.ENOENT, _, _) =>
      let%lwt _ = create(Path.parent(path));
      create(path);
    };

  create(path);
};

let createDir = (path: Path.t) => {
  let rec create = path =>
    try%lwt({
      let path = Path.show(path);
      Lwt_unix.mkdir(path, 0o777);
    }) {
    | Unix.Unix_error(Unix.EEXIST, _, _) => Lwt.return()
    | Unix.Unix_error(Unix.ENOENT, _, _) =>
      let%lwt () = create(Path.parent(path));
      let%lwt () = create(path);
      Lwt.return();
    };

  let%lwt () = create(path);
  RunAsync.return();
};

let stat = (path: Path.t) => {
  let path = Path.show(path);
  switch%lwt (Lwt_unix.stat(path)) {
  | stats => RunAsync.return(stats)
  | exception (Unix.Unix_error(Unix.ENOTDIR, "stat", _)) =>
    RunAsync.error("unable to stat")
  | exception (Unix.Unix_error(Unix.ENOENT, "stat", _)) =>
    RunAsync.error("unable to stat")
  };
};

let lstat = (path: Path.t) => {
  let path = Path.show(path);
  try%lwt(
    {
      let%lwt stats = Lwt_unix.lstat(path);
      RunAsync.return(stats);
    }
  ) {
  | Unix.Unix_error(error, _, _) =>
    RunAsync.error(Unix.error_message(error))
  };
};

let isDir = (path: Path.t) =>
  switch%lwt (stat(path)) {
  | Ok({st_kind: Unix.S_DIR, _}) => RunAsync.return(true)
  | Ok({st_kind: _, _}) => RunAsync.return(false)
  | Error(_) => RunAsync.return(false)
  };

let isDirSync = path =>
  try(Sys.is_directory(Path.show(path))) {
  | _ => false
  };

let unlink = (path: Path.t) => {
  let path = Path.show(path);
  let%lwt () = Lwt_unix.unlink(path);
  RunAsync.return();
};

let rec rename = (~attempts=8, ~skipIfExists=false, ~src, target) => {
  open RunAsync.Syntax;
  let srcString = Path.show(src);
  let targetString = Path.show(target);
  let%bind destExists = exists(target);
  if (skipIfExists && destExists) {
    let%lwt () = Logs_lwt.debug(m => m("Dest (%s) exists", targetString));
    RunAsync.return();
  } else {
    let%lwt () =
      Logs_lwt.debug(m =>
        m("rename %a -> %a", Path.pp, src, Path.pp, target)
      );
    try%lwt(
      {
        let%lwt () =
          if (Sys.unix) {
            Lwt_unix.rename(srcString, targetString);
          } else {
            System.moveFile(srcString, targetString);
            Lwt.return();
          };
        RunAsync.return();
      }
    ) {
    | Unix.Unix_error(Unix.ENOENT, "rename", filename) =>
      RunAsync.errorf("no such file: %s", filename)
    | Unix.Unix_error(Unix.ENOTEMPTY, "rename", filename)
    | Unix.Unix_error(Unix.EEXIST, "rename", filename) =>
      if (skipIfExists) {
        RunAsync.return();
      } else {
        RunAsync.errorf("destination already exists: %s", filename);
      }
    | Unix.Unix_error(Unix.EXDEV, "rename", filename) =>
      let%lwt () =
        Logs_lwt.debug(m =>
          m("rename of %s failed with EXDEV, trying `mv`", filename)
        );
      let cmd = Printf.sprintf("mv %s %s", srcString, targetString);
      if (Sys.command(cmd) == 0) {
        RunAsync.return();
      } else {
        RunAsync.errorf("Unable to rename %s to %s", srcString, targetString);
      };
    | Unix.Unix_error(Unix.EACCES, "rename", _) when attempts > 1 =>
      if%bind (exists(target)) {
        let%lwt () = Logs_lwt.debug(m => m("Dest (%s) exists", targetString));
        RunAsync.return();
      } else {
        let%lwt () = Lwt_unix.sleep(1.);
        let attempts = attempts - 1;
        rename(~attempts, ~skipIfExists, ~src, target);
      }
    };
  };
};

let no = _path => false;

let fold =
    (
      ~skipTraverse=no,
      ~f: ('a, Path.t, Unix.stats) => RunAsync.t('a),
      ~init: 'a,
      path: Path.t,
    ) => {
  open RunAsync.Syntax;
  let rec visitPathItems = (acc, path, dir) =>
    switch%lwt (Lwt_unix.readdir(dir)) {
    | exception End_of_file => return(acc)
    | "."
    | ".." => visitPathItems(acc, path, dir)
    | name =>
      let%lwt acc = visitPath(acc, Path.(path / name));
      switch (acc) {
      | Ok(acc) => visitPathItems(acc, path, dir)
      | Error(_) => Lwt.return(acc)
      };
    }
  and visitPath = (acc: 'a, path) =>
    if (skipTraverse(path)) {
      return(acc);
    } else {
      let spath = Path.show(path);
      let%lwt stat = Lwt_unix.lstat(spath);
      switch (stat.Unix.st_kind) {
      | Unix.S_DIR =>
        let%lwt _ = f(acc, path, stat);
        let%lwt dir = Lwt_unix.opendir(spath);
        Lwt.finalize(
          () => visitPathItems(acc, path, dir),
          () => Lwt_unix.closedir(dir),
        );
      | _ => f(acc, path, stat)
      };
    };

  visitPath(init, path);
};

let listDir = path =>
  switch%lwt (Lwt_unix.opendir(Path.show(path))) {
  | exception (Unix.Unix_error(Unix.ENOENT, "opendir", _)) =>
    RunAsync.errorf("cannot read the directory: %s", Fpath.to_string(path))
  | exception (Unix.Unix_error(Unix.ENOTDIR, "opendir", _)) =>
    RunAsync.errorf("not a directory: %s", Fpath.to_string(path))
  | dir =>
    let rec readdir = (names, ()) =>
      switch%lwt (Lwt_unix.readdir(dir)) {
      | exception End_of_file => RunAsync.return(names)
      | "."
      | ".." => readdir(names, ())
      | name => readdir([name, ...names], ())
      };

    Lwt.finalize(readdir([]), () => Lwt_unix.closedir(dir));
  };

let traverse = (~skipTraverse=?, ~f, path) => {
  let f = (_, path, stat) => f(path, stat);
  fold(~skipTraverse?, ~f, ~init=(), path);
};

let copyStatLwt = (~stat, path) =>
  switch (System.Platform.host) {
  | Windows => Lwt.return() /* copying these stats is not necessary on Windows, and can cause Permission Denied errors */
  | _ =>
    let path = Path.show(path);
    let%lwt () =
      Lwt_unix.utimes(path, stat.Unix.st_atime, stat.Unix.st_mtime);
    let%lwt () = Lwt_unix.chmod(path, stat.Unix.st_perm);
    let%lwt () =
      try%lwt(Lwt_unix.chown(path, stat.Unix.st_uid, stat.Unix.st_gid)) {
      | Unix.Unix_error(Unix.EPERM, _, _) => Lwt.return()
      };
    Lwt.return();
  };

let copyFileLwt = (~src, ~dst) => {
  let origPathS = Path.show(src);
  let destPathS = Path.show(dst);

  let chunkSize = 1024 * 1024 /* 1mb */;

  let%lwt stat = Lwt_unix.stat(origPathS);

  let copy = (ic, oc) => {
    let buffer = Bytes.create(chunkSize);
    let rec loop = () =>
      switch%lwt (Lwt_io.read_into(ic, buffer, 0, chunkSize)) {
      | 0 => Lwt.return()
      | bytesRead =>
        let%lwt () = Lwt_io.write_from_exactly(oc, buffer, 0, bytesRead);
        loop();
      };
    loop();
  };

  let%lwt () =
    Lwt_io.with_file(
      origPathS, ~flags=Lwt_unix.[O_RDONLY], ~mode=Lwt_io.Input, ic =>
      Lwt_io.with_file(
        ~mode=Lwt_io.Output,
        ~flags=Lwt_unix.[O_WRONLY, O_CREAT, O_TRUNC],
        ~perm=stat.Unix.st_perm,
        destPathS,
        copy(ic),
      )
    );

  let%lwt () = copyStatLwt(~stat, dst);
  Lwt.return();
};

let copyFile = (~src, ~dst) =>
  try%lwt(
    {
      let%lwt () = copyFileLwt(~src, ~dst);
      let%lwt stat = Lwt_unix.stat(Path.show(src));
      let%lwt () = copyStatLwt(~stat, dst);
      RunAsync.return();
    }
  ) {
  | Unix.Unix_error(error, fn, param) =>
    RunAsync.errorf(
      "Error: %s Function: %s Param: %s",
      Unix.error_message(error),
      fn,
      param,
    )
  };

let rec copyPathLwt = (~hardlinks, ~src, ~dst) => {
  let origPathS = Path.show(src);
  let destPathS = Path.show(dst);
  let%lwt stat = Lwt_unix.lstat(origPathS);
  switch (stat.st_kind) {
  | S_REG =>
    if (hardlinks) {
      try%lwt(Lwt_unix.link(origPathS, destPathS)) {
      | Unix.Unix_error(Unix.EEXIST, _fn, _param) => Lwt.return()
      | e => Lwt.fail(e)
      };
    } else {
      let%lwt () = copyFileLwt(~src, ~dst);
      let%lwt () = copyStatLwt(~stat, dst);
      Lwt.return();
    }
  | S_LNK =>
    let%lwt link = Lwt_unix.readlink(origPathS);
    Lwt_unix.symlink(link, destPathS);
  | S_DIR =>
    /* Skip .git directories to avoid permission issues with read-only files */
    let basename = Path.basename(src);
    if (basename == ".git") {
      Lwt.return();
    } else {
      let%lwt _ = createDirLwt(dst, ~perms=0o700);
      let rec traverseDir = dir =>
        switch%lwt (Lwt_unix.readdir(dir)) {
        | exception End_of_file => Lwt.return()
        | "."
        | ".." => traverseDir(dir)
        | name =>
          let%lwt () =
            copyPathLwt(
              ~hardlinks,
              ~src=Path.(src / name),
              ~dst=Path.(dst / name),
            );
          traverseDir(dir);
        };

      let%lwt dir = Lwt_unix.opendir(origPathS);
      let%lwt () =
        Lwt.finalize(() => traverseDir(dir), () => Lwt_unix.closedir(dir));

      let%lwt () = copyStatLwt(~stat, dst);

      Lwt.return();
    };
  | _ =>
    /* XXX: Skips special files: should be an error instead? */
    Lwt.return()
  };
};

let copyPath' = (~hardlinks, ~src, ~dst) => {
  open RunAsync.Syntax;
  let* () = createDir(Path.parent(dst));
  try%lwt(
    {
      let%lwt () = copyPathLwt(~hardlinks, ~src, ~dst);
      RunAsync.return();
    }
  ) {
  | Unix.Unix_error(Unix.EEXIST, _fn, _param) => return()
  | Unix.Unix_error(error, fn, param) =>
    RunAsync.errorf(
      "Function: copyPath' Params: hardlinks %b src: %a dst %a Unix Error: %s Unix Function: %s Unix Param: %s",
      hardlinks,
      Path.pp,
      src,
      Path.pp,
      dst,
      Unix.error_message(error),
      fn,
      param,
    )
  };
};

let copyPath = copyPath'(~hardlinks=false);
let hardlinkPath = copyPath'(~hardlinks=true);

let rec rmPathLwt = path => {
  let pathS = Path.show(path);
  let%lwt stat = Lwt_unix.lstat(pathS);
  switch (stat.st_kind) {
  | S_DIR =>
    let rec traverseDir = dir =>
      switch%lwt (Lwt_unix.readdir(dir)) {
      | exception End_of_file => Lwt.return()
      | "."
      | ".." => traverseDir(dir)
      | name =>
        let%lwt () = rmPathLwt(Path.(path / name));
        traverseDir(dir);
      };

    let%lwt dir = Lwt_unix.opendir(pathS);
    let%lwt () =
      Lwt.finalize(() => traverseDir(dir), () => Lwt_unix.closedir(dir));

    Lwt_unix.rmdir(pathS);
  | S_LNK => Lwt_unix.unlink(pathS)
  | _ =>
    let%lwt () = Lwt_unix.chmod(pathS, 0o640);
    Lwt_unix.unlink(pathS);
  };
};

let rmPath = path => {
  /* `Fs.rmPath` needs the same fix we made for `Bos.OS.Path.delete`
   * readonly files need to have their readonly bit off just before
   * deleting. (https://github.com/esy/esy/pull/1122)
   * Temporarily commenting `Fs.rmPath` and using the Bos
   * equivalent as a stopgap.
   */
  Bos.OS.Path.delete(~must_exist=false, ~recurse=true, path)
  |> Run.ofBosError
  |> Lwt.return;
};

let randGen = lazy(Random.State.make_self_init());

let randPath = (dir, pat) => {
  let rand = Random.State.bits(Lazy.force(randGen)) land 0xFFFFFF;
  Fpath.(dir / Astring.strf(pat, Astring.strf("%06x", rand)));
};

let randomPathVariation = path => {
  open RunAsync.Syntax;
  let rec make = retry => {
    let rand = Random.State.bits(Lazy.force(randGen)) land 0xFFFFFF;
    let ext = Astring.strf(".%06x", rand);
    let rpath = Path.(path |> addExt(ext));
    if%bind (exists(rpath)) {
      if (retry <= 0) {
        errorf("unable to generate a random path for %a", Path.pp, path);
      } else {
        make(retry - 1);
      };
    } else {
      return(rpath);
    };
  };

  make(3);
};

let createRandomPath = (path, pattern) => {
  let rec make = retry => {
    let rpath = randPath(path, pattern);
    switch%lwt (createDirLwt(rpath)) {
    | `Created => RunAsync.return(rpath)
    | `AlreadyExists =>
      if (retry <= 0) {
        RunAsync.errorf(
          "unable to create a temporary path at %a",
          Path.pp,
          path,
        );
      } else {
        make(retry - 1);
      }
    };
  };

  make(3);
};

let withTempDir = (~tempPath=?, f) => {
  open RunAsync.Syntax;
  let tempPath =
    switch (tempPath) {
    | Some(tempPath) => tempPath
    | None => Path.v(Filename.get_temp_dir_name())
    };

  let* path = createRandomPath(tempPath, "esy-%s");
  Lwt.finalize(
    () => f(path),
    () =>
      /* never fail on removing a temp folder. */
      switch%lwt (rmPath(path)) {
      | Ok () => Lwt.return()
      | Error(_) => Lwt.return()
      },
  );
};

let withTempFile = (~data, f) => {
  let path = Filename.temp_file("esy", "tmp");

  let%lwt () = {
    let writeContent = oc => {
      let%lwt () = Lwt_io.write(oc, data);
      let%lwt () = Lwt_io.flush(oc);
      Lwt.return();
    };

    Lwt_io.with_file(~mode=Lwt_io.Output, path, writeContent);
  };

  Lwt.finalize(
    () => f(Path.v(path)),
    () =>
      /* never fail on removing a temp file. */
      try%lwt(Lwt_unix.unlink(path)) {
      | Unix.Unix_error(_) => Lwt.return()
      },
  );
};

let readlink = (path: Path.t) => {
  open RunAsync.Syntax;
  let path = Path.show(path);
  try%lwt(
    {
      let%lwt link = Lwt_unix.readlink(path);
      return(Path.v(link));
    }
  ) {
  | Unix.Unix_error(err, _, _) =>
    errorf("readlink %s: %s", path, Unix.error_message(err))
  };
};

let readlinkOpt = (path: Path.t) => {
  open RunAsync.Syntax;
  let path = Path.show(path);
  try%lwt(
    {
      let%lwt link = Lwt_unix.readlink(path);
      return(Some(Path.v(link)));
    }
  ) {
  | Unix.Unix_error(ENOENT, _, _) => return(None)
  | Unix.Unix_error(err, _, _) =>
    errorf("readlink %s: %s", path, Unix.error_message(err))
  };
};

let symlink = (~force=false, ~src, dst) => {
  open RunAsync.Syntax;

  let symlink' = (src, dst) => {
    let src = Path.show(src);
    let dst = Path.show(dst);
    try%lwt(
      {
        let%lwt () = Lwt_unix.symlink(src, dst);
        Lwt.return(Ok());
      }
    ) {
    | Unix.Unix_error(err, _, _) => Lwt.return(Error(err))
    };
  };

  let mkError = err =>
    errorf(
      "symlink %a -> %a: %s",
      Path.pp,
      src,
      Path.pp,
      dst,
      Unix.error_message(err),
    );

  switch%lwt (symlink'(src, dst)) {
  | Ok () => return()
  | Error(Unix.EEXIST) when force =>
    /* try rm path but ignore errors */
    let%lwt _: Run.t(unit) = rmPath(dst);
    switch%lwt (symlink'(src, dst)) {
    | Ok () => return()
    | Error(err) => mkError(err)
    };
  | Error(err) => mkError(err)
  };
};

let realpath = path => {
  open RunAsync.Syntax;
  let path =
    if (Fpath.is_abs(path)) {
      path;
    } else {
      let cwd = Path.v(Sys.getcwd());
      path |> Fpath.append(cwd) |> Fpath.normalize;
    };

  let isSymlinkAndExists = path =>
    switch%lwt (lstat(path)) {
    | Ok({Unix.st_kind: Unix.S_LNK, _}) => return(true)
    | _ => return(false)
    };

  let rec aux = path =>
    if (Fpath.is_root(path)) {
      return(path);
    } else {
      let* isSymlink = isSymlinkAndExists(path);
      if (isSymlink) {
        let* target = readlink(path);
        aux(target |> Fpath.append(Fpath.parent(path)) |> Fpath.normalize);
      } else {
        let parentPath = path |> Fpath.parent |> Fpath.rem_empty_seg;
        let* parentPath = aux(parentPath);
        return(Path.(parentPath / Fpath.basename(path)));
      };
    };

  aux(Path.normalize(path));
};
