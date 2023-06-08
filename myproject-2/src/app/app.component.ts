import { Component, OnInit } from '@angular/core';
import { DemoService } from './services/demo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  account: any;
  islogin: boolean = false;
  constructor(private app: DemoService) {}
  ngOnInit(): void {

    this.islogin = this.app.get_account_info() ? true : false;
    this.account = this.app.get_account_info();
  }
  on_logout(){
    sessionStorage.removeItem('login');
    location.assign('/login')
  }
}
