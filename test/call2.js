Function.prototype.call2=function(context){
    var context=context||window
    context.fn=this
    let args=[]
    for(let i=1;i<arguments.length;i++){
        args.push(arguments[i])
    }
    let result=context.fn(...args)
    delete context.fn
    return result
}
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}

bar.call2(foo, 'kevin', 18); 
