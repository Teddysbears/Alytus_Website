import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from "@angular/material";
import { MatButtonModule } from "@angular/material";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from "@angular/material";
import {MatFormFieldModule,MatInputModule} from '@angular/material/';
import {MatDatepickerModule} from "@angular/material";
import { MatRadioModule } from "@angular/material";


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
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule
  ],
  exports: [
    CommonModule,
    NgbModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule
  ]
})
export class MaterialModule { }
