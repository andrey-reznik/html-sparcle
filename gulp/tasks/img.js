//Сжатие изображений
module.exports = function (gulp, plugins, config) {
    return function () {
        plugins.imagemin([config.path.watch.img], config.path.app.img, {
            interlaced: true,
            svgoPlugins: [{removeViewBox: false}],
            plugins: [
                plugins.imageminJpegtran({
                    progressive: true
                }),
                plugins.imageminPngquant()
            ]
        });
        plugins.browserSync.reload({stream: true});
    };
};