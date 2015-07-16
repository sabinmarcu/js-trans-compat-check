"use strict";

require("babel/register");
require("coffee-script/register");
require("LiveScript");

var gulp = require("gulp"), mocha = require("gulp-mocha"), notify = require("gulp-notify");

gulp.task("test", function() {
    return gulp.src("tests/**/*.test.*", { read: false }).pipe(mocha({reporter: "nyan"}))
    // .on("error", notify.onError({title: "Test Error"})).pipe(notify({title: "Success!", message: "Tests successful!"}));
});

gulp.task("watch", function() {
    gulp.watch(["tests/**/*"], ["test"]);
});

gulp.task("default", ["test"]);
gulp.task("dev", ["test", "watch"]);
