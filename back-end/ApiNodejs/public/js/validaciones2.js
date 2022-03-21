const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	user: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	password: /^.{4,12}$/, // 4 a 12 digitos.
	id_role: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	//apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	//nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	//usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	//telefono: /^\d{7,14}$/ // 7 a 14 numeros.
};

const campos = {
	user: false,
	email: false,
	password: false,
	id_role: false,
	
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "user":
			validarCampo(expresiones.user, e.target, 'user');
			console.log("user");
			break;
		case "email":
				validarCampo(expresiones.correo, e.target, 'email');
				console.log("email");
				break;
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
			console.log("password");
			break;
			case "id_role":
			validarCampo(expresiones.id_role, e.target, 'id_role');
			console.log("id_role");
			break;
	}
};

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
	user = document.getElementById("user").value;
	email = document.getElementById("email").value;
	password = document.getElementById("password").value;
	id_role = document.getElementById("id_role").value;
	val = 0;

	if (user == "") {
		val++;
	}
	if (email == "") {
		val++;
	}
	if (password == "") {
		val++;

	}if (id_role == "") {
		val++;
	}

	if (val == 0) {
		document.getElementById("registrar").disabled = false;
	} else {
		document.getElementById("registrar").disabled = true;
	}
}

document.getElementById("user").addEventListener("keyup", habilitar);
document.getElementById("password").addEventListener("keyup", habilitar);
document.getElementById("email").addEventListener("keyup", habilitar);
document.getElementById("id_role").addEventListener("keyup", habilitar);
document.getElementById("registrar").addEventListener("click", () => {

});