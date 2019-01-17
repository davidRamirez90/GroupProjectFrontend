import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ApiService } from '../api.service';
import { LocalstorageService } from '../localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  registerForm: FormGroup;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private lstorage: LocalstorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      user: ['', Validators.required],
      pass: ['', Validators.required]
    });

    this.loginForm = this.fb.group({
      user: ['', Validators.required],
      pass: ['', Validators.required]
    });
  }

  onLogin(form) {
    if (this.loginForm.invalid) return;
    this.registerForm.reset();

    this.api.loginUser(form.user, form.pass).subscribe(
      res => {
        console.log(res);
        this.loginForm.reset();
        this.lstorage.saveToken(res.token);
        this.router.navigate(['/projects']);
      },
      err => {
        console.log(err);
        alert('Incorrect login details');
      }
    );
  }

  onRegister(form) {
    if (this.registerForm.invalid) return;
    this.loginForm.reset();

    this.api.registerUser(form.name, form.user, form.pass).subscribe(
      res => {
        console.log(res);
        this.registerForm.reset();
        this.lstorage.saveToken(res.token);
        this.router.navigate(['/projects']);
      },
      err => {
        console.log(err);
        alert('An error has ocurred');
      }
    );
  }
}
