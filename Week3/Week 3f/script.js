var c = 0;
function incrementaftertime()
{
    document.querySelector("h4").innerHTML = c;
    document.querySelectorAll("h4")[1].innerHTML = c;
    c = c + 1;
}
setInterval(incrementaftertime,1000);