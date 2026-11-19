// NECESARIOS
/*
  1. POO
  2. Metodo para crear el elemento
  3. Metodo para agregar al carrito
  4. Metodo para eliminar de la pantalla
  5. Funcion para recorrer el array y renderizar los elementos 
*/

// Clase
class Producto {
  //Contador estatico que solo lo puede modificar la clase misma
  static #ultimoID = 0;

  constructor(nombre, categoria, caracteristicas, precio) {
    this.nombre = nombre;
    this.categoria = categoria;
    this.caracteristicas = caracteristicas;
    this.precio = precio;

    // Incrementamos el contador en 1 cada vez que se crea un producto
    Producto.#ultimoID++;

    // Asignamos el ID único a la propiedad de la instancia
    this.id = Producto.#ultimoID;
  }
}

// ----------------- Productos en existencia
/*
  const producto1 = new Producto(
    "Laptop Pro X14",
    "Computación",
    '16GB RAM, 512GB SSD, Pantalla Retina 14"',
    520,
  );
  const producto2 = new Producto(
    "Smartphone Ultra 5G",
    "Móviles",
    "128GB, Cámara Dual 108MP, Batería 5000mAh",
    799.99,
  );
  const producto3 = new Producto(
    "Audífonos NoiseCancel",
    "Audios",
    "Cancelación activa de ruido, 40h autonomía",
    250.5,
  );
*/

// Definicion de variables DOM
const CantElementsCarritoHeaderSPAN = document.getElementById(
  "CantElementsCarritoHeader",
);
const productosContainerDIV = document.getElementById("productosContainer");
const CantElementsCarritoAsideSPAN = document.getElementById(
  "CantElementsCarritoAside",
);
const elementosEnCarritoDIV = document.getElementById("ElementosEnCarrito");
const totalSPAN = document.getElementById("total");

// -----------------  Variables
let EstilosProductoDIV =
  "bg-gray-900 border border-gray-800 rounded-xl overflow-hidden flex flex-col hover:border-cyan-500/50 transition-all shadow-lg";

// -----------------  Arreglos
const productosEnExistencia = [
  new Producto(
    "Laptop Pro X14",
    "Computación",
    '16GB RAM, 512GB SSD, Pantalla Retina 14"',
    520,
  ),
  new Producto(
    "Smartphone Ultra 5G",
    "Móviles",
    "128GB, Cámara Dual 108MP, Batería 5000mAh",
    799.99,
  ),
  new Producto(
    "Audífonos NoiseCancel",
    "Audios",
    "Cancelación activa de ruido, 40h autonomía",
    250.5,
  ),
  new Producto(
    "Smartwatch Horizon",
    "Wearables",
    "Monitoreo cardíaco, GPS integrado, sumergible",
    200,
  ),
];

let productosEnCarrito = [];

// -----------------  Funciones
const contarProductosCarrito = () => {
  let cantidad = productosEnCarrito.length;

  if (cantidad > 0) {
    CantElementsCarritoHeaderSPAN.classList.remove("hidden");
    CantElementsCarritoAsideSPAN.textContent = cantidad;
    CantElementsCarritoHeaderSPAN.textContent = cantidad;
  } else {
    CantElementsCarritoHeaderSPAN.classList.add("hidden");
    CantElementsCarritoAsideSPAN.textContent = "";
  }
};

const agregarAlCarrito = (id) => {
  let esteProducto = productosEnExistencia.find((p) => p.id === id);
  productosEnCarrito.push(esteProducto);

  renderizarProductos("productosEnCarrito");
  contarProductosCarrito();
  calcularTotal();
};

const eliminarDelCarrito = (id) => {
  productosEnCarrito = productosEnCarrito.filter((p) => p.id !== id);
  renderizarProductos("productosEnCarrito");
  contarProductosCarrito();
  calcularTotal();
};

const calcularTotal = () => {
  let total = productosEnCarrito.reduce((total, p) => total + p.precio, 0);

  if (total > 0) {
    totalSPAN.textContent = total;
  } else {
    totalSPAN.textContent = "";
  }
};

const renderizarProductos = (arrayRecorrer) => {
  if (arrayRecorrer === "productosEnExistencia") {
    productosEnExistencia.forEach((p) => {
      // Creo el DIV
      const divProducto = document.createElement("div");

      // Asigno los estilos
      divProducto.className = EstilosProductoDIV;

      // Estructura del producto
      divProducto.innerHTML = `
      <div class="p-4 flex flex-col flex-1 justify-between">
        <div>
          <span
            class="text-xs text-cyan-400 font-semibold uppercase tracking-wider"
            >${p.categoria}</span
          >
          <h3 class="font-bold text-lg text-white mt-1">
            ${p.nombre}
          </h3>
          <p class="text-gray-400 text-sm mt-1">
            ${p.caracteristicas}
          </p>
        </div>

        <div class="mt-4 flex items-center justify-between">
          <span class="text-xl font-extrabold text-white">$${p.precio}</span>
          <button
            onclick="agregarAlCarrito(${p.id})"
            class="bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-semibold px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer"
          >
            Agregar
          </button>
        </div>
    `;

      productosContainerDIV.appendChild(divProducto);
    });
  } else if (arrayRecorrer === "productosEnCarrito") {
    elementosEnCarritoDIV.innerHTML = "";
    productosEnCarrito.forEach((p) => {
      // Creo el elemento HTML
      const divProducto = document.createElement("div");
      divProducto.innerHTML = `
        <div
          class="flex items-center justify-between bg-gray-950/50 p-3 rounded-xl border border-gray-800/80"
        >
          <div class="flex-1">
            <h4 class="text-sm font-semibold text-white">${p.nombre}</h4>
            <p class="text-xs text-gray-400">Cant: 1</p>
          </div>
          <div class="flex flex-col items-end">
            <span class="text-sm font-bold text-cyan-400">$${p.precio}</span>
            <button
              onClick="eliminarDelCarrito(${p.id})"
              class="block text-xs text-red-400 hover:text-red-300 mt-1 cursor-pointer"
            >
              Eliminar
            </button>
          </div>
        </div>
      `;

      // Lo inserto en el div
      elementosEnCarritoDIV.appendChild(divProducto);
    });
  }
};

// -----------------  Ejecucion
renderizarProductos("productosEnExistencia");
