let productos = JSON.parse(localStorage.getItem("productos"));

if (!productos || productos.length === 0) {
    console.log("No se encontraron productos en localStorage. Inicializando...");
    productos = [
        {id: 1, nombre: "Nike Court Vision Low", precio: 999.00, stock: 10, img: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/f831d26d-41ed-41d1-b1ea-5216c871e70c/NIKE+COURT+VISION+LO+NN.png"},
        {id: 2, nombre: "Nike Air Force 1 '07", precio: 2199.00, stock: 13, img: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png"},
        {id: 3, nombre: "Nike Dunk Low Retro", precio: 2499.00, stock: 12, img: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/b1bcbca4-e853-4df7-b329-5be3c61ee057/NIKE+DUNK+LOW+RETRO.png"},
        {id: 4, nombre: "Nike Blazer Mid '77", precio: 1999.00, stock: 24, img: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/fb7eda3c-5ac8-4d05-a18f-1c2c5e82e36e/BLAZER+MID+%2777+VNTG.png"},
        {id: 5, nombre: "Nike Air Max 90", precio: 2899.00, stock: 36, img: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/a9a51bcf-df27-4f08-8b65-6be2005199cc/AIR+MAX+90+LV8.png"},
        {id: 6, nombre: "Nike Air Max Plus", precio: 3699.00, stock: 23, img: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/lx0owmisj943sr59emb8/AIR+MAX+PLUS.png"},
        {id: 7, nombre: "Nike Zoom Freak 4", precio: 2899.00, stock: 15, img: "https://cdn-images.farfetch-contents.com/19/88/72/90/19887290_50868478_1000.jpg"},
        {id: 8, nombre: "Nike Pegasus 40", precio: 2699.00, stock: 27, img: "https://cdn-images.farfetch-contents.com/23/52/71/03/23527103_53486255_600.jpg"},
        {id: 9, nombre: "Nike Vaporfly 3", precio: 4999.00, stock: 32, img: "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/e1b30b1a-471d-43c6-bdc7-b1ec18c55df0/W+NIKE+ZOOMX+VAPORFLY+NEXT%25+3.png"}
    ];
    localStorage.setItem("productos", JSON.stringify(productos));
}

const contenedorProducto = document.getElementById("contenedor-producto");
contenedorProducto.innerHTML = ""; 

productos.forEach(producto => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
        <img src="${producto.img}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio}.00</p>
        <p class="cantidad">Cantidad:</p>
        <p>${producto.stock} disponibles</p>
        <button>Agregar al Carrito</button>
    `;
    contenedorProducto.appendChild(productCard);
});

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let contadorCarrito = document.getElementById("contador-carrito");

document.querySelectorAll(".product-card button").forEach((boton, index) => {
    boton.addEventListener("click", () => {
        let producto = productos[index];
        if (producto.stock > 0) {
            carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, img: producto.img, cantidad: 1 });

            contadorCarrito.textContent = carrito.length;
            localStorage.setItem("carrito", JSON.stringify(carrito));

            alert("Producto agregado al carrito.");
        } else {
            alert("No hay stock disponible.");
        }
    });
});

document.querySelector(".carro img").addEventListener("click", () => {
    window.location.href = "carrito.html";
});

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("compra") === "exitosa") {
        alert("¡Compra realizada con éxito!");
    }
});
