import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemoService } from 'src/app/services/demo.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-toursdetail',
  templateUrl: './toursdetail.component.html',
  styleUrls: ['./toursdetail.component.css']
})
export class ToursdetailComponent implements OnInit {
  id: any;
  product: any;
  related_products: any = [];
  showtours: any = [];
  p: number = 1;
  constructor(private activedRouter: ActivatedRoute, private app:  DemoService) { }
  gettourslist(){
    this.app.listTours().subscribe((res: any) => {
      let pros = res.result.map((item: any) => {
        this.isFavorite(item.id, function(status: boolean){
          item.isFavorite = status
        })
        return item;
      });
      this.showtours = pros;
    });
  }
  ngOnInit(): void {
    this.activedRouter.paramMap.subscribe((query: any) => {

      this.id = query.get('id');
      
      this.app.getToursById(this.id).subscribe((res: any) => {
        this.product = res.result;

        this.app.listToursByCategoryId(this.product.category_id).subscribe((res: any) => {
          this.related_products = res.result;
        });
      });
    });
  }

  isFavorite(pro_id: number, callback: any) {
    let acc_id = this.app.get_account_info() ? this.app.get_account_info().id : 0;
    this.app.checkIsFavorite({ acc_id, pro_id }, (status: boolean) => {
      callback(status);
    })
  }
  on_favourite(id: number){
    let account_id = this.app.get_account_info().id;
    this.app.add_favourite({account_id: account_id, tours_id: id}).subscribe((res: any) =>{
      this.gettourslist();
      Swal.fire({
        title:  res.result,
        icon: 'success'
      })
    })
  }
}
