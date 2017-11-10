//Сборка сетки smart-grid
module.exports = function () {
    return $.gulp.task('smartgrid', function () {
        return new Promise(function (resolve, reject) {
            var config = $.gp.requireReload($.config.gulpRoot + $.config.smartGrid.config);
            $.gp.smartGrid(config.outputFolder, config.settings);
            resolve();
        });
    });
};