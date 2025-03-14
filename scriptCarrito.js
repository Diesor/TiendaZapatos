let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let listaCarrito = document.getElementById("lista-carrito");
let subtotal = 0;

carrito.forEach((producto, index) => {
    let item = document.createElement("div");
    item.classList.add("carrito-item");

    item.innerHTML = `
        <img src="${producto.img}">
        <div class="info">
            <span class="nombre">${producto.nombre}</span>
        </div>
        <div class="carrito-cantidad-container">
            <input type="number" class="carrito-cantidad" value="1" min="1" data-index="${index}">
        </div>
        <span class="carrito-precio">$${producto.precio.toFixed(2)}</span>
    `;

    listaCarrito.appendChild(item);
    subtotal += producto.precio;
});

document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;

document.querySelectorAll(".cantidad-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        let index = e.target.dataset.index;
        let input = document.querySelector(`.carrito-cantidad[data-index="${index}"]`);
        let cantidad = parseInt(input.value);

        if (e.target.classList.contains("aumentar")) {
            cantidad++;
        } else if (e.target.classList.contains("disminuir") && cantidad > 1) {
            cantidad--;
        }

        input.value = cantidad;
        actualizarSubtotal();
    });
});

document.querySelectorAll(".carrito-cantidad").forEach(input => {
    input.addEventListener("input", actualizarSubtotal);
});

function actualizarSubtotal() {
    let nuevoSubtotal = 0;
    document.querySelectorAll(".carrito-cantidad").forEach((input, i) => {
        let cantidad = parseInt(input.value);
        nuevoSubtotal += cantidad * carrito[i].precio;
    });

    document.getElementById("subtotal").textContent = `$${nuevoSubtotal.toFixed(2)}`;
}

document.getElementById("confirmar-compra").addEventListener("click", () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    carrito.forEach((productoCarrito) => {
        let productoStock = productos.find(p => p.id === productoCarrito.id);
        if (productoStock) {
            productoStock.stock -= productoCarrito.cantidad; // Reducir stock
        }
    });

    // Guardar productos con stock actualizado
    localStorage.setItem("productos", JSON.stringify(productos));

    // Vaciar el carrito
    localStorage.removeItem("carrito");

    // Redirigir al index con mensaje de confirmación
    window.location.href = "index.html?compra=exitosa";
});

// MOSTRAR MENSAJE SI LA COMPRA SE CONFIRMÓ
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("compra") === "exitosa") {
        alert("¡Compra realizada con éxito!");
    }
});