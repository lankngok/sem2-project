import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const api: string = 'http://localhost:3000/api';
@Injectable({
  providedIn: 'root'
})
export class DemoService {
  constructor(private http: HttpClient) { };

  listTours() {
    return this.http.get(`${api}/tours`);
  }
  listToursNew() {
    return this.http.get(`${api}/toursnew`);
  }
  listToursSale() {
    return this.http.get(`${api}/tourssale`);
  }
  listToursByCategoryId(id: number) {
    return this.http.get(`${api}/toursbycategory/${id}`);
  }
  listCategory() {
    return this.http.get(`${api}/category`);
  };
  getCategoryById(id: number) {
    return this.http.get(`${api}/category/${id}`);
  }
  getToursById(id: number): any {
    return this.http.get<any>(`${api}/tours/${id}`);
  }
  check_login(data: any): any {
    return this.http.post<any>(`${api}/login`, data);
  }

  get_register(data: any): any {
    return this.http.post<any>(`${api}/register`, data);
  }



  add_favourite(data: any) {
    return this.http.post(`${api}/favourite`, data)
  }
  listfavourite(account_id: number): any {
    return this.http.get<any>(`${api}/favourite/${account_id}`)
  }
  removeFavourite(account_id: number, t_id: number) {
    return this.http.delete<any>(`${api}/favourite/${account_id}/${t_id}`);
  }



  
  checkIsFavorite(data: any, callback: any) {
    return this.http.get(`${api}/favourite/${data.acc_id}/${data.pro_id}`)
      .subscribe(
        (res: any) => {
          callback(res.status);
        });
  }

  get_account_info() {
    let storage = sessionStorage.getItem('login');
    if (storage) {
      return JSON.parse(storage);
    } else {
      return null;
    }
  }




  get_cart_info() {
    let cartJson = sessionStorage.getItem('cart');
    if (cartJson) {
      return JSON.parse(cartJson);
    } else {
      return [];
    }
  }

  saveCart(carts: any){
    let cartJson = JSON.stringify(carts);
    sessionStorage.setItem('cart', cartJson);
  }

}
