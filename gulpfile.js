'use strict';

var gulp   = require('gulp'),                                  //Gulp
    config = require('./gulp/config.json'),                    //Файл конфигурации Gulp и его плагинов
    $      = require('gulp-load-plugins')(config.loadPludins); //Плагин для автозагрузки плагинов для Gulp

//Подгрузка таскаов по названию из папки config.path.tasks
function task(name) {return require(config.path.tasks + name)(gulp, $, config)}

gulp.task('fonts', task('fonts'));                                                      //Сборка шрифтов
gulp.task('smartgrid', task('smartgrid'));                                              //Сетка SmartGrid
gulp.task('img', task('img'));                                                          //Сжатие изображений
gulp.task('sass', task('sass'));                                                        //Сборка SASS в CSS
gulp.task('pug', task('pug'));                                                          //Сборка PUG в HTML
gulp.task('build', ['clear:dist', 'pug', 'sass', 'js', 'fonts', 'img'], task('build')); //Сборка проекта
gulp.task('serve', ['sass', 'pug', 'js', 'fonts', 'img'], task('serve'));               //Автообновления браузера при изменении файлов
gulp.task('js:libs', task('libs'));                                                     //Сборка сторонних JS бибилиотек
gulp.task('js:app', task('app'));                                                       //Сборка JS файлов приложения
gulp.task('js', ['js:libs', 'js:app']);                                                 //Сокращение записи для сборки JS
gulp.task('clear:dist', function () { return $.del.sync(config.path.clean); });         //Удаление папки с собранным проектом
gulp.task('default', ['serve']);                                                        //Задача по умолчанию