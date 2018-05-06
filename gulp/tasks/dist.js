//Перемещение файлов в папку готового проекта
module.exports = function () {
    $.gulp.task('dist', function () {
        return new Promise(function (resolve, reject) {
            for (var path in $.config.path.src) {                   //Цикл перебирает пути исходных файлов и помещает в соответствующие пути готового проекта
                $.gulp.src($.config.path.src[path])
                    .pipe($.gulp.dest($.config.path.build[path]));  //Перемещение файлов в соответствующую папку
            }
            resolve();
        });
    });
};