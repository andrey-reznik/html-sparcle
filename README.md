# Work Gulp template
### Installation
```
$ git clone andrey-reznik@bitbucket.org:andrey-reznik/work-template.git
$ npm install
$ bower install
```
#### Start server
```
$ npm start
```
or
```
$ gulp
```

## Rules for working with template
#### Note

> This template using [![PUG](https://pugjs.org/images/favicon-16x16.png) PUG](https://pugjs.org) HTML preprocessor

### Description
1. All PUG source files are in the folder `app/pug`
2. Third-party libraries are installed using `bower i <packagename> --save`
3. Style files are stored in a folder `app/sass`
4. Fonts must be imported into a file `app/sass/_fonts.sass`
5. Third-party libraries must be imported into a file `app/sass/_libs.sass`
6. All media queries must be in a file `app/sass/_media.sass`
7. All SASS variables must be in a file `app/sass/_vars.sass`
8. The main styles of the project should be in `app/sass/main.sass`
9. Original image files must be in the folder `app/img`
10. The `app/serve` folder is responsible for storing the compiled and assembled project files
11. The JavaScript application files must be in the `app/pug` folder in accordance with the components and blocks to which they belong

## Gulp configuration file
The configuration file Gulp `config.json`, is stored in the folder `gulp` in the root directory of the project.
To assemble the application for release, you need to change the `release` parameter to`true` in the `config.json` file

## Settings for browser-sync Gulp plugin
The settings for the `browser-sync` are in the `config.json` file in the `browserSync` section.
The parameter `tunnel` is responsible for the local files on the site [Localtunnel.me](https://localtunnel.me)
The `notify` option is responsible for displaying a mini-notification in the browser about updating or changing a page