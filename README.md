# platypi-framework

This library contains the [Platypi](https://platypi.io) framework, PlatypusTS. It serves as the basis for many of the other Platypi products.

## Dependencies

None, PlatypusTS is meant to ship with no dependencies.

## Platform support

PlatypusTS is designer for use in a browser only. It works in all modern browsers (IE >= 9)

## Documentation

Find all the documentation on PlatypusTS [here](https://platypi.io/docs)

## Building the Code

To build the code take the following steps:

0. Ensure that [NodeJS](http://nodejs.org/) is installed.
0. From the root project folder run:
```shell
npm install
```

The `prepublish` npm task will build the `src`, `examples`, and `test` directories.

### Building for Deployment

To build a deployment package of PlatypusTS take the following steps:

0. Ensure that [Grunt](http://gruntjs.com/) is installed. If you need to install it you can use the following command:
```shell
npm install grunt -g
```
0. Run the following command:
```shell
grunt
```
0. You will find the compiled package in the `dist` directory.

### Building for Documentation Output

PlatypusTS is heavily documented using JSDoc format. However, for distribution many of the comments are stripped out in order to make 
them easier to read in various IDEs. To get a build of the framework with full documentation take the following steps:

0. Ensure that [Grunt](http://gruntjs.com/) is installed. If you need to install it you can use the following command:
```shell
npm install grunt -g
```
0. Run the following command:
```shell
grunt docs
```
0. You will find the compiled package in the `dist` directory.

## Running the Tests

To run the unit tests for PlatypusTS take the following steps:

0. Ensure that [NodeJS](http://nodejs.org/) is installed.
0. Ensure that [Karma CLI](http://karma-runner.github.io/) is installed. If you need to install it you can use the following command:
```shell
npm install karma-cli -g
```
0. Run the following command:
```shell
npm test
```

## Cleaning the Build

To clean all the built-files execute the following command:

```shell
npm run clean-all
```

> **NOTE:** More tasks can be found in the `package.json`
