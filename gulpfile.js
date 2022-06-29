const fs = require("fs");
const glob = require("glob");
const path = require("path");
const { src, dest, watch, series } = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const del = require("del");
const nunjucksRender = require("gulp-nunjucks-render");
const data = require("gulp-data");
const sourcemaps = require("gulp-sourcemaps");
const mergeStream = require("merge-stream");
const imagemin = require("gulp-imagemin");
const webp = require('gulp-webp');
const newer = require("gulp-newer");
const postcss = require("gulp-postcss");
const chalk = require("chalk");
const formatterHtml = require("gulp-format-html");
const ftp = require("vinyl-ftp");
const sftp = require("gulp-sftp-up4");
const exec = require('gulp-exec');
const log = console.log;
const merge = require('deepmerge');


const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const webpackConfig = require("./webpack.config.js");

const pathDist = "./dist";
const pathSrc = "./src";
const pathConfig = `${pathSrc}/config`;

const config = require(`${pathConfig}/gulp.json`);

// Node Sass will be used by default, but it's strongly recommended that you set it explicitly for
// forwards-compatibility in case the default ever changes.
// @see https://www.npmjs.com/package/gulp-sass
sass.compiler = require("node-sass");

function requireUncached(module) {
  delete require.cache[require.resolve(module)];
  return require(module);
}

function getCliParams(arr) {
  return arr.reduce(
    (prev, current) => {
      if (current.indexOf('--') === 0) {
        const param = current.split('=');
        return { ...prev, [param[0].slice(2)]: param[1] };
      }
    },
    {}
  );
}

function startServer(done) {
  log(chalk.red.bold("Starting BrowserSync ..."));

  let configBrowserSync = config.webserver;
  configBrowserSync = {
    ...{
      "server": pathDist
    }, ...configBrowserSync
  };

  browserSync.init(configBrowserSync);

  return done();
}

function transpileSCSS(done) {
  log(chalk.red.bold("Building SCSS ..."));

  return src(`${pathSrc}/assets/scss/**/*.{scss,sass}`)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        includePaths: ["node_modules/"],
      }).on("error", sass.logError)
    )
    .pipe(postcss([require("autoprefixer")]))
    .pipe(sourcemaps.write())
    .pipe(dest(`${pathDist}/assets/css`))
    .pipe(browserSync.stream({ once: true }));
}


function optimizeCSS() {
  log(chalk.red.bold("Optimizing CSS ..."));

  return src(`${pathDist}/assets/css/*.css`)
    .pipe(cleanCSS())
    .pipe(dest(`${pathDist}/assets/css`))
}

function transpileJS(done) {
  log(chalk.red.bold("Building JS ..."));

  return (
    src(`${pathSrc}/assets/js/**/*`)
      .pipe(webpackStream(webpackConfig, webpack))
      // @see https://stackoverflow.com/questions/53924907/webpack-watch-crashes-after-error-in-js-file
      .on("error", function handleError() {
        this.emit("end");
      })
      .pipe(dest(`${pathDist}/assets/js/`))
      .pipe(browserSync.stream({ once: true }))
  );
}

function compileHtml(done) {
  log(chalk.red.bold("Building HTML from nunjucks ..."));

  return src(`${pathSrc}/pages/**/*.+(njk|nunjucks)`)
    .pipe(
      data(function (file) {
        let fileNoExt = file.relative.replace(/\.[^/.]+$/, "");
        let filepathTarget = `${pathSrc}/data/pages/` + fileNoExt + ".json";
        return fs.existsSync(filepathTarget)
          ? requireUncached(filepathTarget)
          : {};
      })
    )
    .pipe(
      nunjucksRender({
        path: [pathSrc, `!${pathSrc}/pages`],
        manageEnv: function (env) {

          env.addFilter('setAttribute', function (obj, key, value) {
            obj[key] = value;
            return obj;
          });

          env.addFilter('merge', function (obj1, obj2) {
            return merge(obj1, obj2);
          });

          env.addFilter('overwriteMerge', function (obj1, obj2) {
            return merge(obj1, obj2, { arrayMerge: (destinationArray, sourceArray, options) => sourceArray });
          });

          env.addFilter('mergeArray', function (arr1, arr2) {
            if (Array.isArray(arr1) && Array.isArray(arr2)) {
              return [...arr1, ...arr2];
            }
            return [];
          });

          glob
            .sync(`${pathSrc}/**/*.json`, { ignore: `${pathSrc}/config/*` })
            .forEach((filepath) => {

              let globalVar;
              const name = path.parse(filepath).name;

              if (filepath.includes("/pages/")) {
                globalVar = "page_" + name;
              } else if (filepath.includes("/tokens/")) {
                globalVar = "token_" + name;
              } else if (filepath.includes("/components/")) {
                globalVar = "component_" + name;
              } else if (filepath.includes("/languages/")) {
                globalVar = "lang_" + name.split('.')[0];
              } else {
                globalVar = name;
              }

              env.addGlobal(
                globalVar.toLowerCase(),
                requireUncached(filepath)
              );

            });

          try {
            const appLang = env.getGlobal('app').lang;

            if (appLang) {
              let objLangTarget;
              try {
                objLangTarget = env.getGlobal(`lang_${appLang}`);
              } catch (error) {
                console.error(`Warning: JSON language file doesn't exists.`);
              }
              if (objLangTarget) {
                env.addGlobal('lang', objLangTarget);
              }
            }
          } catch (error) {
            console.error(`Warning: Language is not specified (please check the 'lang' key in 'app.json').`);
          }

        },
      })
    )
    .pipe(dest(pathDist))
    .pipe(browserSync.stream({ once: true }));
}

