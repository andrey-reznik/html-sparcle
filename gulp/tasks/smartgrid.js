//Сетка SmartGrid
module.exports = function (gulp, plugins, config) {
    return function () {
        var settings = config.smartGrid.settings;
        plugins.smartGrid(config.smartGrid.outputFolder, settings);
    };
};