System.register("model/MyModel", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("main", ["model/MyModel"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var MyModel_1, myGreeter;
    return {
        setters: [
            function (MyModel_1_1) {
                MyModel_1 = MyModel_1_1;
            }
        ],
        execute: function () {
            myGreeter = new Greeter("hello, world");
            myGreeter.greeting = "howdy";
            myGreeter.myModel = new MyModel_1.MyModel("Hello");
            myGreeter.showGreeting();
        }
    };
});
//# sourceMappingURL=main.js.map