import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from './api.service';
import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
