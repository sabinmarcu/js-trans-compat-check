/*global describe it*/

'use strict';
var expect = require("chai").expect;

var DemoClass = function() {
    var item = 5, myitem = 10;
    this.myitem = myitem;
    this.uuid = require("node-uuid").v1();
    this.returnAll = function() {
        return [item, myitem, this.myitem];
    };
    this.returnMyItem = function() {
        return myitem;
    };
};

DemoClass.getInstance = function() {
    this._instance = this._instance || new DemoClass();
    return this._instance;
};

DemoClass.prototype.addToMyItem = function(value) {
    this.myitem = (this.myitem || 0) + value;
};

DemoClass.prototype.getMyItem = function() {
    return this.myitem;
};

describe("ES5 Demo Class Basic", function() {
    describe("#getInstance()", function() {
        var x = DemoClass.getInstance(), y = DemoClass.getInstance();
        it("should return same uuids", function() {
            expect(x.uuid).to.equal(y.uuid);
        });
        it("should return same objects", function() {
            expect(x).to.equal(y);
        });
    });
    describe("instance", function() {
        var x = new DemoClass();
        it("should have a correct intial set of data", function() {
            expect(x.myitem).to.equal(10);
        });
        describe("#returnAll()", function() {
            var set = x.returnAll();
            it("should return the proper item", function() {
                expect(set[0]).to.equal(5);
            });
            it("should return the proper private myitem", function() {
                expect(set[1]).to.equal(10);
            });
            it("should return the proper instance myitem", function() {
                expect(set[2]).to.equal(10);
            });
        });
        describe("#myItem", function() {
            it("#returnMyItem() should return the proper item (simple)", function() {
                var r = x.returnMyItem();
                expect(r).to.equal(10);
            });
            it("#addToMyItem() should work as expected", function() {
                expect(x.getMyItem()).to.equal(10);
                expect(x.returnMyItem()).to.equal(10);
                x.addToMyItem(5);
                expect(x.getMyItem()).to.equal(15);
                expect(x.returnMyItem()).to.equal(10);
            });
            it("#returnMyItem() should return the proper item (simple)", function() {
                expect(x.getMyItem()).to.equal(15);
                expect(x.returnMyItem()).to.equal(10);
                x.addToMyItem(5);
                expect(x.getMyItem()).to.equal(20);
                expect(x.returnMyItem()).to.equal(10);
                x.addToMyItem(-10);
                expect(x.getMyItem()).to.equal(10);
                expect(x.returnMyItem()).to.equal(10);
            });
        });
    });
});
