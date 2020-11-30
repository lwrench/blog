function debounce(fn,wait,immediate){
    let timer=null
    return function(){
        let context=this
        let args=Array.from(arguments)
        clearTimeout(timer)
        if(immediate){
            
        }else{
            timer=setTimeout(()=>{
                fn.apply(context,args)
            },wait)
        }
        
    }
}

function throttle(fn,wait){
    let old=0
    let context=this
    return function(){
        let now=new Date().valueOf()
        let args=Array.from(arguments)
        if(now-old>wait){
            fn.apply(context,args)
            old=now
        }
    }
}