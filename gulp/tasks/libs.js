//Сборка сторонних JS бибилиотек
module.exports = function (gulp, plugins, config) {
    return function () {
        return gulp.src(config.path.libs.js)
            .pipe(plugins.concat('libs.js'))                                        //Конкатенация JS файлов
            .pipe(plugins.if(config.release, plugins.uglify()))                     //Минимизация JS файла
            .pipe(plugins.if(config.release, plugins.rename({suffix: '.min'})))     //Переименоввывание JS файла
            .pipe(gulp.dest(config.path.app.js))                                    //Перемещение готового файла в папку JS
            .pipe(plugins.browserSync.reload({stream: true}));                      //Обновление браузера
    }
};