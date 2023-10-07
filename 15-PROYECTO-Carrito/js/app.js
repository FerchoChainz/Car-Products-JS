//variables 
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];
//declaramos el carrito como let ya que ira cambiando, e inicializado vacio

cargarEventListeners();
function cargarEventListeners(){
    //cuando agregas un curso presionando agregar
    listaCursos.addEventListener('click', agregarCurso);

    //eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //vaciar carrito 
    vaciarCarrito.addEventListener('click', () =>{
        articulosCarrito = [];
        limpiarHTML();
    })
}


//funciones
function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const curosSeleccionado = e.target.parentElement.parentElement;
        datosCurso(curosSeleccionado);
    }
}

//le el contenido del html al que le dimos click y extrae la info

//eliminar un curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');  

        //elimina del arreglo por el data id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        
        carritoHTML(); //iteramos sobre el carrito y mostramos el html
        }
    }


function datosCurso(curso){
    // console.log(curso);

    //crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

    if(existe){
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso =>{
            //.map requiere retornar un nuevo arreglo
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            }else{
                return curso;
                //retorna los objetos que no son duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else{

        //agregamos elementos al carrito
        articulosCarrito = [...articulosCarrito,infoCurso];
        /*usamos el spreadOperator para tomar una copia de de arreglo original y no perder la referencia de los articulos anteriores*/
    }

    
    console.log(articulosCarrito);
    carritoHTML();
}


//Muestra el carrito de compras en el html
function carritoHTML(){

    //limpiar el html
    limpiarHTML();

    //recorre el carrito y genera el html 
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>

        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>

        <td>
            <a href="#" class="borrar-curso" data-id="${id}" > X </a>
        </td>
        `;
        //agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}

//Elimina los cursos del html
function limpiarHTML(){
    //forma lenta
    // contenedorCarrito.innerHTML = '';

    //forma optima
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}