Function.prototype.apply2=function(context,arr){
    context=context||window
    context.fn=this
    let result
    if(!arr){
        result = context.fn()
    }else{
        result=context.fn(arr)
    }
    delete context.fn
    return result
}

let foo={
    value:1
}
function bar(arr){
    let value=2
    console.log(arr[1])
    console.log(this.value)
}

bar.apply2(foo,[1,2])