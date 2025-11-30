// confirm-dialog/confirm-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule], 
  template: `
    <h2 mat-dialog-title>{{ data?.title || 'Confirmar' }}</h2>

    <mat-dialog-content>
      <p>{{ data?.message || 'Deseja continuar?' }}</p>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="close(false)">{{ data?.cancelLabel || 'Cancelar' }}</button>
      
      <button mat-flat-button [color]="data?.confirmColor || 'warn'" (click)="close(true)">{{ data?.confirmLabel || 'Confirmar' }}</button>
    </mat-dialog-actions>
  `
})
export class ConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  close(val: boolean) { this.dialogRef.close(val); }
}