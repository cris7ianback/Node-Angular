import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidationService } from 'src/app/services/custom-validation.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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


  constructor(private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private usuarioService: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<CambioPasswordComponent>,
    private toast: NgToastService,
    private ngxService: NgxUiLoaderService) {

    this.formModUsuario = this.fb.group({
      user: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      newPassword: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(3)]],
      id_role: ['', [Validators.required, Validators.minLength(3)]]
    }, {
      validators: [this.customValidator.camposIguales('newPassword', 'confirmPassword')]

    });

    if (this.editData) {
      this.formModUsuario.controls['user'].setValue(this.editData.user);
      this.formModUsuario.controls['email'].setValue(this.editData.email);
      // this.formModUsuario.controls['password'].setValue(this.editData.password);
      this.formModUsuario.controls['id_role'].setValue(this.editData.id_role);
    }

  }


  actualizarUsuario() {
    this.usuarioService.modificarUsuario(this.formModUsuario.value, this.editData.id_user)
      .subscribe({
        next: (res) => {

          this.toast.success({
            detail: "Usuario Modificado",
            summary: "Usuario Modificado con Exito",
            duration: 3000,
            position: 'br'
          })

          this.formModUsuario.reset();
          this.dialogRef.close('Modificar Usuario')
        },
        error: () => {
          this.toast.error({
            detail: "Error de Solicitud",
            summary: "Error Al modificar Usuario",
            duration: 3000,
            position: 'br'
          })
        }
      })
  }

  ngOnInit(): void {

    this.cambioPasswordForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    })
  }

  validateSubmit() {
    if (this.cambioPasswordForm.controls['newPassword'].value != this.cambioPasswordForm.controls['confirmPassword ']) {
      return true;
    }
    else {
      return false;
    }
  }

  handleChangePasswordSubmit() {
    this.ngxService.start();
    var formData = this.cambioPasswordForm.value;
    var data = {
      password: formData.password,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword
    }

    this.usuarioService.actualizarPassword(data).subscribe((response: any) => {
      this.ngxService.stop();
      this.responseMessage = response?.message;
      this.dialogRef.close();
      this.snakbarService.openSnacBack(this.responseMessage, "success");
    }, (error)=>{
      console.log(error);
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackBarService.openSnacBack(this.responseMessage, GlobalConstants.error);
    })
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
