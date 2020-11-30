function a() {
    var foo = 1;
    console.log(foo);
    function foo() {
        console.log("foo");
    }
}

function b() {
    console.log(foo);
    function foo() {
        console.log("foo");
    }
    var foo = 1;
}

a()
b()