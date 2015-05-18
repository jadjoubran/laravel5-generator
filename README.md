# generator-laravel5

> [Yeoman](http://yeoman.io) generator


## Getting Started

### Setup

```bash
npm install -g yo generator-laravel5 bower
```

When ready, initiate the generator:

```bash
yo laravel5
```

Answer a few questions and you're ready to start working on your Favorite laravel 5 application.
You can also setup your laravel application to use Angular JS.


## Contributing

I am hoping to get feature suggestions from people like you. Just create a new issue.


## Changelog

### 0.1.1

+ Updated description on yeoman website

### 0.1.0

+ Added suppot for Javascript Framework: Angular
+ Defaulting `private` to `true` in both bower.json and package.json
+ Eliminated manual conflict resolution because the laravel installation is fresh and is not altered by the user yet
+ Speed up generation process by installing bower globally when downloading the generator instead of during runtime

### 0.0.8

+ Add laravel elixir bower functionality to elixir
+ request to star the repository and submit feature requests at the end


### 0.0.7

+ copy bower, copy package.json, editorconfig, jshint and jscs
+ ask user for editorconfig, jshint and jscs



### 0.0.6

+ fixed repository link


### 0.0.5

+ updated to new base generator-generator
+ fixed async race conditions
+ code cleanup
+ installing node and bower dependencies



## License

MIT
