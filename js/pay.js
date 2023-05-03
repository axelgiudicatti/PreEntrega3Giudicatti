/*                                          VARIABLES Y FUNCIONES NECESARIAS. OBJETOS, CONSTRUCTORES, CLASES, METODOS. ARRAYS DE OBJETOS */
const precioipa = 300;
const precioirishostout = 275;
const preciogolden = 250;
let stockipa = 250;
let stockirish = 250;
let stockstout = 250;
let stockgolden = 250;
let total = 0;
let cantidadtotal = 0;

let carritoJS = JSON.parse(localStorage.getItem("birras")) ?? [
  { cantidad: 0 },
  { cantidad: 0 },
  { cantidad: 0 },
  { cantidad: 0 },
];

class Cerveza {
  constructor(estilo, precio, cantidad, stock) {
    this.estilo = estilo;
    this.precio = parseFloat(precio);
    this.cantidad = parseFloat(cantidad);
    this.subtotal = this.precio * this.cantidad;
    this.stock = stock;
  }
  agregaritem(cantidadaagregar) {
    this.cantidad = this.cantidad + cantidadaagregar;
    this.subtotal = this.precio * this.cantidad;
    this.stock = this.stock - cantidadaagregar;
  }
  eliminaritem(cantidadaeliminar) {
    this.cantidad = this.cantidad - cantidadaeliminar;
    this.subtotal = this.precio * this.cantidad;
    this.stock = this.stock + cantidadaeliminar;
  }
}

const IPACART = new Cerveza("IPA", precioipa, 0, stockipa);
const IRISHCART = new Cerveza("IRISH", precioirishostout, 0, stockirish);
const STOUTCART = new Cerveza("STOUT", precioirishostout, 0, stockstout);
const GOLDENCART = new Cerveza("GOLDEN", preciogolden, 0, stockgolden);

let carrito = [IPACART, IRISHCART, STOUTCART, GOLDENCART];

for (let ind = 0; ind < 4; ind++) {
  carrito[ind].agregaritem(carritoJS[ind].cantidad);
}

function calculartotales() {
  total =
    IPACART.subtotal +
    IRISHCART.subtotal +
    GOLDENCART.subtotal +
    STOUTCART.subtotal;
  cantidadtotal =
    IPACART.cantidad +
    IRISHCART.cantidad +
    STOUTCART.cantidad +
    GOLDENCART.cantidad;
}

let pedido = JSON.parse(localStorage.getItem("pedido")) ?? [];
let idpedido = JSON.parse(localStorage.getItem("numeropedido")) ?? 0;

let pedidosconfirmados = JSON.parse(localStorage.getItem("confirmados")) ?? [];

const pagocredito = () => {
  let tarjeta = document.querySelector("#envios");
  let predatos = [];
  tarjeta.addEventListener("submit", (e) => {
    e.preventDefault();
    idpedido++;
    predatos.push("Pedido numero " + idpedido);
    for (x = 0; x < 6; x++) {
      predatos.push(e.target.children[x].value);
    }
    datos = predatos.join();
    pedidoconf = pedido.concat(datos);
    pedidosconfirmados.push(pedidoconf);
    localStorage.setItem("confirmados", JSON.stringify(pedidosconfirmados));
    pedido = [];
    datos = [];
    carrito = [
      { cantidad: 0 },
      { cantidad: 0 },
      { cantidad: 0 },
      { cantidad: 0 },
    ];
    localStorage.setItem("numeropedido", JSON.stringify(idpedido));
    localStorage.setItem("birras", JSON.stringify(carrito));
    localStorage.setItem("pedido", JSON.stringify(pedido));
    window.location.href = "../puntayhacha.html";
  });
};

const pagomp = () => {
  let mpzone = document.querySelector("#mercadopago");
  mpzone.addEventListener("click", (e) => {
    e.preventDefault();
    idpedido++;
    pedidoconf = pedido;
    pedidosconfirmados.push(pedidoconf);
    localStorage.setItem("confirmados", JSON.stringify(pedidosconfirmados));
    pedido = [];
    datos = [];
    carrito = [
      { cantidad: 0 },
      { cantidad: 0 },
      { cantidad: 0 },
      { cantidad: 0 },
    ];
    localStorage.setItem("numeropedido", JSON.stringify(idpedido));
    localStorage.setItem("birras", JSON.stringify(carrito));
    localStorage.setItem("pedido", JSON.stringify(pedido));
    window.location.href = "https://www.mercadopago.com.ar/";
  });
};

const bancario = () => {
  let bank = document.querySelector("#pagar");
  bank.addEventListener("click", (e) => {
    e.preventDefault();
    idpedido++;
    pedidoconf = pedido;
    pedidosconfirmados.push(pedidoconf);
    localStorage.setItem("confirmados", JSON.stringify(pedidosconfirmados));
    pedido = [];
    datos = [];
    carrito = [
      { cantidad: 0 },
      { cantidad: 0 },
      { cantidad: 0 },
      { cantidad: 0 },
    ];
    localStorage.setItem("numeropedido", JSON.stringify(idpedido));
    localStorage.setItem("birras", JSON.stringify(carrito));
    localStorage.setItem("pedido", JSON.stringify(pedido));
    window.location.href = "../puntayhacha.html";
  });
};

const totalCarrito = ({ estilo, precio, cantidad }) => {
  let endorder = document.querySelector("#totalcarrito");
  endorder.innerHTML =
    `<h2> El total de tu compra es ` +
    total +
    ` y te llevas ` +
    cantidadtotal +
    ` latas </h2>`;
};

/*                                           RUNNER                                        */

calculartotales();
carrito.forEach((item) => {
  totalCarrito(item);
});
pagocredito();
pagomp();
bancario();
