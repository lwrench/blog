//error
// console.log(null instanceof undefined);
// console.log(null instanceof null);

/**
 * [object Number]
   [object Null]
   [object Undefined]
   [object Function]
 */
console.log(Object.prototype.toString.call(1));
console.log(Object.prototype.toString.call(null));
console.log(Object.prototype.toString.call(undefined));
console.log(Object.prototype.toString.call(() => { }));

/**
object
undefined
function
object
object
 */
console.log(typeof null);
console.log(typeof undefined);
console.log(typeof (() => { }));
console.log(typeof {});
console.log(typeof []);