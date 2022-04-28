import { Component,Inject ,OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-mat-confirm-dialog',
  templateUrl: './mat-confirm-dialog.component.html',
  styleUrls: ['./mat-confirm-dialog.component.css']
})
export class MatConfirmDialogComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data:any,
              public dialogRef: MatDialogRef<MatConfirmDialogComponent>,
              private toast: NgToastService,
              private router: Router ) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close(false)
    this.toast.warning({
      detail: "Atencion",
      summary: "Acción Cancelada",
      duration: 2000,
      position: 'br'
    });
  }

  cancelar() {
    this.toast.warning({
      detail: "Atención",
      summary: "Acción Cancelada Exitosa",
      duration: 3000,
      position: 'br'
    })
   
  }

}