/**
 * HTML formatter
 * @see https://github.com/ntnyq/gulp-plugins/tree/master/packages/gulp-format-html
 * @see https://github.com/beautify-web/js-beautify
 * @returns
 */
function formatHtml() {
  log(chalk.red.bold("Formatting HTML ..."));

  return src(`${pathDist}/**/*.html`)
    .pipe(
      formatterHtml({
        indent_size: 2,
        preserve_newlines: false,
        space_in_empty_paren: true,
      })
    )
    .pipe(dest(pathDist));
}

function optimizeHTML() {
  log(chalk.red.bold("Optimizing HTML ..."));

  return src(`${pathDist}/*.html`)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(pathDist));
}

function exportJSONtoScsss() {
  log(chalk.red.bold("Exporting JSONs to SCSS ..."));

  const options = {
    continueOnError: false,
    pipeStdout: false,
  };

  const reportOptions = {
    err: true,
    stderr: true,
    stdout: false
  };

  return src([`${pathSrc}/data/tokens/*.+(json)`])
    .pipe(exec(file => {
      const filenameNoExt = path.parse(file.history[0]).name;
      const prefix = "zaux-token";
      return `npx json-to-scss ${file.path} ${pathSrc}/assets/scss/tokens/_${filenameNoExt}.scss --p='$${prefix}-${filenameNoExt}: '`;
    }, options))
    .pipe(exec.reporter(reportOptions));
}

function watchFiles(done) {
  watch([`${pathSrc}/**/**.+(njk|nunjucks|html|json)`], (done) => {
    series([compileHtml, formatHtml])(done);
  });
  watch(`${pathSrc}/data/tokens/*.json`, (done) => {
    series([exportJSONtoScsss, transpileSCSS])(done);
  });
  watch([`${pathSrc}/**/*.scss`], transpileSCSS);
  watch([`${pathSrc}/**/*.js`], transpileJS);
  watch(`${pathSrc}/assets/img/**/*.+(png|jpg|jpeg|gif|svg|ico)`, optimizeAssetsImages);
  watch(`${pathSrc}/media/**/*.+(gif|mp4|webm|ogv|json|html)`, copySampleData);
  watch(`${pathSrc}/media/**/*.+(png|jpg|jpeg)`, copySampleMedia);
  // watch(`${pathSrc}/media/**/*.+(png|jpg|jpeg)`, optimizeSampleImages);

  return done();
}

function optimizeAssetsImages(done) {
  log(chalk.red.bold("Optimizing assets images ..."));

  return src(`${pathSrc}/assets/img/**/*.+(png|jpg|jpeg|gif|svg|ico)`)
    .pipe(newer(`${pathDist}/assets/img/`))
    .pipe(imagemin())
    .pipe(dest(`${pathDist}/assets/img/`))
    .pipe(browserSync.stream({ once: true }));
}

function optimizeSampleImages(done) {
  log(chalk.red.bold("Optimizing sample images (webp) ..."));

  return src(`${pathSrc}/media/**/*.+(png|jpg|jpeg)`)
    .pipe(newer(`${pathDist}/media/`))
    .pipe(imagemin())
    .pipe(webp())
    .pipe(dest(`${pathDist}/media`))
    .pipe(browserSync.stream({ once: true }));
}

function copySampleMedia(done) {
  log(chalk.red.bold("Copying sample media ..."));

  return src([
    `${pathSrc}/media/**/*.+(png|jpg|jpeg)`,
  ]).pipe(dest(`${pathDist}/media`));
}

