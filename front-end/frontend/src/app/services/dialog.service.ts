import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from '../components/mat-confirm-dialog/mat-confirm-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor( private dialog: MatDialog) { }

  openConfirmDialog(msg:any){
    return this.dialog.open(MatConfirmDialogComponent,{
      height: '300px',
      width: '500px',
       panelClass: 'confirm-dialog-container',
       disableClose: true,
      position: { top: "250px" },
       data :{
         message : msg
       }
     });
   }
  

}

