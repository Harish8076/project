import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('confirmPassword' , {static : false}) confirmPassword !: ElementRef;
  genderValues = [
    {
      name : 'Male',
      value : 'male'
    },
    {
      name : 'Female',
      value : 'female'
    },
    {
      name : 'Others',
      value : 'others'
    }
  ]
  UserRegistrationForm !: FormGroup;
  constructor(public authService : AuthService , public toastr : ToastrService , public router : Router) { 
    this.UserRegistrationForm = new FormGroup({
      username : new FormControl('' , [Validators.required]),
      email : new FormControl('' , [Validators.required]),
      password : new FormControl('' , [Validators.required]),
      gender : new FormControl('' , [Validators.required]),
      dob : new FormControl('' , [Validators.required])
    })
  }

  ngOnInit(): void {
  }
  OnSubmit(){
    if(this.UserRegistrationForm.valid && this.UserRegistrationForm.value.password === this.confirmPassword.nativeElement.value){
      this.authService.signUp(this.UserRegistrationForm.value).subscribe((res:any) =>{
        if(res && res.status === "ok" && res.data){
          this.toastr.success('Sign up Successfully!')
          this.router.navigate(['/login'])
        } else if(res && res.status === "ok" && res.isUserExist){
          this.toastr.warning('User already exist!')
          this.router.navigate(['/login'])
        }
      } , err =>{
        if(err){
          console.log('Error ===>' , err)
        }
      })
    } else if(this.UserRegistrationForm.value.password === this.confirmPassword.nativeElement.value){
      this.toastr.warning('Password and confirm password is not correct')
    } else {
      this.toastr.warning('Form is invalid')
    }
  }
}
