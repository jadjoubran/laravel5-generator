'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
	initializing: function () {
		this.pkg = require('../package.json');

		//eliminated manual conflict resolution because the laravel installation is fresh and is not altered by the user yet
		this.conflicter.force = true;
	},

	prompting: function () {
		var done = this.async();

		this.log(yosay(
			'Welcome to the first-class ' + chalk.red('Laravel5') + ' generator!'
			));


		var prompts = [{
			type: 'confirm',
			name: 'angularjs',
			message: 'Would you like to use Angular as a javascript framework?',
			default: false
		}, {
			type: 'confirm',
			name: 'jshint',
			message: 'Would you like to use jshint?',
			default: true
		}, {
			type: 'confirm',
			name: 'jscs',
			message: 'Would you like to use javascript code style (jscs)?',
			default: true
		}, {
			type: 'confirm',
			name: 'editorconfig',
			message: 'Would you like to use Editor Config?',
			default: true
		}
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
				this.log(chalk.red('Bower not found. Please download it globally using npm install -g bower'));
				return false;
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

			/*generic installs*/
			this.fs.copy(
				this.templatePath('generic/_readme.md'),
				this.destinationPath('readme.md')
				);
			if ( this.props.jscs ){
				this.fs.copy(
					this.templatePath('generic/_jscs.json'),
					this.destinationPath('.jscs.json')
					);
			}
			if ( this.props.editorconfig ){
				this.fs.copy(
					this.templatePath('generic/_editorconfig'),
					this.destinationPath('.editorconfig')
					);
			}

			/*angularjs specific*/
			if ( this.props.angularjs ){
				this.fs.copy(
					this.templatePath('angular/_package.json'),
					this.destinationPath('package.json')
					);
				this.fs.copy(
					this.templatePath('angular/_bower.json'),
					this.destinationPath('bower.json')
					);
				this.fs.copy(
					this.templatePath('angular/_gulpfile.js'),
					this.destinationPath('gulpfile.js')
					);
				this.fs.copy(
					this.templatePath('angular/_gitignore'),
					this.destinationPath('.gitignore')
					);
				if ( this.props.jshint ){
					this.fs.copy(
						this.templatePath('angular/_jshintrc'),
						this.destinationPath('.jshintrc')
						);
				}
				/*copy angular sample directory*/
				this.fs.copy(
					this.templatePath('angular/angular/**/*'),
					this.destinationRoot('angular/')
					);
			}else{
				this.fs.copy(
					this.templatePath('plain/_package.json'),
					this.destinationPath('package.json')
					);
				this.fs.copy(
					this.templatePath('plain/_bower.json'),
					this.destinationPath('bower.json')
					);
				this.fs.copy(
					this.templatePath('plain/_gulpfile.js'),
					this.destinationPath('gulpfile.js')
					);
				if ( this.props.jshint ){
					this.fs.copy(
						this.templatePath('plain/_jshintrc'),
						this.destinationPath('.jshintrc')
						);
				}
			}
		}
	},

	install: function () {
		var done = this.async();
		this.destinationRoot('../');
		this.installDependencies();
		done();
	},
	end: function(){
		this.log('You need to manually uncomment .bower() in your gulpfile.js after adding the first bower component' + "\n");

		this.log("\nAll done!\nThank you for using generator-laravel5. Kindly " + chalk.yellow('star') +
			' the repository on github and/or submit feature requests!');
	}

});
