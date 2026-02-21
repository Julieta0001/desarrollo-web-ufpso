const btn=document.getElementById("themeBtn")

btn.addEventListener("click", () ={
    document.body.classlist. toggle ("dark");
    if(document.body.classlist.contains("dark")){
        btn.textContent= "modo claro"

    }
    else{
        btn.content= "modo oscuro "
    }
}
)