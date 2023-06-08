import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DemoService } from 'src/app/services/demo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  checkErrors: any;
  formLogin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(12)]),
    password: new FormControl('', Validators.required)
  })
  constructor(private app:  DemoService) { };
  
  get fo(){
    return this.formLogin.controls;
  }

  ngOnInit(): void {
  }

  
  on_login(){
    this.app.check_login(this.formLogin.value).subscribe((res: any) => {
      if(res.result){
        sessionStorage.setItem('login', JSON.stringify(res.result));
        location.assign('/')
      } else {
        Swal.fire({
          title:  'Tài khoản không chính xác',
          icon: 'error'
        })
      }
    })
  }
}
