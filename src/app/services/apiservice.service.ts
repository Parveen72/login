import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http : HttpClient) { }

postEmp(data :any){
  return this.http.post('http://localhost:3000/posts',data).
  pipe(map((res:any)=>{
   return res;
  }))
  
}
getEmp(){
  return this.http.get('http://localhost:3000/posts').
  pipe(map((res:any)=>{
   return res;
  }))
}

updateEmp(data :any,id:number){
  return this.http.patch('http://localhost:3000/posts/'+id,data).
  pipe(map((res:any)=>{
   return res;
  }))
}

deletEmp(id : number){
  return this.http.delete('http://localhost:3000/posts/'+id).
  pipe(map((res:any)=>{
   return res;
   
  }))
}

}
