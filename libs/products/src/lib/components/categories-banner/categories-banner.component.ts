import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@blubits/products';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'categories-banner',
  templateUrl: './categories-banner.component.html'
})
export class CategoriesBannerComponent implements OnInit,OnDestroy {
  categories:Category[]=[]
  endSub$:Subject<boolean> = new Subject()

  constructor(private cateoriesService:CategoriesService) { }

  ngOnInit(): void {
    this. _getCategories();
  }
  ngOnDestroy(){
    this.endSub$.next()
    this.endSub$.complete()
  }

  private _getCategories(){
    this.cateoriesService.getCategories().pipe(takeUntil(this.endSub$)).subscribe(res=>{
      this.categories=res.data
    })
  }

}
