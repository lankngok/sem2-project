import { Component, OnInit } from '@angular/core';
import { DemoService } from 'src/app/services/demo.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  carts: any = [];
  constructor(private app: DemoService) { }

  

  ngOnInit(): void {
    this.carts = this.app.get_cart_info();
    console.log(this.carts);
    
  };

  subToTal(cart: any) {
    return cart.quantity * cart.price;
  };

  updateQuantity(index: number, ev: any) {
    let newQuantity = parseInt(ev.target.value);
    newQuantity = newQuantity > 0 ? newQuantity : 1;
    newQuantity = newQuantity < 100 ? newQuantity : 99;
    ev.target.value = newQuantity;
    this.carts[index].quantity = newQuantity;
    this.app.saveCart(this.carts);
  }

  giamSl(idx: number, qtt: any) {
    let newQtt = parseInt(qtt) - 1;
    newQtt = newQtt > 0 ? newQtt : 1;
    this.carts[idx].quantity = newQtt;
    this.app.saveCart(this.carts);
  }
  tangSl(idx: number, qtt: any) {
    let newQtt = parseInt(qtt) + 1;
    newQtt = newQtt < 100 ? newQtt : 99;
    this.carts[idx].quantity = newQtt;
    this.app.saveCart(this.carts);
  }

  removeCart(idx: number) {
    let _this = this;
    Swal.fire({
      title: 'Bạn có chắc không',
      text: "OK sẽ xóa",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok xóa'
    }).then(function (isConfirm: any) {
      if (isConfirm.isConfirmed) {
        Swal.fire(
          'Đã xóa',
          'Xóa sản phẩm khỏi giỏ hàng',
          'success'
        );
        _this.carts.splice(idx, 1);
        _this.app.saveCart(_this.carts);
      }
    })
  }
  clearCart(){
    let _this = this;
    Swal.fire({
      title: 'Bạn có chắc không',
      text: "OK sẽ xóa",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok xóa'
    }).then(function (isConfirm: any) {
      if (isConfirm.isConfirmed) {
        Swal.fire(
          'Đã xóa',
          'Xóa sản phẩm khỏi giỏ hàng',
          'success'
        );
        sessionStorage.removeItem('cart');
        _this.carts =[]
      }
    })
  }
}
