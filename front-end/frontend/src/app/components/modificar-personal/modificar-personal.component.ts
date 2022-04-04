import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PersonalService } from 'src/app/services/personal.service';
import { Personal } from 'src/app/models/personal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-modificar-personal',
  templateUrl: './modificar-personal.component.html',
  styleUrls: ['./modificar-personal.component.css']
})
export class ModificarPersonalComponent implements OnInit {


  currentPersonal: Personal = {};
  currentIndex?: number;
  mensaje = '';
  personal: Personal = {
    id_persona: '',
    nombre: '',
    apellido: '',
    correo: ''
  };

  nombreApellidoPattern: string = '([a-zA-Z]+)  ([a-zA-Z]+)';

  //Validar Formulario
  formModPersonal: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3),]],
    apellido: ['', [Validators.required, Validators.minLength(3),]],
    correo: ['', [Validators.required, Validators.minLength(3), Validators.email]]
  })


  constructor(
    private personalService: PersonalService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private toast: NgToastService) { }

  ngOnInit(): void {
    this.mensaje = '';

    const id_entrada = <string>this.activeRoute.snapshot.params['id_persona'];
    console.log('id de persona: ' + id_entrada);

    if (id_entrada) {
      console.log(id_entrada);
      this.personalService.listarPersonalId(id_entrada)
        .subscribe(
          res => {
            this.personal = res;
            console.log(res);
          },
          err => console.log(err)
        );
    }
  }

  campoEsValido(campo: string) {
    return this.formModPersonal.controls[campo].errors
      && this.formModPersonal.controls[campo].touched;
  }

  listarPersonalId(id_entrada: any): void {
    this.personalService.listarPersonalId(id_entrada)
      .subscribe(
        data => {
          this.currentPersonal = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  modificarPersonal() {
    this.personalService.modificarPersonal(this.personal.id_persona, this.personal)
      .subscribe(
        res => {
          console.log(res);

          // Alerta de Modificación Exitosa
          this.toast.success({
            detail: "Personal Modificado",
            summary: "Solicitud Exitosa",
            duration: 3000,
            position: 'br'
          })
          this.router.navigate(['listarPersonal']);
        },
        err => {
          console.log(err);
          this.toast.warning({
            detail: "Error al Modificar",
            summary: "Su Solicitud Fallo",
            duration: 3000,
            position: 'br'
          })
        

        });

  }
  cancelar() {
    this.toast.success({
      detail: "Sin Efecto",
      summary: "Accion Cancelada Exitosa",
      duration: 3000,
      position: 'br'
    })
    this.router.navigate(['listarPersonal']);
  }
  }



