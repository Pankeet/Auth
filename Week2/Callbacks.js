function timeout(){
    console.log("Hi ! There");
}
console.log("Hello ! World")
setTimeout(timeout,1000)
let x = 0;
// 3~4 sec
for(let i = 0; i < 10000000000; i++)
{
    x = x + 1;
}
console.log("Expensive ! Task Done");
