import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService, Product } from '@blubits/products';
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
  isSubmitted = false;
  editMode = false;
  currentCategoryId = ''; 
  categories:Category[] =[]
  imageDisplay:any | string | ArrayBuffer ;
  productId=""
  form: FormGroup = this.formBuilder.group({
    name: [""],
    brand: [""],
    price: [""],
    category: [""],
    countInStock: [""],
    description: [""],
    richDescription: [],
    image: [""],
    isFeatured: [""],
    dateCreated: [""],
  });
  constructor(
    private location: Location,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private route: ActivatedRoute,
    private productsService:ProductsService
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode()

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
      countInStock: ["",[Validators.required,Validators.max(265)]],
      description: ["",Validators.required],
      richDescription: [],
      image: ["",Validators.required],
      isFeatured: [false],
      dateCreated: [""],
      // images: [],
      // rating: [],
    });
  }

  get productForm(){
    return this.form.controls;
  }
  onSubmit() {
    // Add the form data to the backend 
    this.isSubmitted=true 
    if(this.form.invalid) return
    const productFormData = new FormData()
    Object.keys(this.productForm).map(key=>{
      //in prime ng we solve this issue of the category id using optionvalue
      //and specify it as the id of the category 
      // if(key==="category") {
      //   productFormData.append(key,this.productForm[key].value._id)
      // }else{
      //   productFormData.append(key,this.productForm[key].value)
      // }
        productFormData.append(key,this.productForm[key].value)
    })
    if(this.editMode){
      this._updateProduct(this.productId,productFormData)
    }else{
      this._addProduct(productFormData)
    }
  }
  cancel() {
    this.location.back()
  }

  onImageUpload(event:any){
    const file = event.target.files[0]
    if(file){
      // this line sole the problem of the image 
      // this send the data itself of the image 
      this.form.patchValue({image:file})
      this.form.get('image')?.updateValueAndValidity()
       const fileReader = new FileReader()
       fileReader.onload = () => {
         this.imageDisplay= fileReader.result
       }
    }
  }
 private _addProduct(productFormData:FormData){
    this.productsService.addProduct(productFormData).subscribe(res=>{
        this.messageService.add({
          severity: 'success',
          summary: res.status,
          detail: `Product ${res.data.name} added successfully`,
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
          detail: `Product failed to create`,
        });
      }
    );
  }

  private _checkEditMode(){
    // if there is a param id in the url then we are in the edit mode 
    this.route.params.subscribe(params=>{
      if(params.id){
        this.editMode = true
        this.productId = params.id
        this.productsService.getProduct(params.id).subscribe(res=>{
          this.productForm.name.setValue(res.data.name)
          this.productForm.brand.setValue(res.data.brand)
          this.productForm.price.setValue(res.data.price)
          this.productForm.category.setValue(res.data.category?.id)
          this.productForm.countInStock.setValue(res.data.countInStock)
          this.productForm.description.setValue(res.data.description)
          this.productForm.isFeatured.setValue(res.data.isFeatured)
          this.imageDisplay = res.data.image
          this.productForm.image.setValidators([])
          this.productForm.image.updateValueAndValidity()
        })
      }
    })
  }

  _updateProduct(productId:string,product:FormData){
    this.productsService.updateProduct(productId,product).subscribe(res=>{
      this.messageService.add({
        severity: 'success',
        summary: res.status,
        detail: `Product ${res.data.name} added successfully`,
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
        detail: `Product failed to create`,
      });
    }
  );
  }
}