function copySampleData(done) {
  log(chalk.red.bold("Copying sample data ..."));

  return src([
    `${pathSrc}/media/**/*.+(gif|mp4|webm|ogv|json|html)`,
  ]).pipe(dest(`${pathDist}/media`));
}

function copyFont() {
  log(chalk.red.bold("Copying fonts ..."));
  return src([
    `${pathSrc}/assets/font/**/*.+(css|svg|ttf|woff|woff2)`,
    `!${pathSrc}/assets/font/**/demo-files/*`,
  ])
    .pipe(dest(`${pathDist}/assets/fonts`))
    .pipe(browserSync.stream({ once: true }));
}

function copyJs() {
  log(chalk.red.bold("Copying JavaScript ..."));

  return mergeStream(
    // jQuery
    src(`node_modules/jquery/dist/**/*.+(js|map)`).pipe(
      dest(`${pathDist}/assets/vendor/jquery`)
    ),
    // svgxuse (polyfill)
    src(`node_modules/svgxuse/**/*.+(js)`).pipe(
      dest(`${pathDist}/assets/vendor/svgxuse`)
    ),
    // object-fit-images (polyfill)
    src(`node_modules/object-fit-images/**/*.+(js)`).pipe(
      dest(`${pathDist}/assets/vendor/ofi`)
    ),
    // IntersectionObserver(polyfill)
    src(`node_modules/intersection-observer/**/*.+(js)`).pipe(
      dest(`${pathDist}/assets/vendor/intersection-observer`)
    )
  );
}

function copyIcons() {
  log(chalk.red.bold("Copying Icons ..."));
  return src([`${pathSrc}/assets/icon/**/*.+(svg|html|css|txt)`])
    .pipe(dest(`${pathDist}/assets/icon`))
    .pipe(browserSync.stream({ once: true }));
}

function copyJsons() {
  log(chalk.red.bold("Copying JSONs ..."));
  return src([`${pathSrc}/**/*.+(json)`])
    .pipe(dest(`${pathDist}/json`))
    .pipe(browserSync.stream({ once: true }));
}

function cleanDist(done) {
  log(chalk.red.bold(`Cleaning "${pathDist}" folder ...`));
  del.sync(`${pathDist}`);
  return done();
}

function deployFtp(done) {
  /*
  Config JSON example:
  {
    "host": FTP_HOSTNAME,
    "user": FTP_USER,
    "pass": FTP_PASSWORD_BASE64,
    "parallel": 10,
    "remotePath": FTP_REMOTE_PATH
  }
  */
  let config = require(getCliParams(process.argv).target);

  log(chalk.red.bold(`Deploying via FTP ...`));
  config.log = console.log;
  let buff = new Buffer.from(config.pass, "base64");
  config.password = buff.toString("utf8");
  let conn = ftp.create(config);

  return src([`${pathDist}/**/*.+(html|css|js|json|jpg|webp|png|svg|woff|woff2|ttf|otf)`], { base: pathDist, buffer: false })
    .pipe(conn.newer(config.remotePath)) // Only newser files
    .pipe(conn.dest(config.remotePath));
}

function deploySftp(done) {
  /*
  Config JSON example:
  {
    "host": FTP_HOSTNAME,
    "user": FTP_USER,
    "pass": FTP_PASSWORD_BASE64,
    "remotePath": FTP_REMOTE_PATH
  }
  */
  let config = require(getCliParams(process.argv).target);

  log(chalk.red.bold(`Deploying via SFTP ...`));
  config.log = console.log;
  let buff = new Buffer.from(config.pass, "base64");
  config.pass = buff.toString("utf8");

  return src(`${pathDist}/**/*.+(html|css|js|json|jpg|webp|png|svg|woff|woff2|ttf|otf)`).pipe(sftp(config));
}

exports.clean = cleanDist;

exports.copyjsons = copyJsons;

exports.assets = series(
  cleanDist,
  copyFont,
  copyIcons,
  optimizeAssetsImages,
  copySampleMedia,
  // optimizeSampleImages,
  copySampleData,
  copyJsons,
  copyJs
);

exports.bundle = series(
  exportJSONtoScsss,
  transpileSCSS,
  transpileJS
);

exports.compile = series(
  exports.bundle,
  compileHtml
);

exports.html = compileHtml;
exports.build = series(exports.assets, exports.compile, formatHtml);
exports.dev = series(exports.build, startServer, watchFiles);
exports.opt = series(exports.assets, exports.compile, optimizeCSS, optimizeHTML);
exports.deployftp = series(deployFtp);
exports.deploysftp = series(deploySftp);
exports.test = series(exportJSONtoScsss);
