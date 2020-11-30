Function.prototype.bind2=function(context){
    let self=this
    let args=Array.prototype.slice(arguments,1)
    return function(){
        let args2=Array.prototype.slice(arguments)
        return self.apply(context,args.concat(args2))
    }
}