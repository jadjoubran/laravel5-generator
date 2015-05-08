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


		var prompts = [{
			type: 'confirm',
			name: 'editorconfig',
			message: 'Would you like to use Editor Config?',
			default: true
		},
		{
			type: 'confirm',
			name: 'jshint',
			message: 'Would you like to use jshint?',
			default: true
		},
		{
			type: 'confirm',
			name: 'jscs',
			message: 'Would you like to use javascript code style (jscs)?',
			default: true
		},
		];
		this.prompt(prompts, function (props) {
			this.props = props;
			done();
		}.bind(this));
	},

	configuring: {
		composer: function(){
			var done = this.async();
			this.log(chalk.cyan('Checking if composer is installed'));

			this.spawnCommand('composer', ['--version'])
			.on('error', function(){
				this.log(chalk.red('Composer not found. Make sure it is available in your path or download it from getcomposer.org'));
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
				}.bind(this));
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
		projectfiles: function () {
			this.destinationRoot('laravel');
			this.fs.copy(
				this.templatePath('_package.json'),
				this.destinationPath('package.json')
				);
			this.fs.copy(
				this.templatePath('_bower.json'),
				this.destinationPath('bower.json')
				);
			this.fs.copy(
				this.templatePath('_gulpfile.js'),
				this.destinationPath('gulpfile.js')
				);
			if ( this.props.editorconfig ){
				this.fs.copy(
					this.templatePath('_editorconfig'),
					this.destinationPath('.editorconfig')
					);
			}
			if ( this.props.jshint ){
				this.fs.copy(
					this.templatePath('_jshintrc'),
					this.destinationPath('.jshintrc')
					);
			}
			if ( this.props.jscs ){
				this.fs.copy(
					this.templatePath('_jscs.json'),
					this.destinationPath('.jscs.json')
					);
			}
		}
	},

	install: function () {
		var done = this.async();
		this.installDependencies();
		done();
	},
	end: function(){
		this.log("\nAll is done!\nThank you for using generator-laravel5. Kindly " + chalk.red('star') +
			' the repository on github and/or submit feature requests!');
	}

});
