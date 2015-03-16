/*global require */
var gulp = require("gulp");
var gutil = require("gulp-util");
var browserify = require("browserify");
var less = require("gulp-less");
var livereload = require("gulp-livereload");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var nodemon = require("gulp-nodemon");
var source = require("vinyl-source-stream");
var Q = require("q");
var watchify = require("watchify");

var rebundle;
var jsReloaded = Q.defer();
gulp.task("js", function () {
    "use strict";
    if (rebundle === undefined) {
        var bundler = browserify({
            entries: ["./src/js/browser-entrypoint.js"],
            cache: {},
            packageCache: {},
            fullPaths: true
        });
        bundler = watchify(bundler);

        rebundle = function () {
            var stream = bundler.bundle();
            stream.on("error", function (err) {
                gutil.log("Browserify Error " + err);
                stream.end();
            });
            stream = stream.pipe(source("script.js"));
            stream = stream.pipe(gulp.dest("build/"));
            stream.on("finish", function () {
                jsReloaded.resolve();
                jsReloaded = Q.defer();
            });
            return stream;
        };
    }
    rebundle();
    return jsReloaded.promise;
});

gulp.task("less", function () {
    "use strict";
    var stream = gulp.src("src/less/main.less");
    stream = stream.pipe(less());
    stream.on("error", function (err) {
        gutil.log("Less error " + err);
    });
    stream = stream.pipe(rename("style.css"));
    stream = stream.pipe(gulp.dest("build/"));
    stream = stream.pipe(livereload());

});


gulp.task("less_watch", function () {
    "use strict";
    gulp.watch("src/less/**/*.less", ["less"]);
});

gulp.task("images", function () {
    "use strict";
    gulp.src(["src/image/**/*"]).pipe(gulp.dest("build/image"));
});


gulp.task("images_watch", function () {
    "use strict";
    gulp.watch("src/image/**/*", ["images"]);
});


gulp.task("server_reload", ["server"], function (cb) {
    "use strict";
    livereload.changed("script.js");
    cb();
});

var server;
var serverReloaded = Q.defer();
gulp.task("server", ["js"], function () {
    "use strict";
    if (server === undefined) {
        server = nodemon({
            script: "src/js/server-entrypoint.js",
            ext: "js",
            watch: ["/dev/null"],
            stdout: false
        })
            .on("crash", function () {
                console.log(arguments);
                serverReloaded.resolve();
                serverReloaded = Q.defer();
            })
            .on("error", function () {
                console.log(arguments);
            })
            .on("readable", function () {
                this.stdout.on("data", function (data) {
                    process.stdout.write(data);
                    serverReloaded.resolve();
                    serverReloaded = Q.defer();
                });
                this.stderr.on("data", function (data) {
                    process.stderr.write(data);
                });
            });
        gulp.watch("src/js/**/*.js", ["server_reload"]);
    } else {
        var promise = serverReloaded.promise;
        server.emit("restart");
        return promise;
    }
});

gulp.task("default", ["less", "less_watch", "js", "images", "images_watch", "server"]);
