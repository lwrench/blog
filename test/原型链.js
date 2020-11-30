function Parent(){
    this.a = 'Parent';
 }
 function Tom() {
    this.a = 'Tom'
 }
 Parent.__proto__.print = function(){
    console.log(this.a)
 }
 Parent.print()
 Tom.print()
 var child = new Parent()
 child.print()
 
//  执行以上代码，将分别输出什么？ D
//  A. 'undefined' 'Uncaught TypeError ...' 'Parent'
//  B. 'Parent' 'Uncaught TypeError ...' 'Uncaught TypeError ...'
//  C. 'Parent' 'Tom' 'Uncaught TypeError ...'
//  D. 'undefined' 'undefined' 'Uncaught TypeError ...'