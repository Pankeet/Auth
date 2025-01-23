function addtodo()
{
    let ctr = 0
    const value123 = document.querySelectorAll("input")[0];
    var eleval = value123.value;

    const newele = document.createElement("div");
    newele.setAttribute("id", ctr);
    newele.innerHTML = "<span>"+ eleval + "<button onclick='updatetodo("+ctr +")'>Update<button onclick='deletetodo("+ ctr +")'>Delete Todo </span>" ;
    ctr+=1;

    document.body.appendChild(newele)
}
function deletetodo(index)
{
    const ele1 = document.getElementById(index);
    ele1.parentElement.removeChild(ele1)
}
