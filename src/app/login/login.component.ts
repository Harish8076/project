import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserForm !: FormGroup;
  constructor(public authService : AuthService , public router : Router,private toastr: ToastrService) { 
    this.loginUserForm = new FormGroup({
      email : new FormControl('' , [Validators.required]),
      password : new FormControl('' , [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  OnSubmit(){
    const username = this.loginUserForm.get('name')?.value;
    localStorage.setItem('loggedInUsername', username)
    console.log('Login user credentials' , this.loginUserForm.value)
    if(this.loginUserForm.valid){
      this.authService.login(this.loginUserForm.value).subscribe((res:any)=>{
        if(res && res.status === 'ok' && res.data && res.data.userExist && res.data.isPasswordCorrect){
          localStorage.setItem('token' , res.data.token)
          localStorage.setItem('loggedInUser' , res.data._id)
          this.toastr.success('LoggedIn Successfully')
          this.router.navigate(['/dashboard'])

          
          const username = this.loginUserForm.get('name')?.value;
   
          localStorage.setItem('Username', username)
        
        } else if(res.status === 'ok' && !res.data.userExist){
          this.toastr.warning('User not found') 
        } else if(res.status === 'ok' && !res.isPasswordCorrect){
          this.toastr.warning('Password is incorrect')
        }
      })
    }
  }

}
