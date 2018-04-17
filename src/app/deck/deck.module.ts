import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { DeckComponent } from './deck.component';
import { DecklistModule } from './decklist/decklist.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    DecklistModule
  ],
  declarations: [DeckComponent],
  exports: [DeckComponent]
})
export class DeckModule { }
