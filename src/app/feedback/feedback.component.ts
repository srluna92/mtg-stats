import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FireService, FormService } from '../services/index.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  // styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  message: string;

  send(): void {
    this.fire.sendFeedback(this.message);
  }

  constructor(
    private fire: FireService,
    private formService: FormService
  ) { }

  ngOnInit() {
  }

}
