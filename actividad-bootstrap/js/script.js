// botones de las cards para abrir una ventana modal 
let botones = document.querySelectorAll(".btn-modal");

botones.forEach(boton => {
boton.addEventListener("click", function(e) {
    e.preventDefault();
    let modal = new bootstrap.Modal(document.getElementById("miModal")); 
    modal.show(); 
    
})
})
//validacioni del formulario 
document.getElementById("loginForm"). addEventListener("submit", function(e){
 
 let email =document.getElementById("email").value 
 let pasword =document.getElementById("password").value
 let message =document.getElementById("message")

 //valores didacticos para esta actividad

 const USER_DEFAULT ="prueba@gmail.com"
 const PASWORD_DEFAULT ="1234"

 

 if (email===""|| pasword ===""){
    message.innerHTML=" Todos los campos son obligatorios "
     message.className = "text-warning"


 }else if (email === USER_DEFAULT && pasword === PASWORD_DEFAULT){
    message.innerHTML =" Bienvenido al sistema "
    message.className ="text-success"
}
else {
    message.innerHTML = "Error: Usuario o contraseña inválida "
    message.className ="text-danger"
}
})