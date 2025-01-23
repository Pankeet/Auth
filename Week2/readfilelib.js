const FileSystem = require("fs");

function print(err, data)
{
    if(err)
    {
        console.log("PC");
    }
    else{
    console.log(data);
    }
}
FileSystem.readFile("a.txt", "UTF-8",print);
FileSystem.readFile("b.txt", "utf-8",print);

console.log('Hello world');
