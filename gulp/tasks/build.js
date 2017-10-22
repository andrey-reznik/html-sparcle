//Сборка проекта
module.exports = function (gulp, $, config) {
    return function () {
        for(var path in config.path.src) {                  //Цикл перебирает пути исходных файлов и помещает в соответствующие пути готового проекта
            gulp.src(config.path.src[path])
                .pipe(gulp.dest(config.path.build[path]));  //Перемещение файлов в соответствующую папку
        }
    };
};