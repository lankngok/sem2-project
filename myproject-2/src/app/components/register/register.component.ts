import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DemoService } from 'src/app/services/demo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  checkErrors: any;
  formRegister: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(12)]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)])
  });

  get fo(){
    return this.formRegister.controls;
  }
  
  constructor(private app: DemoService) { }

  ngOnInit(): void {
  }
  on_register() {
    if(this.formRegister.invalid){return;}

    this.app.get_register(this.formRegister.value).subscribe((res: any) => {
      if(res.status == false){
        Swal.fire({
          title:  res.result,
          icon: 'error'
        })
      } else {
        location.assign('/login');
      }
    })
  }
  
}
