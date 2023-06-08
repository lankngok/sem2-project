import { Component, OnInit } from '@angular/core';
import { DemoService } from 'src/app/services/demo.service';
import Swal from 'sweetalert2';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showtours: any = [];
  showtoursnew: any = [];
  showcategory: any = [];
  showtourssale: any = [];
  islogin: boolean = false;
  carts: any = this.app.get_cart_info();
  p: number = 1;

  customOptions: OwlOptions = {
    loop: true,
    items: 3,
    margin: 4,
    autoplay: true,
    center: false,
    dots: true
  }
  constructor(private app:  DemoService) { }

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

    this.islogin = this.app.get_account_info() ? true : false;

    this.app.listCategory().subscribe((res: any) => {
      this.showcategory = res.result;
    });
    
    this.app.listToursSale().subscribe((res: any) => {
      this.showtourssale = res.result;
    });

    this.gettourslist();
    this.app.listToursNew().subscribe((res: any) => {
      this.showtoursnew = res.result;
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

  
  onAddCart(product: any){
    let ind = this.carts.findIndex((item: any) => {
      return item.id == product.id;
    });

    if(ind >= 0){
      this.carts[ind].quantity += 1;
    } else {
      let cartItem: any = {
        id: product.id,
        name: product.name,
        price: product.sale_price ? product.sale_price : product.price,
        image:product.image,
        quantity: 1,
        subtotal: function(){
          return this.price * this.quantity;
        }
      }
      this.carts.push(cartItem);
    }
    this.app.saveCart(this.carts);
    Swal.fire({
      title:  'Thêm vào giỏ hàng thành công',
      icon: 'success'
    })
  }
  

}
