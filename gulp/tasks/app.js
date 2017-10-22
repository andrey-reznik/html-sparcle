//Сборка JS файлов приложения
module.exports = function (gulp, $, config) {
    return function () {
        return gulp.src(config.path.watch.js)
            .pipe($.concat('app.js'))                                       //Конкатенация JS файлов
            .pipe($.if(config.release, $.uglify()))                   //Минимизация JS файла
            .pipe($.if(config.release, $.rename({suffix: '.min'})))   //Переименоввывание JS файла
            .pipe(gulp.dest(config.path.app.js))                                  //Перемещение готового файла в папку JS
            .pipe($.browserSync.reload({stream: true}));                    //Обновление браузера
    }
};