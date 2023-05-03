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
let ordenes = [];

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

sucursales = [
  { Localidad: "ESPERANZA", Direccion: "Aufranc 2043", Horario: "9 a 19" },
  {
    Localidad: "SANTA FE",
    Direccion: "Bv. Pellegrini 2495",
    Horario: "10 a 21",
  },
  { Localidad: "CABA", Direccion: "Viamonte 2358", Horario: "9 a 21" },
  { Localidad: "MENDOZA", Direccion: "25 de Mayo 3561", Horario: "10 a 18" },
  { Localidad: "EL CHALTEN", Direccion: "Monte Fitz Roy", Horario: "8 a 20" },
  { Localidad: "USHUAIA", Direccion: "San martin 2165", Horario: "9 a 17" },
  { Localidad: "ROSARIO", Direccion: "Bv orono 1354", Horario: "9 a 19" },
  {
    Localidad: "VILLA GENERAL BELGRANO",
    Direccion: "San Martin 458",
    Horario: "9 a 19",
  },
  { Localidad: "BARILOCHE", Direccion: "1 de mayo 257", Horario: "9 a 17" },
];

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

const verCarrito = ({ estilo, precio, cantidad }) => {
  let indexorder = document.querySelector("#carritoindex");
  indexorder.innerHTML = `<h2> Checkout </h2>`;
  let endorder = document.querySelector("#totalcarrito");
  endorder.innerHTML =
    `<h2> El total de tu compra es ` +
    total +
    ` y te llevas ` +
    cantidadtotal +
    ` latas </h2>`;
  let carritodiv = document.getElementById(`carrito${estilo}`);
  carritodiv.className = "carrito checkout";
  carritodiv.innerHTML = `
        <img src="../imgs/${estilo}.webp.png" class="carritoimg" />
        <h3>${estilo}</h3>
        <h4>$${precio}/lata</h4>
        <button class="color--state-bad mini" id="eliminar1${estilo}"
        ><strong>-</strong></button>
        <h4>${cantidad} unidades</h4>
        <button class="color--state-ok mini" id="agregar1${estilo}"
        ><strong>+</strong></button>
        <h4>Subt. $${cantidad * precio} </h4>
      </div>`;
};

let eliminador1 = (CARRO) => {
  let eliminar = document.querySelector("#eliminar1" + CARRO.estilo);
  eliminar.addEventListener("click", (e) => {
    e.preventDefault();
    if (1 <= CARRO.cantidad) {
      CARRO.eliminaritem(1);
      calculartotales();
      verCarrito(CARRO);
      eliminador1(CARRO);
      agregardor1(CARRO);
      localStorage.setItem("birras", JSON.stringify(carrito));
    } else {
      alert("No hay nada para para eliminar.");
    }
  });
};

let agregardor1 = (CARRO) => {
  let agregar1 = document.querySelector("#agregar1" + CARRO.estilo);
  agregar1.addEventListener("click", (e) => {
    e.preventDefault();
    if (1 <= CARRO.stock) {
      CARRO.agregaritem(1);
      calculartotales();
      verCarrito(CARRO);
      eliminador1(CARRO);
      agregardor1(CARRO);
      localStorage.setItem("birras", JSON.stringify(carrito));
    } else {
      alert("No hay stock suficiente. Stock disponible" + " " + CARRO.stock);
    }
  });
};

const retirar = ({ Localidad, Direccion, Horario }) => {
  let entrega = document.querySelector("#sucursales");
  const newselect = document.createElement("option");
  newselect.innerHTML = `Localidad: ${Localidad}. Dirección: ${Direccion}. Horarios: ${Horario}`;
  entrega.append(newselect);
};
let pedido = JSON.parse(localStorage.getItem("pedido")) ?? [];

const crearordenenvio = () => {
  let region = document.querySelector("#envios");
  region.addEventListener("submit", (e) => {
    e.preventDefault();
    let prepedido = [];
    for (x = 0; x < 5; x++) {
      prepedido.push(e.target.children[x].value);
    }
    carrito.forEach((cerveza) => {
      prepedido.push(String(cerveza.cantidad + " " + cerveza.estilo));
    }),
      prepedido.push("total $ " + total, "total de latas " + cantidadtotal);
    pedido = prepedido.join();
    localStorage.setItem("pedido", JSON.stringify(pedido));
    window.location.href = "../pages/pay.html";
  });
};

const crearordenretiro = () => {
  let region = document.querySelector("#retiro");
  region.addEventListener("submit", (e) => {
    e.preventDefault();
    let prepedido = [];
    prepedido.push(e.target.children[1].value);
    prepedido.push(e.target.children[2].value);
    prepedido.push("total $ " + total, "total de latas " + cantidadtotal);
    pedido = prepedido.join();
    localStorage.setItem("pedido", JSON.stringify(pedido));
    window.location.href = "../pages/pay.html";
  });
};

/*                                           RUNNER                                        */

sucursales.forEach((sucursal) => {
  retirar(sucursal);
});
calculartotales();
carrito.forEach((item) => {
  verCarrito(item);
  eliminador1(item);
  agregardor1(item);
});
crearordenenvio();
crearordenretiro();
