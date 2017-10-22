//Сетка SmartGrid
module.exports = function (gulp, $, config) {
    return function () {
        var settings = config.smartGrid.settings;
        $.smartGrid(config.smartGrid.outputFolder, settings);
    };
};