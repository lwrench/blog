const a = 0

const obj1 = {
    a: 1,
}

const obj2 = {
    a: 2,
}

function b() {
    console.log(this.a)
}

b.bind(obj2).apply(obj1)


