function shallowClone(target){
    if(typeof target !== 'object') return
    let newObj=target instanceof Array?[]:{}
    for(const key in target){
        if(target.hasOwnProperty(key)){
            newObj[key]=target[key]
        }
    }
    return newObj
}

const obj={
    a:1,
    b:[1,2,3],
    c:{
        d:[1,2,4]
    }
}

console.log(obj)
console.log(clone(obj))
console.log(Object.assign(obj))

obj.b=4
console.log(obj)
console.log(clone(obj))
console.log(Object.assign(obj))