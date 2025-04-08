import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select'; // ✅ Import MatSelectModule
import { MatTableModule } from '@angular/material/table';

@NgModule({
  exports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule
  ]
})
export class MaterialModule { }
