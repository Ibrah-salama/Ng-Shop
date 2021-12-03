import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@blubits/products';
import { MessageService } from 'primeng/api';
import { ConfirmationService} from 'primeng/api';
import { Router } from '@angular/router'
import { Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators"

@Component({
  selector: 'admin-categories-lisst',
  templateUrl: './categories-lisst.component.html'
})
export class CategoriesLisstComponent implements OnInit,OnDestroy {
  categories: Category[] = [];
  endSub$:Subject<boolean> = new Subject()
  constructor(
    private messageService: MessageService,
    private categoriesService: CategoriesService,
    private confirmationService:ConfirmationService,
    private router:Router
    ) {}

  ngOnInit(): void {
    this._getCategories()
  }
  ngOnDestroy(){
    this.endSub$.next()
    this.endSub$.complete()
  }
  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this category?',
      header: 'Delete category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          // this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
          this.categoriesService.deleteCategory(categoryId).subscribe(
            () => {
              this._getCategories()
              this.messageService.add({
                severity: 'success',
                summary: 'Deleted',
                detail: `Category Deleted successfully :D`,
              });
            },
            () => {
              this.messageService.add({
                severity: 'error',
                summary: "Error",
                detail: `Category failed to Delete!`,
              });
            }
          );
      },
      reject: () => {      
      }
  });

   
  }
  updateCategory(categoryId: string) {
    this.router.navigateByUrl(`categories/form/${categoryId}`)
  }

  private _getCategories(){
    // issue with takeUntil 
      this.categoriesService.getCategories().pipe(takeUntil(this.endSub$)).subscribe((res) => {
      this.categories = res.data;
    });

    // this.categoriesService.getCategories().subscribe((res) => {
    //   this.categories = res.data;
    // });
  }
}
