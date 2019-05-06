import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from "@angular/material";
import { MatButtonModule } from "@angular/material";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbModule,
    MatCardModule,
    MatButtonModule
  ],
  exports: [
    CommonModule,
    NgbModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
