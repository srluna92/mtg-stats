import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OverviewAnalyticsComponent } from './overview-analytics.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ChartsModule
  ],
  declarations: [OverviewAnalyticsComponent],
  exports: [OverviewAnalyticsComponent]
})
export class OverviewAnalyticsModule { }
