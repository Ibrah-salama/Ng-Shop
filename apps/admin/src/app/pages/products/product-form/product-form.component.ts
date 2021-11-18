import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { CategoriesService, Category } from '@blubits/products';
@Component({
  selector: 'admin-product-form',
  templateUrl: './product-form.component.html',
  styles: [],
})
export class ProductFormComponent implements OnInit {
  isSubmitted = true;
  editMode = false;
  currentCategoryId = ''; 
  categories:Category[] =[]
  form: FormGroup = this.formBuilder.group({
    name: [''],
    icon: [''],
    color: [''],
  });
  constructor(
    private location: Location,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
  }
private _getCategories(){
  this.categoryService.getCategories().subscribe(res=>{
    this.categories = res
  })
}
  private _initForm() {
    this.form = this.formBuilder.group({
      name: ["",Validators.required],
      brand: ["",Validators.required],
      price: ["",Validators.required],
      category: ["",Validators.required],
      countInStock: ["",Validators.required],
      description: ["",Validators.required],
      richDescription: [],
      image: [""],
      isFeatured: [""],
      dateCreated: [""],
      // images: [],
      // rating: [],
    });
  }

  get productForm(){
    return this.form.controls;
  }
  onSubmit() {
    console.log('');
  }
  cancel() {
    console.log('');
  }
}
