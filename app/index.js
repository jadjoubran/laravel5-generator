'use strict';
var yeoman = require('yeoman-generator'),
chalk  = require('chalk'),
replace = require('replace');

module.exports = yeoman.generators.Base.extend({
	initializing: function () {
		this.pkg = require('../package.json');
	},

	prompting: function () {
		var done = this.async();

		this.log(chalk.red('Laravel5') + ' generator will install laravel5 in your folder!');
		done();
	},

	configuring: {
		composer: function(){
			this.log(chalk.cyan('Testing for composer'));

			this.spawnCommand('composer', ['--version'])
			.on('error', function(){
				this.log(chalk.red('Composer not found. Make sure it is available in your path and download it from https://getcomposer.org'));
				return false;
			}.bind(this))
			.on('exit', function(){
				this.log(chalk.green('Composer found'));
			}.bind(this));

		},
		bower: function(){
			if ( !this.wantsBower ){
				return false;
			}
			this.log(chalk.cyan('Testing for bower'));

			this.spawnCommand('bower', ['-v'])
			.on('error', function(){
				this.log(chalk.red('Bower not found. Installing bower'));
				this.spawnCommand('npm', ['install', '-g', 'bower'])
				.on('exit', function(){
					this.log(chalk.green('Bower installed!'));
				}.bind(this));
			}.bind(this))
			.on('exit', function(){
				this.log(chalk.green('Bower found'));
			}.bind(this));
		},

		writing: {
			app: function () {
				this.fs.copy(
					this.templatePath('_bower.json'),
					this.destinationPath('laravel/bower.json')
					);
			},

			projectfiles: function () {
				this.fs.copy(
					this.templatePath('editorconfig'),
					this.destinationPath('laravel/.editorconfig')
					);
				this.fs.copy(
					this.templatePath('jshintrc'),
					this.destinationPath('laravel/.jshintrc')
					);
			}
		},

		install: function () {
			this.spawnCommand('composer', ['create-project', 'laravel/laravel', 'laravel', '--prefer-dist'])
			.on('error', function(){
				this.log(chalk.error('Error installing Laravel'));
			}.bind(this))
			.on('exit', function(){
				replace({
					regex: 'mix\.',
					replacement: 'mix.bower().',
					paths: ['laravel/gulpfile.js'],
					recursive: false,
					silent: false
				});
				replace({
					regex: '"laravel-elixir": "\*"',
					replacement: '"laravel-elixir": "*", "laravel-elixir-bower": "*"',
					paths: ['laravel/package.json'],
					recursive: false,
					silent: false
				});
			}.bind(this));
			return true;
			// this.npmInstall();
			// this.installDependencies({
				// skipInstall: this.options['skip-install']
			// });
}
}
});
