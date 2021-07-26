const mix = require('laravel-mix');

const Graphql = require('./mix/Graphql');
const tailwindcss = require('tailwindcss');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .vue()
    .sass('resources/sass/app.sass', 'public/css')
    .options({
      processCssUrls: false,
      postCss: [ tailwindcss('./tailwind.config.js') ],
    })
    .sourceMaps()
    .browserSync('laravello.skazkin');
if (mix.inProduction()) {
    mix.version();
}

mix.extend('graphql', new Graphql());
mix.graphql();
