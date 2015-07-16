makeGetter = (owner, prop, handler) -> Object.defineProperty owner, prop, get: handler
makeSetter = (owner, prop, handler) -> Object.defineProperty owner, prop, set: handler
makeProp = (owner, prop, getter, setter) -> Object.defineProperty owner, prop, get: getter, set: setter

class BaseCoffeeClass
    constructor: ->
        @uuid = require("node-uuid").v1()
        @_truth = 42
        @myvalue = 100

    getMyValue: => @myvalue
    setMyValue: (value) => @myvalue = value

    makeProp @::, "truth", (-> return @_truth), ((val) -> @_truth = val)
    @getInstance = ->
        @_instance = @_instance or new @()
        @_instance

    @type = "coffee"

module.exports = BaseCoffeeClass
