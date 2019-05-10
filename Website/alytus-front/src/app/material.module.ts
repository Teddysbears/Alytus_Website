import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from "@angular/material";
import { MatButtonModule } from "@angular/material";
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule
  ],
  exports: [
    CommonModule,
    NgbModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule
  ]
})
export class MaterialModule { }
