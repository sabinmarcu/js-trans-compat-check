'use strict';

class BasicES6Class {
    constructor() {
        this.uuid = require("node-uuid").v1();
        this._truth = 42;
        this.myvalue = 100;
    }

    getMyValue() {
        return this.myvalue;
    }

    setMyValue(value) {
        this.myvalue = value;
    }

    get truth() {
        return this._truth;
    }

    set truth(value) {
        this._truth = value;
    }

    static getInstance() {
        this._instance = this._instance || new this();
        return this._instance;
    }

    static type = "es6";
}

export default BasicES6Class;
