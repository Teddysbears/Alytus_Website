import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from "@angular/material";
import { MatButtonModule } from "@angular/material";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from "@angular/material";
import {MatFormFieldModule,MatInputModule} from '@angular/material/';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    CommonModule,
    NgbModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class MaterialModule { }
