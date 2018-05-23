import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverviewComponent } from './overview.component';
import { MaterialModule } from '../material.module';
import { DeckModule } from '../deck/deck.module';
import { OverviewAnalyticsModule } from './overview-analytics/overview-analytics.module';
import { PipeModule } from '../pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    DeckModule,
    OverviewAnalyticsModule,
    PipeModule
  ],
  declarations: [OverviewComponent],
  exports: [OverviewComponent],
})
export class OverviewModule { }
