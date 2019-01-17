import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../localstorage.service';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {
  token: string;
  projects: Array<any> = [];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private lstorage: LocalstorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = this.lstorage.getToken();
    this.api.getProjects(this.token).subscribe(
      data => {
        console.log(data);
        this.projects = data.projects;
      },
      err => {
        console.log(err);
      }
    );
  }

  viewProjectDetails(id) {
    console.log(id);
    this.router.navigate([`/project/${id}`]);
  }

  addNewProject() {}
}
