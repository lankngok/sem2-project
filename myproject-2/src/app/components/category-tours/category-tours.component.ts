import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemoService } from 'src/app/services/demo.service';

@Component({
  selector: 'app-category-tours',
  templateUrl: './category-tours.component.html',
  styleUrls: ['./category-tours.component.css']
})
export class CategoryToursComponent implements OnInit {
  id: any;
  h: any;
  showtoursbycategory: any = [];
  showcategory: any = [];

  constructor(private app:  DemoService, private activedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.activedRouter.paramMap.subscribe((query: any) => {

      this.id = query.get('id');

      this.app.getCategoryById(this.id).subscribe((res: any) =>{
        this.h = res.result;
      });
       
      this.app.listToursByCategoryId(this.id).subscribe((res: any) => {
        this.showtoursbycategory = res.result;
      });

      this.app.listCategory().subscribe((res: any) => {
        this.showcategory = res.result;
      });

    });
   
  }
}
