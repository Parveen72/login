import { HttpClient } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
    //Form Validables 
  loginForm:any = FormGroup;
  submitted = false;
  constructor( private formBuilder: FormBuilder,
    private http : HttpClient,
    private router : Router ){}
  //Add user form actions
  get f() { return this.loginForm.controls; }
  login() {
    
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    //True if all the fields are filled
    // if(this.submitted)
    // {
    //   alert("Great!!");
    // }
   

    this.http.get<any>('http://localhost:3000/singup').subscribe(res=>{
      const ref = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(ref){
        alert('Login Success');
        this.loginForm.reset();
        this.router.navigate(['userdash']);
      }else{
        alert('User Not Found');
      }
    },err=>{
      alert("Something Went wrong");
    })
  }
    ngOnInit() {
      //Add User form validations
      this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
      });
    }
  }
