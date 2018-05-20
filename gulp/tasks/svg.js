//Создание svg спрайтов
module.exports = function () {
    $.gulp.task('svg', function () {
        return $.gulp.src($.config.path.watch.svg)
            .pipe($.gp.svgmin({
                js2svg: {
                    pretty: true
                }
            }))
            .pipe($.gp.cheerio({
                run: function($) {
                    $('[fill]').removeAttr('fill');     //Удаляет атрибут fill
                    $('[stroke]').removeAttr('stroke'); //Удаляет атрибут fill
                    $('[style]').removeAttr('style');   //Удаляет атрибут fill
                },
                parserOptions: { xmlMode: true }
            }))
            .pipe($.gp.replace('&gt;', '>'))            //Заменяет &gt; на >
            .pipe($.gp.svgSprite({
                mode: {
                    symbol: {
                        sprite: "sprite.svg"
                    }
                }
            }))
            .pipe($.gulp.dest($.config.path.app.img))
    });
};