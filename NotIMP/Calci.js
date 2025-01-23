function sum(a,b)
{
    return a+b;
}
function mulit(a,b)
{
    return a*b;
}
function todo(op,a,b)
{
    let value = op(a,b);
    return value
}

console.log(todo(mulit,1,2));