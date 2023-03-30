import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { ApiserviceService } from '../services/apiservice.service';
import { emp } from './userdash.model';

@Component({
  selector: 'app-userdash',
  templateUrl: './userdash.component.html',
  styleUrls: ['./userdash.component.css']
})
export class UserdashComponent implements OnInit {

  empobj : emp = new emp();
  myform!: FormGroup;
  empData !: any;
  showUpdate!:boolean;
  showEdit!: boolean;
  constructor(private fb:FormBuilder,private api:ApiserviceService) { }

  ngOnInit(): void {

    this.myform  = this.fb.group({
      firstname : [''],
      email : [''],
      salary : ['']  
    })
    this.getEmpData();
  }

  postEmpDetails(){
    this.showUpdate = false ;
    this.showEdit = true;
    this.empobj.firstname = this.myform.value.firstname;
    this.empobj.email= this.myform.value.email;
    this.empobj.salary= this.myform.value.salary;
    this.api.postEmp(this.empobj).subscribe(res=>{
      console.log(res);

      alert("Success!!");
      let ref = document.getElementById('cancel');
      ref ?.click();
      this.myform.reset();
      this.getEmpData();
    },
    err=>{
      alert("Something Went Wrong!!!!");
    })
  }

  getEmpData(){
    return this.api.getEmp().subscribe(res=>{
      this.empData = res;
      console.log(this.empData);
      
    })
  }
  deleteEmpData(ob : any){
    this.api.deletEmp(ob.id).subscribe(res=>{
      alert('EMployee Deleted Successfully');
      this.getEmpData();
    })
  }  
  updateEmpData(){
    
      this.empobj.firstname = this.myform.value.firstname;
      this.empobj.email= this.myform.value.email;
      this.empobj.salary= this.myform.value.salary;
      this.api.updateEmp(  this.empobj,  this.empobj.id).subscribe(res=>{
      alert('EMployee Updated Successfully');
      let ref = document.getElementById('cancel');
      ref ?.click();
      this.myform.reset();
      this.getEmpData();
    })
  }  
  onEdit(ob:any){
    this.showUpdate = true;
    this.showEdit = false;
    this.empobj.id=ob.id;
    this.myform.controls['firstname'].setValue(ob.firstname);
    this.myform.controls['email'].setValue(ob.email);
    this.myform.controls['salary'].setValue(ob.salary);

  }
  onAdd()
  {
    this.myform.reset();
    this.showEdit = true;
    this.showUpdate = false;
  }


}
