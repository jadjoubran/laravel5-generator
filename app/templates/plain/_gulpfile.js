var elixir = require('laravel-elixir');
require('laravel-elixir-bower');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Less
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix
    /*
    uncomment `.bower()` when you add your first bower component,
    or else gulp bower will blow up complaining that you don't have any bower components
    */
    // .bower()
    .less('app.less');
});
