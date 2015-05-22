var MainApp = require("./app");
var electronApp = require("app");

console.log("initializing...");
new MainApp(electronApp).init();