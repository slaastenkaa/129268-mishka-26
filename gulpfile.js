import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import libsquoosh from 'gulp-libsquoosh';
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import { deleteAsync } from "del";

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber()) // обработка ошибок
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso(), //уменьшаем style.css
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML

const html = () => {
  return gulp.src('source/*')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

//Script

const script = () => {
  return gulp.src('source/js/*.js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'))
}

// Images

const optimiseImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(libsquoosh())
    .pipe(gulp.dest('build/img'))
} 

const copyImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(gulp.dest('build/img'))
} 

// WebP

const optimiseWebp = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(libsquoosh({
      webp: {},
      // avif: {}
    })
    )
    .pipe(gulp.dest('build/img'))
}

// SVG

const svg = () => {
  return gulp.src('source/img/**/*.svg')
    .pipe(svgmin()
    )
    .pipe(gulp.dest('build/img'))
}

// Sprite

const sprite = () => {
  return gulp.src('source/img/*.svg')
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'))
}

// Copy

const copy = (done) => {
  gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico',
  ], {
  base: 'source'
  })
  .pipe(gulp.dest('build'))
  done();
}

// Clean

const clean = () => {
  return deleteAsync('build');
};

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload

const reload = (done) => {
  browser.reload();
  done();
  }

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/script.js', gulp.series(script));
  gulp.watch('source/*.html').on('change', browser.reload);
}

// Build

export const build = gulp.series(
  clean,
  copy,
  optimiseImages,
  gulp.parallel(
    styles,
    html,
    script,
    svg,
    sprite,
    optimiseWebp
    ),
  );

export default gulp.series(
  clean,
  copy,
  optimiseImages,
  gulp.parallel(
    styles,
    html,
    script,
    svg,
    sprite,
    optimiseWebp
    ),
  gulp.series(
    server,
    watcher
  )
);
