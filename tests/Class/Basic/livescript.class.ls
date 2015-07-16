class BaseLSClass
    ~>
        @uuid = require \node-uuid .v1!
        @_truth = 42
        @myvalue = 100

    getMyValue: ~> @myvalue
    setMyValue: (value) ~> @myvalue = value

    truth:~
        -> @_truth
        (val) -> @_truth = val

    @getInstance = ->
        @_instance = @_instance or new @()
        @_instance

    @type = "livescript"

module.exports = BaseLSClass
