//Сжатие изображений
module.exports = function () {
    $.gulp.task('img', function () {
        return $.gp.imagemin([$.config.path.watch.img], $.config.path.app.img, {
            interlaced: true,
            svgoPlugins: [{removeViewBox: false}],
            plugins: [
                $.gp.imageminJpegtran({ //Сжатие JPEG
                    progressive: true
                }),
                $.gp.imageminPngquant() //Сжатие PNG
            ]
        });
    });
};