'use strict';
var yeoman = require('yeoman-generator'),
chalk  = require('chalk'),
cp  = require('child_process');

module.exports = yeoman.generators.Base.extend({
	initializing: function () {
		this.pkg = require('../package.json');
	},

	prompting: function () {
		var done = this.async();

		this.log(chalk.red('Laravel5') + ' generator will install laravel5 in your folder!');

		var prompts = [{
			type: 'confirm',
			name: 'someOption',
			message: 'Would you like to enable this option?',
			default: true
		}];

		this.prompt(prompts, function (props) {
			this.someOption = props.someOption;

			done();
		}.bind(this));
	},

	configuring: {
		composer: function(){
			this.log(chalk.cyan('Testing for composer'));
			var self = this;
			cp.exec('composer --version', function (err, stdout, stderr) {
				if (err) {
					self.log(chalk.red('Composer not found. Make sure it is available in your path and download it from https://getcomposer.org'));
					return false;
				}

				self.log(chalk.green('Composer found'));
			});
},
		bower: function(){
			this.log(chalk.cyan('Testing for bower'));
			var self = this;
			cp.exec('bower -v', function (err, stdout, stderr) {
				if (err) {
					self.log(chalk.cyan('Bower not found. Installing bower'));
					cp.exec('npm install -g bower', function(err, stdout, stderr){
						self.log(stdout);
					});
				}

				self.log(chalk.green('Bower found'));
			});
},


},

writing: {
	app: function () {
		this.fs.copy(
			this.templatePath('_package.json'),
			this.destinationPath('package.json')
			);
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
	this.installDependencies({
		skipInstall: this.options['skip-install']
	});
}
});
