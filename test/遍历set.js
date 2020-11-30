const set = new Set([1, 34, 5, 1, 2, 3, 5, 3])

// for (let item of set.keys()) {
//     console.log(item);
// }
//
// for (let item of set.values()) {
//     console.log(item);
// }

// for (let item of set.entries()) {
//     console.log(item[0],item[1]);
// }

// const map = new Map()
// map.set('1',5)
// map.set('2',4)
// map.set('3',3)
//
// for(let [key,value] of map.entries()){
//     console.log(key,value)
// }

const obj = {
    index1:'hhhh',
    index2:'oooo'
}

obj.__proto__.f="function"
console.log(obj.__proto__);

for(let prop in obj){
    console.log(prop)
}
