// Datos de los productos (Ejemplo)
const productos = [
    { id: 1, nombre: "Tenis Deportivos Pro", precio: 500, imagen: "https://resources.claroshop.com/medios-plazavip/s2/12476/1766594/5f6d83eb1576c-96628-1600x1600.jpg"},
    { id: 2, nombre: "Tenis Urbanos Classic", precio: 750, imagen: "https://th.bing.com/th/id/OIP.JDav90UiqiYk8aLT68yrmgAAAA?rs=1&pid=ImgDetMain"},
    { id: 3, nombre: "Tenis Running Speed", precio: 900, imagen: "https://www.pappomania.com/Images/products/1050x1050/R238822-2/R238822-2_1_grd.jpg"},
    { id: 4, nombre: "Tenis Basket Power", precio: 800, imagen: "https://i0.wp.com/robbreport.mx/wp-content/uploads/2021/04/asics.png?resize=980%2C558&ssl=1"},
    { id: 5, nombre: "Tenis Futbol Strike", precio: 750, imagen: "https://resources.claroshop.com/medios-plazavip/s2/12476/1569594/5f6c1eaa100d6-79340-0-1600x1600.jpg"},
    { id: 6, nombre: "Tenis Casual Street", precio: 950, imagen: "https://resources.claroshop.com/medios-plazavip/s2/12476/1763506/5f6c0872d0cb7-93356-0-1600x1600.jpg" },
    { id: 7, nombre: "Tenis Outdoor Explorer", precio: 1600, imagen: "https://resources.claroshop.com/medios-plazavip/s2/12476/1569872/5f6d82b2270ba-93347-0-1600x1600.jpg" },
    { id: 8, nombre: "Tenis Trail Master", precio: 1500, imagen: "https://resources.claroshop.com/medios-plazavip/s2/14066/2077484/6011ab6e4c7e5-1-1600x1600.jpg" }
];

let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos();
});

function mostrarProductos() {
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar</button>
        `;
        contenedor.appendChild(div);
    });
}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    actualizarCarrito();
}

function actualizarCarrito() {
    const contenedorCarrito = document.getElementById("carrito");
    contenedorCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((producto, index) => {
        total += producto.precio;
        const div = document.createElement("div");
        div.classList.add("item-carrito");
        div.innerHTML = `
            <p>${producto.nombre} - $${producto.precio}</p>
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        contenedorCarrito.appendChild(div);
    });

    document.getElementById("total").textContent = `Total: $${total}`;
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }
    alert("Compra realizada con éxito");
    carrito = [];
    actualizarCarrito();
}
