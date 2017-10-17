'use strict';

var gulp            = require('gulp'),                  //Сам Gulp
    cleancss        = require('gulp-clean-css'),        //Плагин для сжатия CSS
    sass            = require('gulp-sass'),             //Плагин для сборки SASS
    pug             = require('gulp-pug'),              //Плагин для сборки PUG
    imagemin        = require('imagemin'),              //Плагин для сжатия изображений
    jpegtran        = require('imagemin-jpegtran'),     //Дополнительный плагин для imagemin для сжатия JPEG
    pngquant        = require('imagemin-pngquant'),     //Дополнительный плагин для imagemin для сжатия PNG
    browserSync     = require('browser-sync').create(), //Плагин для автосинхронизации изменений с браузером
    uglify          = require('gulp-uglify'),           //Плагин для сборки минификации JS
    autoprefixer    = require('gulp-autoprefixer'),     //Плагин для задания автопрефиксов для CSS
    concat          = require('gulp-concat'),           //Плагин для конкатенации JS
    gulpif          = require('gulp-if'),               //Плагин для проверки условия IF
    notify          = require('gulp-notify'),           //Плагин для отображения уведмлений в системе
    rename          = require('gulp-rename'),           //Плагин для переименовывания файлов
    fs              = require('fs'),                    //Модуль Node.js для работы с файловой системой
    del             = require('del');                   //Плагин для удаления файлов и папок

var config          = require('./gulp/config.json');    //Файл конфигурации Gulp

//Сборка SASS в CSS
gulp.task('sass', function () {
    return gulp.src(config.path.watch.style)
        .pipe(sass({
            outputStyle: 'expand'
        })).on('error', notify.onError())                                    //Сборка SASS в CSS + включение уведомлений в системном трее при ошибке
        .pipe(autoprefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))                                                                  //Добавление CSS свойствам префиксов для браузеров
        .pipe(gulpif(config.release, cleancss()))                            //Минификация CSS
        .pipe(gulpif(config.release,  rename({suffix: '.min', prefix: ''}))) //Переименовывание CSS файла
        .pipe(gulp.dest(config.path.app.css))                                //Перемещение CSS в папку для CSS
        .pipe(browserSync.reload({stream: true}));                           //Обновление браузера
});

//Сборка PUG в HTML
gulp.task('pug', function () {
    return gulp.src(config.path.watch.pug.pages)
        .pipe(pug({
            pretty: true,
            locals: {
                nav: JSON.parse(fs.readFileSync(config.path.pug.navigation, 'utf-8')),  //Чтение файла навигации
                content: JSON.parse(fs.readFileSync(config.path.pug.content, 'utf-8')), //Чтение файла с контентом
                release: config.release                                                 //Релиз или разработка
            }
        }))
        .pipe(gulp.dest(config.path.app.html))      //Помещение скомпилированных HTML файлов в папку app
        .pipe(browserSync.reload({stream: true}));  //Обновление браузера
});

//Сжатие изображений
gulp.task('img', function () {
    imagemin([config.path.watch.img], config.path.app.img, {
        interlaced: true,
        svgoPlugins: [{removeViewBox: false}],
        plugins: [
            jpegtran({
                progressive: true
            }),
            pngquant()
        ]
    })
});

//Автообновления браузера при изменении файлов
gulp.task('serve', ['sass', 'pug', 'js', 'fonts', 'img'], function() {
    browserSync.init({
        server: {
            baseDir: config.path.app.html                                  //Папка локального сервера для проекта
        },
        notify: config.browserSync.notify,                                 //Миниуведомления в браузере
        tunnel: config.browserSync.tunnel                                  //Туннелирование сайта на localtunnel.me
    });
    gulp.watch(config.path.watch.style, ['sass']);                         //Наблюдение за SASS файлами
    gulp.watch([config.path.watch.pug.all,
                config.path.watch.data.content,
                config.path.watch.data.navigation],
                ['pug']);                                                  //Наблюдение за PUG и JSON файлами с данными
    gulp.watch(config.path.watch.js, ['js:app']);                          //Наблюдение за JS файлами
    gulp.watch(config.path.watch.fonts, ['fonts']);                        //Наблюдение за файлами шрифтов
    gulp.watch(config.path.watch.img, browserSync.reload({stream: true})); //Наблюдение за файлами изображений
});

//Сборка JQuery
gulp.task('js:jquery', function () {
   return gulp.src(config.path.libs.js.jquery)
       .pipe(gulpif(config.release, uglify()))  //Минимизация JQuery
       .pipe(gulpif(config.release, (rename({
            suffix: '.min', prefix: ''
       }))))                                    //Переименоввывание JQuery
       .pipe(gulp.dest(config.path.app.js));    //Перемещение JQuery плагина в папку JS
});

//Сборка шрифтов
gulp.task('fonts', function () {
    return gulp.src(config.path.libs.fonts)
        .pipe(gulp.dest(config.path.app.fonts)); //Перемещение файлов шрифтов в папку fonts
});

//Сборка сторонних JS бибилиотек
gulp.task('js:libs', function () {
   return gulp.src(config.path.libs.js.any)
       .pipe(concat('libs.js'))                             //Конкатенация JS файлов
       .pipe(gulpif(config.release, uglify()))              //Минимизация JS файла
       .pipe(gulpif(config.release, rename('libs.min.js'))) //Переименоввывание JS файла
       .pipe(gulp.dest(config.path.app.js));                //Перемещение готового файла в папку JS
});

//Сборка JS файлов приложения
gulp.task('js:app', function () {
   return gulp.src(config.path.watch.js)
       .pipe(concat('app.js'))                              //Конкатенация JS файлов
       .pipe(gulpif(config.release, uglify()))              //Минимизация JS файла
       .pipe(gulpif(config.release, rename('app.min.js')))  //Переименоввывание JS файла
       .pipe(gulp.dest(config.path.app.js))                 //Перемещение готового файла в папку JS
       .pipe(browserSync.reload({stream: true}));           //Обновление браузера
});

//Сборка проекта
gulp.task('build', ['clear:dist', 'pug', 'sass', 'js', 'fonts', 'img'], function () {
    for(var path in config.path.src) {                  //Цикл перебирает пути исходных файлов и помещает в соответствующие пути готового проекта
        gulp.src(config.path.src[path])
            .pipe(gulp.dest(config.path.build[path]));  //Перемещение файлов в соответствующую папку
    }
});

//Сокращение записи для сборки JS
gulp.task('js', ['js:jquery', 'js:app', 'js:libs']);

//Удаление папки с собранным проектом
gulp.task('clear:dist', function () {
   return del.sync(config.path.clean);  //Удаление папки с собранным проектом
});

//Очистка кеша Gulp
gulp.task('clear:cache', function () {
    return cache.clearAll();
});

//Задача по умолчанию
gulp.task('default', ['serve']);