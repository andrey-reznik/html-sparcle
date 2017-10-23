//Сборка PUG в HTML
var fs = require('fs');

module.exports = function (gulp, $, config) {
    return function () {
        return gulp.src(config.path.watch.pug.pages)
            .pipe($.pug({
                pretty: true,
                locals: {
                    nav: JSON.parse(fs.readFileSync(config.path.pug.navigation, 'utf-8')),  //Чтение файла навигации
                    content: JSON.parse(fs.readFileSync(config.path.pug.content, 'utf-8')), //Чтение файла с контентом
                    release: config.release                                                 //Релиз или разработка
                }
            }).on('error', function (err) {
                $.browserSync.notify(err.message, 3000);
                this.emit('end');
            }))
            .pipe(gulp.dest(config.path.app.html))        //Помещение скомпилированных HTML файлов в папку app
            .pipe($.browserSync.reload({stream: true}));  //Обновление браузера
    };
};