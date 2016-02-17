const gulp = require("gulp");
const source = require("vinyl-source-stream");
const browserify = require("browserify");
const babelify = require("babelify");
const less = require("gulp-less");
const packageInfo = require("./package.json");
const browserSync = require("browser-sync");
const sourcemaps = require("gulp-sourcemaps");
const buffer = require("vinyl-buffer");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

const reload = browserSync.reload;

gulp.task("build-js", function() {
  return browserify({
    entries: packageInfo.paths.app_client,
    debug: true
  })
    .on("error", function(err) {
      console.error(err);
      this.emit("end");
    })
    .transform(babelify.configure({
      presets: ["es2015", "react", "stage-0"]
    }))
    .bundle()
    .pipe(source(packageInfo.dest.app_js))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(packageInfo.dest.dist_js))
    .pipe(reload({
      stream: true
    }));
});

gulp.task("build-css", function() {
  const processors = [autoprefixer({
    browsers: ["last 2 versions"]
  })];

  return gulp.src("./src/client/less/*.less")
    .pipe(less({
      paths: ["./src/client/less"]
    }))
    .on("error", function(err) {
      console.error(err);
      this.emit("end");
    })
    .pipe(postcss(processors))
    .pipe(gulp.dest(packageInfo.dest.dist_css))
    .pipe(browserSync.stream());
});

gulp.task("copy-server", function() {
  return gulp.src("./src/server/index.js")
    .pipe(gulp.dest(packageInfo.dest.dist_server));
});

gulp.task("copy-views", function() {
  return gulp.src("./src/server/*.html")
    .pipe(gulp.dest(packageInfo.dest.dist_server));
});

gulp.task("watch", function() {
  gulp.watch(["src/client/**/*.js", "src/**/*.jsx"], ["build-js"]);
  gulp.watch(["src/client/less/*.less"], ["build-css"]);
  gulp.watch(["src/server/index.js"], ["copy-server"]);
  gulp.watch(["src/server/*.html"], ["copy-views"]);
});

gulp.task("browser-sync", function() {
  browserSync({
    proxy: {
      target: "http://localhost:5000"
    },
    open: false
  });
});

gulp.task("default", ["build-js", "build-css", "browser-sync", "copy-server", "copy-views", "watch"]);
