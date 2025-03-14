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
        <button class="eliminar-producto" data-index="${index}">X</button>
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
        } else if (e.target.classList.contains("disminuir")) {
            cantidad = Math.max(1, cantidad - 1); // Evita que sea menor a 1
        }

        input.value = cantidad;
        actualizarSubtotal();
    });
});

document.querySelectorAll(".carrito-cantidad").forEach(input => {
    input.addEventListener("input", (e) => {
        if (parseInt(e.target.value) < 1 || isNaN(e.target.value)) {
            e.target.value = 1;
        }
        actualizarSubtotal();
    });
});

document.querySelectorAll(".eliminar-producto").forEach(btn => {
    btn.addEventListener("click", (e) => {
        let index = e.target.dataset.index;
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        location.reload(); // Recargar la página para reflejar cambios
    });
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

    localStorage.setItem("productos", JSON.stringify(productos));

    localStorage.removeItem("carrito");

    window.location.href = "index.html?compra=exitosa";
});

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("compra") === "exitosa") {
        alert("¡Compra realizada con éxito!");
    }
});
