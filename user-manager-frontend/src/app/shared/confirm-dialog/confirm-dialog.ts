import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <h2>{{ data?.title || 'Confirmar' }}</h2>
    <p>{{ data?.message || 'Deseja continuar?' }}</p>
    <div class="actions">
      <button mat-button (click)="close(false)">{{ data?.cancelLabel || 'Cancelar' }}</button>
      <button mat-flat-button [color]="data?.confirmColor || 'warn'" (click)="close(true)">{{ data?.confirmLabel || 'Confirmar' }}</button>
    </div>
  `
})
export class ConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  close(val: boolean) { this.dialogRef.close(val); }
}
