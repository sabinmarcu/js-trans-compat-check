makeGetter = (owner, prop, handler) -> Object.defineProperty owner, prop, get: handler
makeSetter = (owner, prop, handler) -> Object.defineProperty owner, prop, set: handler
makeProp = (owner, prop, getter, setter) -> Object.defineProperty owner, prop, get: getter, set: setter

module.exports = (klass) ->
    class ExtendedClass extends klass
        incrementMyValue: (number) =>
            @myvalue += number

        makeProp @::, "fullValue",
            (-> @myvalue + @truth),
            ((value) ->
                set =  value.split " "
                @myvalue = parseInt set[0]
                @truth = parseInt set[1]
            )

        @type = "ext-coffee"
        @exttype = klass.type

        @getInstance = -> super

        makeGetter @, "comptype", -> @type + "/" + @exttype
