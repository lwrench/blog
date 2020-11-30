/**
 * 利用JSON.stringity和ISON.parse实现简单的深拷贝，但是不能拷贝函数、正则
 */
// const arr = ['old', 1, true, ['old1', 'old2'], { old: 1 }]
// const new_arr = JSON.parse(JSON.stringify(arr));
// console.log(new_arr);

const deepClone = (obj) => {
    if (typeof obj !== "object") return
    let newObj = obj instanceof Array ? [] : {};
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
        }
    }
    return newObj
}

const obj={
    1:function(){console.log(this.value)},
    2:2,
    value:3,
}
obj[1]()

let copy=deepClone(obj)

copy[1]()