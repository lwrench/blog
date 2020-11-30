function curry(fn) {
    let args = []
    function next() {
        let arg = Array.from(arguments)
        args = args.concat(arg)
        return next
    }
    next.done = function () {
        return fn.apply(null, args)
    }
    return next
}

const add = curry(function () {
    let sum = 0;
    for (let i = 0; i < arguments.length; i++) {
        sum += arguments[i]
    }
    return sum
})

console.log(add(1, 2).done())

