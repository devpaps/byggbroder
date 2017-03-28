var gulp                = require('gulp');
var sass                = require('gulp-sass');
var cssnano             = require('gulp-cssnano');
var imagemin            = require('gulp-imagemin');
var autoprefixer        = require('gulp-autoprefixer');
var bs                  = require('browser-sync').create();

gulp.task('browser-sync', ['sass'], function() {
    bs.init({
        server: {
            baseDir: "./"
        }
    });
});


var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};


function onError(err) {
    console.log(err);
}


//Compile SASS to CSS
gulp.task('sass', function() {
  return gulp.src('./assets/sass/custom.sass')
    .pipe(sass())
    .pipe(gulp.dest('./assets/css'))
    .pipe(bs.reload({stream: true}));
});

//Minify Images
gulp.task('images', function(){
  return gulp.src('./assets/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
});

//Autoprefixer
gulp.task('autoprefixer', function() {
  return gulp.src('./assets/css/custom.css')
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest('./dist'))
});

//Minify CSS
gulp.task('minify', function(){
  return gulp.src('./dist/custom.css')
    .pipe(cssnano())
    .pipe(gulp.dest('./dist'))
});


//Tasks that runs when i type gulp watch in cmd
gulp.task('watch',['browser-sync'], function(){
  gulp.watch('./assets/sass/custom.sass', ['sass']);
  gulp.watch("*.html").on('change', bs.reload);
  gulp.watch('./assets/css/custom.css', ['autoprefixer']);
  gulp.watch('./assets/css/custom.css', ['images']);
  gulp.watch('./dist/custom.css', ['minify']);
});
