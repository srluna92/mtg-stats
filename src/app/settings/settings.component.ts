import { Component, OnInit } from '@angular/core';
import { Settings } from '../models';
import { FireService } from '../services/fire.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  s: Settings;

  update(): void {
    this.fire.updateSettings(this.s);
  }

  constructor(
    private fire: FireService
  ) { }

  ngOnInit() {
    this.fire.settings.asObservable().subscribe(set => this.s = set);
    this.fire.retrieveSettings();
  }

}
