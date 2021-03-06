'use strict';

const fs = require('fs');
const chalk = require('chalk');
const shell = require('shelljs');
const inquirer = require('inquirer');
const elegantSpinner = require('elegant-spinner');
const logUpdate = require('log-update');
const os = require('os');
const Table = require('cli-table');
const validate  = require('validate-npm-package-name');
const showBanner = require('../external/banner');
const boilerplate = require('../../config.json');

let serverCommands = new Table();
let generalCommands = new Table();

let frame = elegantSpinner();

let showTables = () => {

  console.log(chalk.yellow('server commands:-'));

  serverCommands.push({
    'mevn-cli create:model': 'To create models file'
  }, {
    'mevn-cli create:route' : 'To create routes file'
  }, {
    'mevn-cli create:controller': 'To create controllers file'
  }, {
    'mevn-cli create:component': 'To create components file'
  },{
    'mevn-cli add:package': 'To add a package to the project'
  }, {
    'mevn-cli create:config': 'To create config file'
  });
  console.log(serverCommands.toString());

  console.log(chalk.yellow('\ncommands to run:-'));

  generalCommands.push({
    'mevn-cli version': 'Shows the current version and additional info'
  }, {
    'mevn-cli run:server': 'To run server'
  }, {
    'mevn-cli run:client': 'To run client'
  }, {
    'mevn-cli add:package': 'To add additional packages as required'
  }, {
    'mevn-cli create:component <component_name>': 'To create new components as required'
  }, {
    'mevn-cli codesplit <component_name>': 'To lazy load components as required'
  }, {
    'mevn-cli create:git-repo': 'To create a GitHub repository and fire the first commit'
  }, {
    'mevn-cli dockerize': 'To run the client and server in separate docker containers'
  }, {
    'mevn-cli deploy': 'To deploy the app to Heroku'
  });
  console.log(generalCommands.toString());

  console.log(chalk.redBright('\n\nwarning:'));
  console.log('Do not delete mevn.json file');

};

let initfn = (dir) => {

  showBanner();
  console.log('\n');

  let initialSpinner = setInterval(() => {
    logUpdate('Initializing ' + chalk.cyan.bold.dim(frame()));
  }, 50);
  // Taking in just the argument part
  const args = process.argv.slice(3);

  setTimeout(() => {

    // Computing number of arguments given excluding options
    let argsLength = 0;
    args.map(item => {
      if (!item.startsWith('-')){
        argsLength++;
      }
    });

    // Validation for multiple directory names
    if (argsLength > 1){
      console.log(chalk.red.bold('\n Kindly provide only one argument as the directory name!!'));
      process.exit(1);
    }

  const validationResult = validate(dir);
	if (!validationResult.validForNewPackages) {
    	  console.error(
      		`Could not create a project called ${chalk.red(
        	`"${dir}"`
    		)} because of npm naming restrictions:`
    	  );
    	process.exit(1);
	}

	if (fs.existsSync(dir)) {
	  console.error(chalk.red.bold(`\n Directory ${dir} already exists in path!`));
      process.exit(1);
	}

	if (fs.existsSync('./mevn.json')) {
	  console.log(`${chalk.yellow.bold(`\n mevn.json file already exists in path!`)}`);
      process.exit(1);
	}

    clearInterval(initialSpinner);
    logUpdate.clear();

    inquirer.prompt([{
      name: 'initial',
      type: 'list',
      message: 'Please select one',
      choices: ['basic', 'pwa', 'graphql', 'Nuxt-js']

    }])
    .then((answers) => {

      fs.writeFile('./mevn.json', '{\n  \"project_name\": \"' +  dir + '\"\n}', (err) => {
        if (err) {
          throw err;
        }
      });


      if (answers.initial === 'basic'){
        shell.exec(`${boilerplate.basic}`, {silent: true}, {async: true});

        let fetchSpinner = setInterval(() => {
          logUpdate('Fetching the boilerplate ' + chalk.cyan.bold.dim(frame()));
        }, 50);

        setTimeout(() =>{

          console.log('\n');
          clearInterval(fetchSpinner);
          logUpdate.clear();
          showTables();

        }, 5000);

        if (os.type() + '' === 'Linux'){
          shell.exec('mv mevn-boilerplate ' + dir);
        } else if (os.type() + '' === 'Windows_NT'){
          shell.exec('ren mevn-boilerplate ' + dir);
        } else if (os.type() + '' === 'darwin'){
          shell.exec('mv mevn-boilerplate ' + dir);
        }

      } else if (answers.initial === 'pwa'){
          shell.exec(`${boilerplate.pwa}`, {silent: true}, {async: true});

          let pwafetchSpinner = setInterval(() => {
            logUpdate('Fetching the boilerplate ' + chalk.cyan.bold.dim(frame()));
          }, 50);

          setTimeout(() =>{

            console.log('\n');
            clearInterval(pwafetchSpinner);
            logUpdate.clear();
            showTables();

          }, 5000);

          if (os.type() + '' === 'Linux'){
            shell.exec('mv mevn-pwa-boilerplate ' + dir);
          } else if (os.type() + '' === 'Windows_NT'){
              shell.exec('ren mevn-pwa-boilerplate ' + dir);
          } else if (os.type() + '' === 'darwin'){
              shell.exec('mv mevn-pwa-boilerplate ' + dir);
          }
        } else if (answers.initial === 'graphql') {
            shell.exec(`${boilerplate.graphql}`, {silent: true}, {async: true});

            let pwafetchSpinner = setInterval(() => {
              logUpdate('Fetching the boilerplate ' + chalk.cyan.bold.dim(frame()));
            }, 50);

            setTimeout(() =>{

              console.log('\n');
              clearInterval(pwafetchSpinner);
              logUpdate.clear();
              showTables();

            }, 5000);

            if (os.type() + '' === 'Linux') {
              shell.exec('mv mevn-graphql-boilerplate ' + dir);
            } else if (os.type() + '' === 'Windows_NT') {
                shell.exec('ren mevn-graphql-boilerplate ' + dir);
            } else if (os.type() + '' === 'darwin') {
                shell.exec('mv mevn-graphql-boilerplate ' + dir);
            }
        } else {

            shell.exec(`${boilerplate.nuxt}`, {silent: true}, {async: true});

            let nuxtfetchSpinner = setInterval(() => {
              logUpdate('Fetching the boilerplate ' + chalk.cyan.bold.dim(frame()));
            }, 50);

            if (os.type() + '' === 'Linux') {
              shell.exec('mv mevn-nuxt-boilerplate ' + dir);
            } else if (os.type() + '' === 'Windows_NT') {
                shell.exec('ren mevn-nuxt-boilerplate ' + dir);
            } else if (os.type() + '' === 'darwin') {
                shell.exec('mv mevn-nuxt-boilerplate ' + dir);
            }

            setTimeout(() =>{

              console.log('\n');
              clearInterval(nuxtfetchSpinner);
              logUpdate.clear();

              inquirer.prompt([{
                name: 'mode',
                type: 'list',
                message: 'Choose your preferred mode',
                choices: ['Universal', 'SPA']
              }])
              .then((choice) => {
                if (choice.mode === 'Universal') {

                  let configFile = fs.readFileSync(`./${dir}/nuxt.config.js`, 'utf8').toString().split('\n');

                  let index = configFile.indexOf(configFile.find(line => line.includes('mode')));
                  configFile[index] = ` mode: 'universal',`;

                fs.writeFileSync(`./${dir}/nuxt.config.js`, configFile.join('\n'));
                }
                showTables();
              });


            }, 5000);
      }

    });
  }, 1000);

};

module.exports = initfn;
