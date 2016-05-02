import process from 'process';
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import htmlReplace from 'gulp-html-replace';
import uglify from 'gulp-uglify';
import sass from 'gulp-sass';
import runSequence from 'run-sequence';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import rimraf from 'rimraf';
import browserSync, { reload } from 'browser-sync';
import { Server } from 'karma';

const paths = {
  bundle: 'app.js',
  entry: 'src/index.js',
  srcCss: 'src/**/*.scss',
  srcLint: ['src/**/*.js', 'test/**/*.js'],
  dist: 'dist',
  distJs: 'dist/js',
  distImg: 'dist/images',
  distDeploy: './dist/**/*'
};

gulp.task('clean', cb => {
  rimraf('dist', cb);
});

gulp.task('browserSync', () => {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('watchify', () => {
  const opts = Object.assign({}, watchify.args, {
    entries: [paths.entry],
    debug: true,
    cache: {},
    packageCache: {}
  });
  const bundler = watchify(browserify(opts));

  function rebundle() {
    return bundler.bundle()
      .pipe(source(paths.bundle))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.distJs))
      .pipe(reload({ stream: true }));
  }

  bundler.transform(babelify)
    .on('update', rebundle);
    
  return rebundle();
});

gulp.task('browserify', () => {
  browserify(paths.entry, { debug: true })
  .transform(babelify)
  .bundle()
  .pipe(source(paths.bundle))
  .pipe(buffer())
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(uglify())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(paths.distJs));
});

gulp.task('lint', () => {
  gulp.src(paths.srcLint)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('test', (done) => {
  new Server({
    configFile: `${__dirname}/karma.conf.js`,
    singleRun: true
  }, done).start();
});

gulp.task('styles', () => {
  gulp.src(paths.srcCss)
    .pipe(rename({ extname: '.css' }))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('browserify', () => {
  browserify(paths.entry, { debug: true })
    .transform(babelify)
    .bundle()
    .pipe(source(paths.bundle))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.distJs));
});

gulp.task('htmlReplace', () => {
  gulp.src('index.html')
    .pipe(htmlReplace({ css: 'styles/main.css', js: 'js/app.js' }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('watchTask', () => {
  gulp.watch(paths.srcCss, ['styles']);
  gulp.watch(paths.srcLint, ['lint']);
});

gulp.task('watch', cb => {
  runSequence('lint', 'clean', ['browserSync', 'watchTask', 'watchify', 'styles'], cb);
});

gulp.task('build', cb => {
  process.env.NODE_ENV = 'production';
  runSequence('lint', 'clean', ['browserify', 'styles', 'htmlReplace'], cb);
});