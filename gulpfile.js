var gulp = require("gulp");
var less = require("gulp-less");
var clean = require("gulp-clean");
var babel = require("gulp-babel");
var watch = require("gulp-watch");
var plumber = require("gulp-plumber");
var concatCss = require("gulp-concat-css");



var path = {
	jsx: {
		src: "src/renderer/**/*.jsx",
		dst: "dist"
	},
	app:{
		src: "src/main/**/*.js",
		dst: "app"
	},
	less: {
		bundled: "dist/bundle.css",
		dst: ".",
		src: "src/renderer/less/**/*.less"
	},
	clean: {
		all: "dist/**/*.*",
		app: "app/**/*.js",
		jsx: "dist/**/*.jsx",
		less: "dist/**/*.css"
	},
	watch: {
		app: "src/main/**/*.js",
		jsx: "src/renderer/**/*.jsx",
		less: "src/renderer/**/*.less"
	}
};

gulp.task("app", ["clean-app"], function(){

	gulp.src(path.app.src)
		.pipe(plumber())
		.pipe(babel())
		.pipe(gulp.dest(path.app.dst));

});


gulp.task("jsx", ["clean-jsx"], function(){

	gulp.src(path.jsx.src)
		.pipe(plumber())
		.pipe(babel())
		.pipe(gulp.dest(path.jsx.dst));

});

gulp.task("less", ["clean-less"], function(){

	gulp.src(path.less.src)
		.pipe(plumber())
		.pipe(less())
		.pipe(concatCss(path.less.bundled))
		.pipe(gulp.dest(path.less.dst));

});

gulp.task("clean-all", function(){

	gulp.src(path.clean.all, {read: false})
		.pipe(clean({ force: true }));

});

gulp.task("clean-app", function(){

	gulp.src(path.clean.app, { read: false})
	  	.pipe(clean());
});


gulp.task("clean-jsx", function(){

	gulp.src(path.clean.jsx, { read: false})
	  	.pipe(clean());
});

gulp.task("clean-less", function(){

	gulp.src(path.clean.less, { read: false})
	  	.pipe(clean());
});


gulp.task("watch", ["watch-app", "watch-jsx", "watch-less"]);

gulp.task("watch-app", function(){
	gulp.watch(path.watch.app, ["app"]);
});

gulp.task("watch-jsx", function(){
	gulp.watch(path.watch.jsx, ["jsx"]);
});

gulp.task("watch-less", function(){
	gulp.watch(path.watch.less, ["less"]);
});


gulp.task("build", ["app", "jsx", "less"]);


gulp.task("default", ["clean-all", "build", "watch"]);