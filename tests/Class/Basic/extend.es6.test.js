/*global describe it beforeEach*/

'use strict';

var expect = require('chai').expect, functionTest = require("./function.test");
var klasses = {
    "es6": require("./es6.class"),
    "coffee": require("./coffee.class"),
    "livescript": require("./livescript.class")
};

var makeTest = function(klass) {

    try {
        var factory = require("./" + klass.type + ".extend.class");
    } catch (e) {
        console.log("Class of type " + klass.type + " (" + klass.type + ".extend.class) has no extend defined");
    }

    if ((typeof factory) !== "undefined" && factory !== null) {
        for (let t in klasses) {
            let eklass = factory(klasses[t]);

            describe("Extended Class (type: " + eklass.type + " extends " + klasses[t].type + ")", function() {
                functionTest(eklass, "ext-" + klass.type);

                describe("static", function() {
                    it("should have a proper type", function() {
                        expect(eklass.type).to.equal("ext-" + klass.type);
                    });
                    it("should have a proper extension type", function() {
                        expect(eklass.exttype).to.equal(klasses[t].type);
                    });
                    it("should have a proper computed type", function() {
                        expect(eklass.comptype).to.equal("ext-" + klass.type + "/" + klasses[t].type);
                    });
                });

                describe("instances", function() {
                    var X;
                    beforeEach(function() {
                        X = new eklass();
                    });

                    it("should increment properly (func)", function() {
                        expect(X.getMyValue()).to.equal(100);
                        X.incrementMyValue(50);
                        expect(X.getMyValue()).to.equal(150);
                        X.incrementMyValue(-100);
                        expect(X.getMyValue()).to.equal(50);
                    });

                    it("should increment properly (func)", function() {
                        expect(X.myvalue).to.equal(100);
                        X.incrementMyValue(50);
                        expect(X.myvalue).to.equal(150);
                        X.incrementMyValue(-100);
                        expect(X.myvalue).to.equal(50);
                    });

                    describe("#fullValue", function() {

                        it("should compute the proper value", function() {
                            expect(X.fullValue).to.equal(X.myvalue + X.truth);
                            expect(X.fullValue).to.equal(142);
                        });
                        it("should split and save properly", function() {
                            expect(X.fullValue).to.equal(X.myvalue + X.truth);
                            X.fullValue = "6 9";
                            expect(X.fullValue).to.equal(X.myvalue + X.truth);
                            expect(X.myvalue).to.equal(6);
                            expect(X.truth).to.equal(9);
                            expect(X.fullValue).to.equal(15);
                        });
                        it("should recompute on change", function() {
                            expect(X.fullValue).to.equal(X.myvalue + X.truth);
                            X.truth = 69;
                            X.setMyValue(25);
                            X.incrementMyValue(5);
                            expect(X.myvalue).to.equal(30);
                            expect(X.truth).to.equal(69);
                            expect(X.fullValue).to.equal(99);
                        });
                    });

                });
            });
        }
    }
};

for (let type in klasses) {
    makeTest(klasses[type], type);
}

export default makeTest;
