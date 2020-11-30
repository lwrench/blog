setTimeout(()=>{
    console.log(this)
},0)

function a(){
    console.log(this)
}

a()