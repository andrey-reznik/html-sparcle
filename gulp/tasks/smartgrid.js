//Сборка сетки smart-grid
module.exports = function () {
    return $.gulp.task('smartgrid', function () {
        return new Promise(function (resolve, reject) {
            var settings = $.config.smartGrid.settings;
            $.gp.smartGrid($.config.smartGrid.outputFolder, settings);
            resolve();
        });
    });
};