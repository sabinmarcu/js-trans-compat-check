'use strict';

export default function(klass) {

    class ExtendedClass extends klass {
        incrementMyValue(number) {
            this.myvalue += number;
        }

        get fullValue() {
            return this.myvalue + this.truth;
        }
        set fullValue(val) {
            let set = val.split(" ");

            this.myvalue = parseInt(set[0]);
            this.truth = parseInt(set[1]);
        }

        static type = "ext-es6";
        static exttype = klass.type;
        static get comptype() {
            return `${this.type}/${this.exttype}`;
        }

    }

    return ExtendedClass;

}
