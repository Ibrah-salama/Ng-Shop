import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { CategoriesService, Category } from '@blubits/products';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html'
})
export class CategoriesFormComponent implements OnInit {
  isSubmitted = false;
  editMode = false ;
  currentCategoryId = ""
  form: FormGroup = this.formBuilder.group({
    name: [''],
    icon: [''],
    color:['']
  });
  constructor(
    private location: Location,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private route:ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      icon: ['', Validators.required],
      color:['#fff']
    });
    this._checkEditMode()
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const category: Category = {
      id:this.currentCategoryId,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value
    };
    // IF UPDATE AND IF ADD 
    if(this.editMode){
      this._updateCategory(category,this.currentCategoryId);
    }else {
      this._addCategory(category)
    }

  }
  get categoryForm() {
    return this.form.controls;
  }

  private _checkEditMode(){
    // if there is a param id in the url then we are in the edit mode 
    this.route.params.subscribe(params=>{
      if(params.id){
        this.editMode = true
        this.currentCategoryId = params.id
        this.categoryService.getCategory(params.id).subscribe(res=>{
          this.categoryForm.name.setValue(res.data.name)
          this.categoryForm.icon.setValue(res.data.icon)
          this.categoryForm.color.setValue(res.data.color)
        })
      }
    })
  }
  private _updateCategory(category:Category,categoryId:string){
    this.categoryService.updateCategory(category,categoryId).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: res.status,
          detail: `Category updated successfully`,
        });
        //navigate back use Location service fro angular/common and timer from rxjs
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: error.message,
          detail: `Category failed to update`,
        });
      }
    );
  }
  private _addCategory(category:Category){
    this.categoryService.createCategory(category).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: res.status,
          detail: `Category ${res.data.name} added successfully`,
        });
        //navigate back use Location service fro angular/common and timer from rxjs
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: "Error",
          detail: `Category failed to create`,
        });
      }
    );
  }
  cancel(){
    this.location.back()
  }
}
