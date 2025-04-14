import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MaterialModule } from './material.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgFor,
    MatTabsModule,
    MaterialModule,
    MatSnackBarModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatTabsModule,
    MaterialModule]
})
export class SharedModule { }
