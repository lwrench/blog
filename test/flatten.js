//递归
function flatten(arr) {
    let res = []
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            res=res.concat(flatten(arr[i]))
        } else {
            res.push(arr[i])
        }
    }

    return res
}

//reduce
function flatten2(arr) {
    return arr.reduce((prev, curr) => {
        return prev.concat(Array.isArray(curr) ? flatten2(curr) : curr)
    }, [])
}

//ES6
function flatten3(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}
const arr = [1, [2, [3, 4]]];
console.log(flatten(arr))
console.log(flatten2(arr))
console.log(flatten3(arr))
