//Contenedor principal 
const contenedor = document.querySelector(".centerscreen")

//habilidads
const habilidades = [
    "JavaScript: Uso de Fetch y manejo de APIs",
    "CSS: Uso de hover, loaders y animaciones (@keyframes)",
    "HTML: Mejora en estructura y diseño de interfaces",
    "GitHub: Uso de fork y control de versiones",
    "DOM: Manipulación de datos desde API hacia la interfaz"
]
//Etiquetas
const mostrarEtiquetas = (lista) => {

    const contenedorEtiquetas = document.createElement("div")
    contenedorEtiquetas.classList.add("contenedor-etiquetas")

    lista.forEach(habilidad => {
        const span = document.createElement("span")
        span.textContent = habilidad
        span.classList.add("etiqueta")
        contenedorEtiquetas.appendChild(span)
    })

    contenedor.appendChild(contenedorEtiquetas)
}
//Texto etqiquetas
const texto2 = document.createElement("h2")
texto2.textContent = "Primero ver etiquetas"
contenedor.appendChild(texto2)

//Bton etiqeutas
const boton2 = document.createElement("div")
boton2.textContent = "Etiquetas"
boton2.classList.add("boton")
contenedor.appendChild(boton2)

//boton en una linea
boton2.addEventListener("click", () => mostrarEtiquetas(habilidades))

//Texto de cargar usaurios 
const texto = document.createElement("h3")
texto.textContent = "Dale click al botón para poder ver los usuarios"
contenedor.appendChild(texto)

//Boton mostrar usuarios 
const boton = document.createElement("div")
boton.textContent = "Cargar Usuarios"
boton.classList.add("boton")
contenedor.appendChild(boton)

//Loader/ cargador 
const loader = document.createElement("div")
loader.classList.add("cargar")
loader.innerHTML = `<div class="spinner"></div><p>Cargando usuarios...</p>`
loader.style.display = "none"
contenedor.appendChild(loader)

//estado
const mensaje = document.createElement("p")
contenedor.appendChild(mensaje)

//Fetch de api
const cargarUsuario = async () => {
    try {
        mensaje.textContent = "Cargando..."
        loader.style.display = "flex"

        const response = await fetch("https://api.github.com/users")
        const data = await response.json()

        for (const user of data) {
            const responseCompleto = await fetch(user.url)
            const usuarioCompleto  = await responseCompleto.json()
            const datosPerfil = construirPerfil(usuarioCompleto)
            renderizarPerfil(datosPerfil)
        }

        mensaje.textContent = ""
        loader.style.display = "none"

    } catch (error) {
        mensaje.textContent = "Error al cargar usuario"
        loader.style.display = "none"
        console.error(error)
    }
}

// Mostrar los datos que queiro, y mostrar N/a si n o hay datos
const construirPerfil = (datos) => {
    return {
        nombre:datos.name || "N/A",
        usuario:datos.login,
        email:datos.email || "N/A",
        ciudad:datos.location || "N/A",
        avatar:datos.avatar_url
    }
}

//Perfil
const perfil = document.createElement("div")
perfil.style.display = "none"

const avatar = document.createElement("img")
avatar.width = 100
avatar.alt = "avatar"

const nombre = document.createElement("p")
const usuario = document.createElement("p")
const email = document.createElement("p")
const ciudad = document.createElement("p")

perfil.appendChild(avatar)
perfil.appendChild(nombre)
perfil.appendChild(usuario)
perfil.appendChild(email)
perfil.appendChild(ciudad)
contenedor.appendChild(perfil)

//Ordenar datos en tarjetas
const crearCarta = (perfil) => {

    const card = document.createElement("div")
    card.classList.add("card")

    const img = document.createElement("img")
    img.src = perfil.avatar
    img.alt = "avatar"
    img.classList.add("avatar")

    const nombre = document.createElement("p")
    nombre.textContent = `Nombre: ${perfil.nombre}`

    const usuario = document.createElement("p")
    usuario.textContent = `Usuario: ${perfil.usuario}`

    const email = document.createElement("p")
    email.textContent = `Email: ${perfil.email}`

    const ciudad = document.createElement("p")
    ciudad.textContent = `Ciudad: ${perfil.ciudad}`

    card.appendChild(img)
    card.appendChild(nombre)
    card.appendChild(usuario)
    card.appendChild(email)
    card.appendChild(ciudad)

    return card
}

//Mostrar perfil
const renderizarPerfil = (perfil) => {
    const card = crearCarta(perfil)
    contenedor.appendChild(card) //mi tarjetaw
}


//boton en una linea
boton.addEventListener("click", cargarUsuario)