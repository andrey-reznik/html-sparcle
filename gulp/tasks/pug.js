//Сборка PUG в HTML
var fs = require('fs');

module.exports = function (gulp, plugins, config) {
    return function () {
        return gulp.src(config.path.watch.pug.pages)
            .pipe(plugins.pug({
                pretty: true,
                locals: {
                    nav: JSON.parse(fs.readFileSync(config.path.pug.navigation, 'utf-8')),  //Чтение файла навигации
                    content: JSON.parse(fs.readFileSync(config.path.pug.content, 'utf-8')), //Чтение файла с контентом
                    release: config.release                                                 //Релиз или разработка
                }
            }))
            .pipe(gulp.dest(config.path.app.html))              //Помещение скомпилированных HTML файлов в папку app
            .pipe(plugins.browserSync.reload({stream: true}));  //Обновление браузера
    };
};