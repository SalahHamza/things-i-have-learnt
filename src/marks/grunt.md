# Grunt

Grunt is a JavaScript task runner, a tool used to automatically perform frequent tasks such as minification, compilation, unit testing, and linting. It uses a command-line interface to run custom tasks defined in a file.
via: [Wikipedia](https://en.wikipedia.org/wiki/Grunt_(software))

## Installation

1- install **grunt-cli** globally:
```shell
npm install -g grunt-cli
```
What does it do? **grunt-cli** runs the version of Grunt which has been installed next to a `Gruntfile`. This allows multiple versions of Grunt to be installed on the same machine simultaneously.

2 - The root of your project must have both `package.json` and a `Grunfile`:
   * `package.json`can be created by initializing the project with `npm init` or `npm init -y` to skip the questionnaire altogether.
   * the `Gruntfile` must be created manually.
      - `Gruntfile.coffee` for Coffeescript.
      - `Gruntfile.js`for plain Javascript.
**Note**: both `package.json` and `Grunfile` should be committed with your project source.

3 - install `grunt`locally as a [DevDependency](https://docs.npmjs.com/files/package.json#devdependencies):
```shell
npm install grunt --save-dev
```
or in case you want to install a specific version:
```shell
npm install grunt@VERSION --save-dev
```
**Note**: `VERSION` is the grunt version you want to install (e.g. **0.4.5**).

4 - install needed **gruntplugins**, also as DevDependencies. Here are some recommended plugins:
   * **[grunt-contrib-jshint](https://github.com/jshint/jshint)** which is a Javascript validation tool:
  ```shell
  npm install grunt-contrib-jshint --save-dev
  ```
   * **[grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean#readme)** which is a tool that cleans up your build to make sure that no artifacts from previous builds are hanging around, read more about it [here](https://coderwall.com/p/fkdyag/ignoring-files-and-folders-with-grunt-contrib-clean):
  ```shell
  npm install grunt-contrib-jshint --save-dev
  ```
   * **[grunt-contrib-nodeunit](https://github.com/gruntjs/grunt-contrib-nodeunit#readme)** provides server-side JavaScript unit testing:
  ```shell
  npm install grunt-contrib-nodeunit --save-dev
  ```
   * **[grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify#readme)** which parses, minifies and compresses (or basically uglifies) JS files:
  ```shell
  npm install grunt-contrib-uglify --save-dev
  ```
   * **[grunt-mkdir](https://github.com/rubenv/grunt-mkdir)** gives grunt the ability to create directories:
  ```shell
  npm install grunt-mkdir --save-dev
  ```
   * **[grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy#readme)** gives grunt the ability to copy files:
  ```shell
  npm install grunt-contrib-copy --save-dev
  ```
   * the **[grunt-responsive-images](https://github.com/andismith/grunt-responsive-images)** plugin produces images at different sizes for responsive websites:
  ```shell
  npm install grunt-responsive-images --save-dev
  ```

## Project and Task configuration

First you need to note that all of your Grunt code must be specified inside a **wrapper** function:
```js
module.exports = function(grunt) {
  // Do grunt-related things in here
};
```
