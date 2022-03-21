const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	//usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	//password: /^.{4,12}$/, // 4 a 12 digitos.
	//telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
	apellido: false,
	correo: false,
	nombre: false,
	//usuario: false,
	//password: false,
	//telefono: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
			break;
		case "apellido":
			validarCampo(expresiones.apellido, e.target, 'apellido');
			console.log("apellido")
			break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
			console.log("correo")
			break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if (expresion.test(input.value)) {
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

// const validarPassword2 = () => {
// 	const inputPassword1 = document.getElementById('password');
// 	const inputPassword2 = document.getElementById('password2');

// 	if(inputPassword1.value !== inputPassword2.value){
// 		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
// 		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
// 		document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
// 		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
// 		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
// 		campos['password'] = false;
// 	} else {
// 		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
// 		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
// 		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
// 		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
// 		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
// 		campos['password'] = true;
// 	}
// }

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

function habilitar() {
	nombre = document.getElementById("nombre").value;
	apellido = document.getElementById("apellido").value;
	correo = document.getElementById("correo").value;
	val = 0;

	if (nombre == "") {
		val++;
	}
	if (apellido == "") {
		val++;
	}
	if (correo == "") {
		val++;
	}

	if (val == 0) {
		document.getElementById("registrar").disabled = false;
	} else {
		document.getElementById("registrar").disabled = true;
	}
}

document.getElementById("nombre").addEventListener("keyup", habilitar);
document.getElementById("apellido").addEventListener("keyup", habilitar);
document.getElementById("correo").addEventListener("keyup", habilitar);
document.getElementById("registrar").addEventListener("click", ()=>{
	
});