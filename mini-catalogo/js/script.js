
fetch("componentes/header/header.html")
.then(res => res.text())
.then(data => {
    document.getElementById("header").innerHTML = data;
});


fetch("componentes/footer/footer.html")
.then(res => res.text())
.then(data => {
    document.getElementById("footer").innerHTML = data;
});




class ProductCard extends HTMLElement {
    connectedCallback(){

        let nombre = this.getAttribute("nombre");
        let precio = this.getAttribute("precio");
        let descripcion = this.getAttribute("descripcion");

        this.innerHTML = `
        <div class="card">
            <h3>${nombre}</h3>
            <p>${descripcion}</p>
            <b>$${precio}</b>
        </div>
        `;
    }
}

customElements.define("product-card", ProductCard);




let productos = [
    {
        nombre: "Laptop",
        precio: 1500000,
        descripcion: "Laptop"
    },
    {
        nombre: "Mouse",
        precio: 50000,
        descripcion: "Mouse inalámbrico"
    },
    {
        nombre: "Teclado",
        precio: 120000,
        descripcion: "Teclado mecánico"
    }
];




let catalogo = document.getElementById("catalogo");

for(let i = 0; i < productos.length; i++){

    catalogo.innerHTML += `
    <product-card
        nombre="${productos[i].nombre}"
        precio="${productos[i].precio}"
        descripcion="${productos[i].descripcion}">
    </product-card>
    `;

}