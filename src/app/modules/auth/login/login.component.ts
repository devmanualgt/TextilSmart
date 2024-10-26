import { Router, RouterModule } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private routes: Router
  ) {}
  ngOnInit(): void {}

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  async submit() {
    console.log(this.form.value);
    if (this.form.invalid) {
      return;
    }

    /*   const login = await this.authService.login(this.form.value);
    console.log(login); */

    /* this.check(this.form.value.uname, this.form.value.password);
    this.router.navigate(['/dashboards/dashboard1']); */
  }

  login() {
    const credentials = {
      username: this.form.get('username')?.value || '',
      password: this.form.get('password')?.value || '',
    };

    this.authService.login(credentials).subscribe(
      () => {
        this.router.navigate(['/dashboard']); // o la ruta que deseas
      },
      (error) => {
        console.error('Error de inicio de sesión', error);
      }
    );
  }

  check(uname: any, p: any) {
    /* const output = this.service.checkusernameandpassword(uname, p);
    if (output == true) {
      this.routes.navigate(['/starter']);
    } else {
      this.msg = 'Invalid Username or Password';
    } */
  }
}
