var peticion = new XMLHttpRequest();
var retorno;

// Inicio, coprobamos si esta registrado
// Si lo esta se carga pagina acceso, si no pagina registro

function inicial(){
	if (window.localStorage.getItem("usuario")){
		traerArchivo("pages/acceso.html");
	}
	else{
		traerArchivo("pages/registro.html");
	}

}

// Funciones de AJAX

function leerArchivo(archivo, funcionRetorno){
	peticion.open("POST", archivo, true);
	peticion.onreadystatechange = procesarPeticion;
	peticion.send(null);
	retorno = funcionRetorno;
	
}

function procesarPeticion(){
	if(peticion.readyState == 4){
		if(peticion.status == 200){
			retorno(peticion.responseText)
		}
	}
}

function traerArchivo(archivo){
	leerArchivo(archivo, recibirArchivo);
}

function recibirArchivo(texto){
	document.querySelector("#contenido").innerHTML = texto;
	if (document.querySelector("#registrar")){
		document.querySelector("#registrar").addEventListener("click", registro, false);
    }
    if (document.querySelector("#acceder")){
    	document.querySelector("#acceder").addEventListener("click", acceso, false);
    }
}

//Fin AJAX

// Funcion registro inicial.
function registro(){
		var usuario = document.querySelector("#user");
		var errorUser = document.querySelector("#errorUser");
		var password = document.querySelector("#password");
		var errorPassword = document.querySelector("#errorPassword");
		var email = document.querySelector("#email");
		var errorEmail = document.querySelector("#errorEmail");
			if ((validacion(usuario, errorUser)) &&
			(validacion(password, errorPassword)) &&
			(validacion(email, errorEmail))){
				window.localStorage.setItem("usuario", usuario.value);
				window.localStorage.setItem("contraseña", password.value);
				window.localStorage.setItem("email", email.value);
				traerArchivo("pages/principal.html");
			}		
}

// Validar campos.

function validacion(campo, division){
	division.innerHTML = "";
	if (campo.value == null || campo.value.length == 0){
			campo.focus();
			division.innerHTML = "Campo requerido";
			return false;
	}

	else{

		return true;
	}

}


function borrar(){
	window.localStorage.clear();
}

function acceso(){
	traerArchivo("pages/principal.html");
}

