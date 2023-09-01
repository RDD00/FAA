const Producto = function(sabor, pote, precio, stock){
    this.sabor = sabor,
    this.pote = pote,
    this.precio = precio,
    this.stock = stock
}

fetch("productos.json")
    .then( (response) => response.json())
    .then( (data) => {
        const productos = data.productos;
        
        if (localStorage.getItem("productos")) {
            return;
        } else {
            productos.forEach((x) => lista.push(x))
        }
        
    })

    .catch((error) => {
        Swal.fire({
        icon: "warning",
        title: "Error",
        text: "Explotó todo"
      });
        return;
    })


let lista = []






if (localStorage.getItem("productos")) {
    lista = JSON.parse(localStorage.getItem("productos"));
  } else {
    lista = lista
  }



const cerrarCont = document.createElement('div')
cerrarCont.classList.add("boton-cerrar")
cerrarCont.innerHTML = `
<button id="btnCerrar"><img src="https://svgsilh.com/svg_v2/1152114.svg" alt="boton-cerrar" id="img-cerrar"></button>
`
/*el button lo ingreso en las funciones filtrarProductos y mostrarProductos para que sólo sea visible y utilizable en esos momentos*/


function filtrarProductos() {
    const body = document.querySelector('body');
  
    const input = document.getElementById('filtradoP').value

    const palabraClave = input.trim().toLowerCase();
  
    const resultado = lista.filter((producto) => producto.sabor.toLowerCase().includes(palabraClave));
  
    if (resultado.length > 0) {
        const cardCont = document.getElementById("cardCont");
        
        resultado.forEach( (producto)=> {
            const listItem = document.createElement('div')
            listItem.classList.add('card');

            const sabor = document.createElement('h2');
            sabor.textContent = producto.sabor;
            listItem.appendChild(sabor);

            const pote = document.createElement('p');
            pote.textContent = `Pote: ${producto.pote}`;
            listItem.appendChild(pote);

            const precio = document.createElement('p');
            precio.textContent = `Precio: ${producto.precio}`;
            listItem.appendChild(precio);

            const stock = document.createElement('p');
            stock.textContent = `Stock: ${producto.stock}`;
            listItem.appendChild(stock);

            cardCont.appendChild(listItem);
            
        })

        body.appendChild(cerrarCont);
        body.appendChild(cardCont);

        const btnCerrar = document.getElementById("btnCerrar")
        btnCerrar.addEventListener("click", (event) => {
            document.location.reload()
        })
    }else{
        Swal.fire({
            icon: "warning",
            title: "Aviso",
            text: "No se encontraron coincidencias"
          });
        return;
    }
}

const boton1 = document.getElementById("btnFilter")
boton1.addEventListener("click", () => {
    filtrarProductos()
})



const inputSabor = document.getElementById("inputSabor")
const inputPote = document.getElementById("inputPote")
const inputPrecio = document.getElementById("inputPrecio")
const inputStock = document.getElementById("inputStock")

let card = []



function añadirProducto(){
    const item = {
        sabor: inputSabor.value,
        pote: parseInt(inputPote.value),
        precio: parseFloat(inputPrecio.value),
        stock: parseInt(inputStock.value)
    }

    const pesoValido = [0.25, 0.5, 1]

    if(isNaN(item.pote) || isNaN(item.precio) || (isNaN(item.stock) || item.stock <= 0) || (item.sabor === "" || !isNaN(item.sabor))){
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Por favor ingresa valores válidos."
          });
        return;
    }

    if(pesoValido.includes(item.pote)){
    }else{
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Por favor ingrese el peso válido (0.25, 0.5, 1)."
            });
        return;
    }

    let producto = new Producto(item.sabor, item.pote, item.precio, item.stock)

    if(lista.some((x)=>x.sabor === producto.sabor)){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Este producto ya existe',
            showConfirmButton: true
            })
        return;
    }

    lista.push(producto)

    localStorage.setItem("productos", JSON.stringify(lista));

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto añadido',
        text: `Se ha agregado el producto "${producto.sabor}" a la lista.`,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
    })

    function mostrarProducto(){

        const item = {
            sabor: inputSabor.value,
            pote: parseInt(inputPote.value),
            precio: parseFloat(inputPrecio.value),
            stock: parseInt(inputStock.value)
        }
    
        if(isNaN(item.pote) || isNaN(item.precio) || (isNaN(item.stock) || item.stock <= 0) || (item.sabor === "" || !isNaN(item.sabor))){
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Por favor completa el formulario correctamente."
              });
            return;
        }
    
    
        const cardCont = document.getElementById("cardCont");
        cardCont.classList.add('card-style');
    
        lista.forEach((producto)=>{
    
            const listItem = document.createElement('div')
            listItem.classList.add(`card`)
    
            const sabor = document.createElement('h2');
            sabor.textContent = producto.sabor;
            listItem.appendChild(sabor);
    
            const pote = document.createElement('p');
            pote.textContent = `Pote: ${producto.pote}`;
            listItem.appendChild(pote);
    
            const precio = document.createElement('p');
            precio.textContent = `Precio: ${producto.precio}`;
            listItem.appendChild(precio);
    
            const stock = document.createElement('p');
            stock.textContent = `Stock: ${producto.stock}`;
            listItem.appendChild(stock);
    
    
            cardCont.appendChild(listItem);
        })
    
        const body = document.querySelector('body');
        
        body.appendChild(cerrarCont);
        body.appendChild(cardCont);

        
        
        const btnCerrar = document.getElementById("btnCerrar")
        btnCerrar.addEventListener("click", (event) => {
            document.location.reload()
        })

        
    }
    const boton3 = document.getElementById("showProduct")
    boton3.classList.remove("close")
    boton3.addEventListener('click', () => {
        mostrarProducto()
    })

    
}



const boton2 = document.getElementById("addProduct")
boton2.addEventListener("click", ()=> {
    añadirProducto()
})







