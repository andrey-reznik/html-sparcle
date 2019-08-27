//Сборка сторонних JS бибилиотек
module.exports = function () {
    $.gulp.task('js:plugins', function () {
        return $.gulp.src($.gp.requireReload($.config.gulpRoot + $.config.path.libs.js))
            .pipe($.gp.if($.config.release, $.gp.sourcemaps.init()))        //Инициализация source-maps
            .pipe($.gp.concat('plugins.js'))                                //Конкатенация JS файлов
            .pipe($.gp.if($.config.release, $.gp.uglify()))                 //Минимизация JS файла
            .pipe($.gp.if($.config.release, $.gp.rename({suffix: '.min'}))) //Переименоввывание JS файла
            .pipe($.gp.if($.config.release, $.gp.sourcemaps.write('/')))    //Запись source-map
            .pipe($.gulp.dest($.config.path.app.js))                        //Перемещение готового файла в папку JS
            .pipe($.gp.browserSync.reload({stream: true}));                 //Обновление браузера
    });

    $.gulp.task('js:main', function () {
        return $.gulp.src($.config.path.watch.js)
            .pipe($.gp.if($.config.release, $.gp.sourcemaps.init()))        //Инициализация source-maps
            .pipe($.gp.concat('main.js'))                                   //Конкатенация JS файлов
            .pipe($.gp.if($.config.release, $.gp.uglify()))                 //Минимизация JS файла
            .pipe($.gp.if($.config.release, $.gp.rename({suffix: '.min'}))) //Переименоввывание JS файла
            .pipe($.gp.if($.config.release, $.gp.sourcemaps.write('/')))    //Запись source-map
            .pipe($.gulp.dest($.config.path.app.js))                        //Перемещение готового файла в папку JS
            .pipe($.gp.browserSync.reload({stream: true}));                 //Обновление браузера
    });
};