import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MaterialModule } from '../material.module';
@NgModule({
  imports: [
    CommonModule,
    NgFor,
    MatTabsModule,
    MaterialModule],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatTabsModule,
    MaterialModule]
})
export class SharedModule { }
