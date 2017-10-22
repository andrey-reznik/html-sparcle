'use strict';

var gulp   = require('gulp'),                                  //Gulp
    config = require('./gulp/config.json'),                    //Файл конфигурации Gulp и его плагинов
    $      = require('gulp-load-plugins')(config.loadPludins); //Плагин для автозагрузки плагинов для Gulp

//Подгрузка таскаов по названию из папки config.path.tasks
function task(name) {return require(config.path.tasks + name)(gulp, $, config)}

//Сборка шрифтов
gulp.task('fonts', task('fonts'));
//Сетка SmartGrid
gulp.task('smartgrid', task('smartgrid'));
//Сжатие изображений
gulp.task('img', task('img'));
//Сборка SASS в CSS
gulp.task('sass', task('sass'));
//Сборка PUG в HTML
gulp.task('pug', task('pug'));
//Сборка проекта
gulp.task('build', ['clear:dist', 'pug', 'sass', 'js', 'fonts', 'img'], task('build'));
//Автообновления браузера при изменении файлов
gulp.task('serve', ['sass', 'pug', 'js', 'fonts', 'img'], task('serve'));
//Сборка сторонних JS бибилиотек
gulp.task('js:libs', task('libs'));
//Сборка JS файлов приложения
gulp.task('js:app', task('app'));
//Сокращение записи для сборки JS
gulp.task('js', ['js:libs', 'js:app']);
//Удаление папки с собранным проектом
gulp.task('clear:dist', function () {
   return $.del.sync(config.path.clean);  //Удаление папки с собранным проектом
});
//Задача по умолчанию
gulp.task('default', ['serve']);