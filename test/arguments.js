function foo() {
    for (let i = 0; i < arguments.length; i++) {
        console.log(arguments[i])
    }
}

foo('21','12',23)