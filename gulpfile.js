const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser'); // Para minificar JS

const paths = {
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js'
  },
  fonts: {
    src: 'src/fonts/**/*.{woff,woff2}',
    dest: 'dist/fonts'
  }
};

// Compila SCSS
function styles() {
  return gulp.src('src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest));
}

// Copia e minifica JS
function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(terser()) // Minificação JS
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest));
}

// Copia fontes
function fonts() {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));
}

// Observa mudanças
function watch() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.fonts.src, fonts);
}

exports.styles = styles;
exports.scripts = scripts;
exports.fonts = fonts;
exports.watch = watch;
exports.default = gulp.series(gulp.parallel(styles, scripts, fonts), watch);

// No seu gulpfile.js, verifique se a task de build gera os arquivos no local certo:
gulp.task('build', () => {
  return gulp.src('./src/**/*')
    .pipe(gulp.dest('./dist')) // ← Esta pasta deve bater com a config da Vercel
});