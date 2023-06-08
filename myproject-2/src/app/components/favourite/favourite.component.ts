import { Component, OnInit } from '@angular/core';
import { DemoService } from 'src/app/services/demo.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {
  favourite: any = [];
  constructor(private app: DemoService) { }

  allFavourite(){
    this.app.listfavourite(this.app.get_account_info().id).subscribe((res: any) => {
      this.favourite = res.result;
      console.log(res.result);
      
    })
  }

  ngOnInit(): void {
    this.allFavourite();
  }

  removeFavourite(id: number){
    this.app.removeFavourite(this.app.get_account_info().id, id).subscribe((res: any) =>{
      Swal.fire({
        title:  res.result,
        icon: 'success'
      })
      this.allFavourite(); 
    })
  }


}
