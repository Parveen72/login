import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  submitted = false;
  constructor(private formBuilder: FormBuilder,
    private http : HttpClient,
    private router : Router
    ) {
  }
  registerForm!: FormGroup;
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required,Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      tnc: ['', Validators.required]
    });
    
    }
    
     get fval() {
     return this.registerForm.controls;
     }
     
     signup(){
     this.submitted = true;
      this.http.post('http://localhost:3000/singup',this.registerForm.value).subscribe(res=>{
        console.log(res);
        alert("Singup Success!");
        this.registerForm.reset();
        this.router.navigate(["login"]);
        
      },err=>{
        alert('Something Went Wrong');
      })



     if (this.registerForm.invalid) {
     return;
     }
     alert('form fields are validated successfully!');
     }

}
