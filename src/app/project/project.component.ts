import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../api.service';
import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  title = 'opcuafrontend';
  token = '';
  clickedVar;
  varData;
  folders = [];
  subfolders1 = [];
  subfolders2 = [];
  subfolders3 = [];
  subfolders4 = [];
  auditedVars = [];
  today = new Date();
  stdVars;

  constructor(private api: ApiService, private ref: ChangeDetectorRef) {
    this.disconnectFromServer();
  }

  ngOnInit(): void {
    const sockets = socketIo('http://localhost:5000');

    sockets.on('hello', data => {
      console.log(data);
    });

    sockets.on('variableValues', data => {
      this.auditedVars = this.auditedVars.map(v => {
        if (v.id === data.id)
          v.vals.push({
            x: v.vals.length + 1,
            y: data.data.value
          });
        return v;
      });
      this.ref.markForCheck();
    });
  }

  disconnectFromServer() {
    this.api.disconnectFromServer().subscribe(data => {
      this.token = '';
      this.folders = [];
      this.subfolders1 = [];
      this.subfolders2 = [];
      this.subfolders3 = [];
      this.auditedVars = [];
      this.varData = undefined;
      this.clickedVar = undefined;
    });
  }

  browseServer(r) {
    this.clickedVar = undefined;
    if (r.item.nodeClass === 'Object') {
      // If clicked on object, call server to browse its contents
      let name = r.item.nodeId;
      if (r.level < 4) {
        // Make sure we don't call server for last level, can be later extended, for now not needed
        this.api.browseServer(name).subscribe(data => {
          // Switch to decide which column of explorer to assign results to
          switch (r.level) {
            case 1:
              this.subfolders1 = data;
              this.subfolders2 = [];
              this.subfolders3 = [];
              break;
            case 2:
              this.subfolders2 = data;
              this.subfolders3 = [];
              break;
            case 3:
              this.subfolders3 = data;
              break;
          }
        });
      }
    } else if (r.item.nodeClass === 'Variable') {
      // In this case we clicked a variable, show details on sidebar
      this.api.simpleVarRead(r.item.nodeId).subscribe(res => {
        console.log(`api response: ${res}`);
        this.clickedVar = r.item;
        this.varData = res;

        console.log(this.clickedVar);
        console.log(res);
      });
    }
  }

  monitorVar(id, stdVar) {
    this.api.monitorVariable(id, stdVar).subscribe(
      res => {
        this.auditedVars.push({
          id: res.id,
          vals: []
        });
      },
      err => {
        alert(err.error);
      }
    );
  }

  connectToServer(url, port) {
    console.log('connecting to server');

    this.api.connectToServer(url, port).subscribe(
      res => {
        this.token = res.token;
        this.folders = res.data;
        this.stdVars = res.stdVars;
      },
      err => {
        alert(err.error);
      }
    );
  }

  isObserved(id) {
    let r = this.auditedVars.filter(item => item.id === id);
    return r.length > 0;
  }

  graphData(id) {
    return this.auditedVars.filter(v => {
      return v.id === id;
    });
  }

  printData() {
    console.log(this.clickedVar);
  }
}
