'use strict';
var yeoman = require('yeoman-generator'),
chalk  = require('chalk'),
cp  = require('child_process'),
fs = require('fs-extra');

module.exports = yeoman.generators.Base.extend({
	initializing: function () {
		this.pkg = require('../package.json');
	},

	prompting: function () {
		var done = this.async();

		this.log(chalk.red('Laravel5') + ' generator will install laravel5 in your folder!');
		done();

		// var prompts = [{
			// type: 'confirm',
			// name: 'someOption',
			// message: 'Would you like to enable this option?',
			// default: true
		// }];

		// this.prompt(prompts, function (props) {
			// this.someOption = props.someOption;
			// done();
		// }.bind(this));
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
				this.destinationPath('bower.json')
				);
		},

		projectfiles: function () {
			this.fs.copy(
				this.templatePath('editorconfig'),
				this.destinationPath('.editorconfig')
				);
			this.fs.copy(
				this.templatePath('jshintrc'),
				this.destinationPath('.jshintrc')
				);
		}
	},

	install: function () {
		this.rmDir = function(dirPath) {
			try {
				var files = fs.readdirSync(dirPath);
			}
			catch(e) { return; }
			if (files.length > 0)
				for (var i = 0; i < files.length; i++) {
					var filePath = dirPath + '/' + files[i];
					if (fs.statSync(filePath).isFile())
						fs.unlinkSync(filePath);
					else
						rmDir(filePath);
				}
				fs.rmdirSync(dirPath);
			};


			this.spawnCommand('composer', ['create-project', 'laravel/laravel', 'laravel', '--prefer-dist'])
			.on('error', function(){
				this.log(chalk.error('Error installing Laravel'));
			}.bind(this))
			.on('exit', function(){
				this.log(chalk.cyan('Moving folders'));
				// fs.move('laravel5_temp', '', function(err) {
					// if (err){
						// return this.log(chalk.red(err));
					// }
					// this.log(chalk.green("success!"));
				// }.bind(this));
			}.bind(this));

			this.installDependencies({
				skipInstall: this.options['skip-install']
			});
		}
	}
});
