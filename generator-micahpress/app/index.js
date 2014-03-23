'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var exec = require('child_process').exec;

var MicahpressGenerator = yeoman.generators.Base.extend({
	promptForDirectory : function () {
		var done = this.async();
		this.prompt({name:'appname',message:'What is the name of the app?'}, function (opts) {
			this.appname = opts.appname;
			done();
		}.bind(this));
	},
	installLaravel : function () {
		var done = this.async();
		console.log('--Installing Laravel--');
		exec('composer create-project laravel/laravel . --prefer-dist', function (a,b,c) {
	
	
		
	console.log('--Laravel Installed--');
			done();
		})
			},
	createFolders : function () {
		this.mkdir('public/js/');
		this.mkdir('public/js/lib');
		this.mkdir('public/js/src');
		this.mkdir('public/js/test');
		this.mkdir('app/config/local/');
	},
	copyJSFiles : function () {
//		this.cp('_package.json','package.json');
//		this.cp('_bower.json','bower.json');

	},
	installJSDependencies : function () {
		console.log('--Installing Bower components--');
		this.copy('_bower.json','bower.json');
		this.copy('_bowerrc','.bowerrc');
		this.bowerInstall();
	},
	addGenerators : function () {
console.log('--Install JeffreyWay Generators--');
var done = this.async;
		var copy = this.copy;
		exec('composer require way/generators:*', function (a,b,c) {
			console.log(a);
			console.log(b);
			console.log(c);
			
		done();
		});
		this.mkdir('app/config/local/');
		this.copy('_config-app.php', 'app/config/local/app.php');
		
	},
	addFaker : function () {
		console.log('--Install Faker library--');
		var done = this.async;

		exec('composer require fzaninotto/faker:*', function () {done()});
	},
	setUpVagrant : function () {
		console.log('--set up vagrant files--');
		this.copy('_Vagrantfile', 'Vagrantfile');
		this.copy('_install.sh','install.sh');
	}
});

module.exports = MicahpressGenerator;
