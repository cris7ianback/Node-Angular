import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidationService } from 'src/app/services/custom-validation.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog, } from '@angular/material/dialog';

@Component({
  selector: 'app-cambio-password',
  templateUrl: './cambio-password.component.html',
  styleUrls: ['./cambio-password.component.css']
})
export class CambioPasswordComponent implements OnInit {

  formModUsuario!: FormGroup;
  hide = true;
  router: any;

  password!: string;
  newPassword!: string;
  confirmPassword!: string;

  cambioPasswordForm: any = FormGroup;
  responseMessage: any;

  currentPersonal?: {};
  currentIndex = -1;

  constructor(private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private usuarioService: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<CambioPasswordComponent>,
    private toast: NgToastService,
    ) {

      

    this.formModUsuario = this.fb.group({
      //user: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3), Validators.email]],
      oldPassword: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(3)]],
      //id_role: ['', [Validators.required, Validators.minLength(3)]]
    }, {
      validators: [this.customValidator.camposIguales('password', 'confirmPassword')]

    });


  }

  refreshList(): void {
    window.location.reload();
    this.currentPersonal = {};
    this.currentIndex = -1;
  }

  modificarPass(){

    this.usuarioService.modificarPass(this.formModUsuario.value, this.cambioPasswordForm.email)
    .subscribe({
      next:(res) =>{
        console.log ("pass modificada");
        this.toast.success({
          detail: "Contraseña Modificada",
          summary: "Su Password fue Modificada con Exito",
          duration: 3000,
          position: 'br'
        })
        this.dialogRef.close('Modificar Password')
             
        
      },
      error: () =>{
        console.log( "error al modificar pass");
        this.toast.error({
          detail: "Error al Modificar",
          summary: "Favor verificar su Email o Password",
          duration: 3000,
          position: 'br'
        })
      }

      

    }
    )

  }

  

  ngOnInit(): void {

  }

  cancelar() {
    this.toast.warning({
      detail: "Atención",
      summary: "Acción Cancelada Exitosa",
      duration: 3000,
      position: 'br'
    })
    this.router.navigate(['/listarUsuarios']);
  }

  
}
