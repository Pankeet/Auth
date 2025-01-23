// A Promise in JavaScript is an object that represents the eventual completion (or failure)
// of an asynchronous operation and its resulting value. 

setTimeoutPromisified(5000).then(callback);
function setTimeoutPromisified(ms)
{
    return new Promise(resolve=>setTimeout(resolve,ms));
    
}
function callback(){
    console.log("Ha");
}