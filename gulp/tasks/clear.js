//Удаление папки со сборкой
module.exports = function () {
    $.gulp.task('clear:dist', function () {
        return $.gp.del($.config.path.build.html)
    });
};