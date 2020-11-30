function new2() {
    let obj = new Object()
    let constructor = Array.shift.call(arguments)
    obj.__proto = constructor.prototype
    let result = constructor.apply(obj, arguments)
    return typeof result === 'object' ? result : obj
}