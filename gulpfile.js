var gulp       = require('gulp'), // Подключаем Gulp
	sass         = require('gulp-sass'), //Подключаем Sass пакет,
	browserSync  = require('browser-sync'), // Подключаем Browser Sync
	concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	/*uglify       = require('gulp-uglifyjs'),*/ // Подключаем gulp-uglifyjs (для сжатия JS)
	/*cssnano      = require('gulp-cssnano'),*/ // Подключаем пакет для минификации CSS
	rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
	imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
	pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
	cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
	plumber = require('gulp-plumber'), // Чтоб при ошибке не падал сервер
	autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов
	spritesmith = require('gulp.spritesmith'); //Для автосборки спрайта
	sourcemaps = require('gulp-sourcemaps'); //Что б в режиме разработчика показывало норм стили

gulp.task('sass', function(){ // Создаем таск Sass
	return gulp.src('app/scss/**/*.scss') // Берем источник
		.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(sass({outputStyle: 'compact'}).on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass				
		.pipe(autoprefixer(['last 10 versions', '> 1%', 'ie 9', 'ie 10'], { cascade: true })) // Создаем префиксы
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});





gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'app' // Директория для сервера - app
		},
		browser: 'chrome',
		notify: false // Отключаем уведомления
	});
});


// для gulp4
gulp.task('watch', function(){
	gulp.watch('app/scss/**/*.scss', gulp.parallel('sass')); // Наблюдение за sass файлами в папке sass	
	gulp.watch('app/*.html', gulp.parallel('browser-sync')); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('app/js/**/*.js', gulp.parallel('browser-sync'));   // Наблюдение за JS файлами в папке js
});



gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass'));
