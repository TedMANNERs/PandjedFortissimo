const gulp = require("gulp");
const del = require("del");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");

const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");

const browserSync = require("browser-sync");
const browserify = require("browserify");
const babelify = require("babelify");

const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

const nodemon = require("gulp-nodemon");

const pkg = require("./package.json");

gulp.task("clean", () =>
  del([pkg.paths.bin_path])
);

gulp.task("build-js", () =>
  browserify({
    entries: pkg.paths.src_client,
    debug: true
  })
    .transform(babelify)
    .bundle()
    .pipe(source(pkg.paths.bin_client))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(pkg.paths.content_path))
    .on("end", browserSync.reload)
);

const processors = [autoprefixer({
  browsers: ["last 2 versions"]
})];

gulp.task("build-css", () =>
  gulp.src(pkg.paths.src_less)
    .pipe(less({
      paths: [pkg.paths.src_less]
    }))
    .pipe(postcss(processors))
    .pipe(gulp.dest(pkg.paths.content_path))
    .pipe(browserSync.stream())
);

gulp.task("build-server", () =>
  gulp.src(pkg.paths.src_server)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(pkg.paths.bin_path))
);

gulp.task("copy-html", () =>
  gulp.src(pkg.paths.src_html)
    .pipe(gulp.dest(pkg.paths.bin_path))
);

gulp.task("run-server", ["build-js", "build-css", "build-server", "copy-html"], () => {
  nodemon({
    script: pkg.paths.bin_path + pkg.paths.bin_server,
    ext: "js",
    watch: ["./bin/"]
  });
});

gulp.task("watch", () => {
  gulp.watch(["src/client/**/*.js", "src/client/**/*.jsx"], ["build-js"]);
  gulp.watch(["src/client/less/*.less"], ["build-css"]);
  gulp.watch(["src/server/**/*.js"], ["build-server"]);
});

gulp.task("browser-sync", () => {
  browserSync({
    proxy: {
      target: "http://localhost:5000"
    },
    open: false
  });
});

gulp.task("default", [
  "run-server",
  "browser-sync",
  "watch"
]);
