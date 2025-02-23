const { src, dest, watch, series, parallel } = require('gulp');
const fileInclude = require('gulp-file-include');
const options = require("./package.json").options;
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const postcss = require("gulp-postcss");
const imagemin = require("gulp-imagemin");
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const logSymbols = require("log-symbols");
const markdown = require("gulp-markdown");
const cache = require("gulp-cache");

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

// **Task: Live Preview with BrowserSync**
exports.livepreview = function (done) {
  browserSync.init({
    server: {
      baseDir: options.paths.dist.base,
    },
    port: 8080,
    https: false,
    notify: false,
    open: false,
  });
  done();
};

// **Task: Reload Browser**
function previewReload(done) {
  console.log("\n\t" + logSymbols.info, "Reloading Preview.\n");
  browserSync.reload();
  cache.clearAll(done);
  done();
}

// **Task: Process HTML Files**
exports.devHtml = function () {
  return src(options.paths.src.base + "/views/**/*.html") 
    .pipe(fileInclude({
      prefix: '@@', 
      basepath: '@file'
    }))
    .pipe(dest(options.paths.dist.base));
};

exports.buildHtml = function () {
  return src(options.paths.src.base + "/views/**/*.html") 
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file' 
    }))
    .pipe(dest(options.paths.dist.base));
};

// **Task: Convert README.md to HTML**
exports.readme = function () {
  return src("README.md").pipe(markdown()).pipe(dest(options.paths.dist.base));
};

// **Task: Compile Tailwind & SASS Styles**
exports.devStyles = function () {
  var tailwindcss = require("tailwindcss");
  return src(options.paths.src.css + "/**/*")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([tailwindcss(options.config.tailwindjs), require("autoprefixer")]))
    .pipe(concat({ path: "style.css" }))
    .pipe(dest(options.paths.dist.css));
};

exports.buildStyles = function () {
  return src(options.paths.dist.css + "/**/*")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(dest(options.paths.build.css));
};

// **Task: Merge & Compile JS**
exports.devScripts = function () {
  return src([
    options.paths.src.js + "/libs/**/*.js",
    options.paths.src.js + "/**/*.js",
  ])
    .pipe(concat({ path: "scripts.js" }))
    .pipe(dest(options.paths.dist.js));
};

exports.buildScripts = function () {
  return src([
    options.paths.src.js + "/libs/**/*.js",
    options.paths.src.js + "/**/*.js",
  ])
    .pipe(concat({ path: "scripts.js" }))
    .pipe(dest(options.paths.build.js));
};

// **Task: Process Images**
exports.devImgs = function (done) {
  src(options.paths.src.img + "/**/*").pipe(dest(options.paths.dist.img));
  done();
};

exports.buildImgs = function (done) {
  src(options.paths.src.img + "/**/*")
    .pipe(imagemin())
    .pipe(dest(options.paths.build.img));
  done();
};

// **Task: Watch for Changes**
exports.watchChanges = function (done) {
  watch(options.config.tailwindjs, series(exports.devStyles, previewReload));
  watch(options.paths.src.base + "/views/**/*.html", series(exports.devStyles, exports.devHtml, previewReload));
  watch(options.paths.src.css + "/**/*", series(exports.devStyles, previewReload));
  watch(options.paths.src.js + "/**/*.js", series(exports.devScripts, previewReload));
  watch(options.paths.src.img + "/**/*", series(exports.devImgs, previewReload));

  console.log("\n\t" + logSymbols.info, "Watching for Changes made to files.\n");
  done();
};

// **Task: Clean `dist` Folder**
exports.cleanDist = function () {
  console.log("\n\t" + logSymbols.info, "Cleaning dist folder for fresh start.\n");
  return del(["dist"]);
};

// **Task: Clean `build` Folder**
exports.cleanBuild = function () {
  console.log("\n\t" + logSymbols.info, "Cleaning build folder for fresh start.\n");
  return del(["build"]);
};

// **Task: Development Build**
exports.development = series(
  exports.cleanDist,
  exports.devHtml,
  exports.devStyles,
  exports.devScripts,
  exports.devImgs,
  function (done) {
    console.log("\n\t" + logSymbols.info, "npm run dev is complete. Files are located at ./dist\n");
    done();
  }
);

// **Task: Production Build**
exports.optimizedBuild = series(
  exports.cleanBuild,
  exports.buildHtml,
  exports.devStyles,
  exports.buildStyles,
  exports.buildScripts,
  exports.buildImgs,
  function (done) {
    console.log("\n\t" + logSymbols.info, "npm run build is complete. Files are located at ./build\n");
    done();
  }
);

// **Default Gulp Task**
exports.default = series(exports.development, exports.livepreview, exports.watchChanges);
exports.build = series(exports.optimizedBuild);
