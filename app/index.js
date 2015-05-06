'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
	initializing: function () {
		this.pkg = require('../package.json');
	},

	prompting: function () {
		var done = this.async();

		this.log(yosay(
			'Welcome to the first-class ' + chalk.red('Laravel5') + ' generator!'
			));


		done();
	},

	configuring: {
		composer: function(){
			var done = this.async();
			this.log(chalk.cyan('Checking if composer is installed'));

			this.spawnCommand('composer', ['--version'])
			.on('error', function(){
				this.log(chalk.red('Composer not found. Make sure it is available in your path and download it from getcomposer.org'));
				return false;
			}.bind(this))
			.on('exit', function(){
				this.log(chalk.green('Composer found'));
			}.bind(this));
			done();
		},
		bower: function(){
			var done = this.async();
			this.log(chalk.cyan('Checking if bower is installed globally'));

			this.spawnCommand('bower', ['-v'])
			.on('error', function(){
				this.log(chalk.red('Bower not found. Installing bower globally'));
				this.spawnCommand('npm', ['install', '-g', 'bower'])
				.on('error', function(){
					this.log(chalk.red('Error installing Bower'));
				}.bind(this))
				.on('exit', function(){
					this.log(chalk.green('Bower installed!'));
				}.bind(this))
			}.bind(this))
			.on('exit', function(){
				this.log(chalk.green('Bower found'));
			}.bind(this));
			done();
		}
	},

	writing: {
		laravel5: function(){
			var done = this.async();
			this.spawnCommand('composer', ['create-project', 'laravel/laravel', 'laravel', '--prefer-dist'])
			.on('error', function(){
				this.log(chalk.error('Error installing Laravel'));
				return false;
			}.bind(this))
			.on('exit', function(){
				this.log(chalk.green('Laravel5 installed'));
				done();
			}.bind(this));
		},
		app: function () {

		}
	},

	install: function () {
		var done = this.async();
		this.destinationRoot('laravel');
		this.installDependencies();
		done();
		// this.log('Thank you for using generator-laravel5. Kindly ' +
			// chalk.red('star') + ' the repository on github and/or submit feature requests!');
}

});
