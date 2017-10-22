//Сжатие изображений
module.exports = function (gulp, $, config) {
    return function () {
        $.imagemin([config.path.watch.img], config.path.app.img, {
            interlaced: true,
            svgoPlugins: [{removeViewBox: false}],
            plugins: [
                $.imageminJpegtran({
                    progressive: true
                }),
                $.imageminPngquant()
            ]
        });
        $.browserSync.reload({stream: true});
    };
};