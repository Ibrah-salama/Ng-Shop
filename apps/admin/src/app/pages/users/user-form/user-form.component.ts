import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UsersService } from '@blubits/users';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from "rxjs"
import * as countriesLib from "i18n-iso-countries"

declare const require:any;

@Component({
  selector: 'admin-user-form',
  templateUrl: './user-form.component.html',
  styles: [],
})
export class UserFormComponent implements OnInit {
  editMode = false;
  isSubmitted = false;
  form: FormGroup;
  userId = '';
  countries:any=[]
  disabled=false
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private messageService:MessageService
  ) {
    this.form = this.formBuilder.group({
      name: [''],
      email: [''],
      phone: [''],
      country: [''],
      isAdmin: [''],
      street:[''],
      zip:[''],
      password:[''],
      city:[''],
      apartment:['']
    });
  }
  ngOnInit(): void {
    this._checkEditMode();
    this._initUserForm();
    this._getCountries()

  }

  private _getCountries(){
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
    // this.countries = Object.entries(countriesLib.getNames("en", {select: "official"})).map(entry=> entry)
    this.countries = Object.entries(countriesLib.getNames("en", {select: "official"})).map(entry=> {
      return {id:entry[0],name:entry[1]}
    })
  }

  private _initUserForm(){
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      country: [''],
      isAdmin: [false, Validators.required],
      password:['',[Validators.required,Validators.minLength(8)]],
      street:[''],
      city:[''],
      apartment:[''],
      zip:['']
    });
  }
  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.userId = params.id;
        this.usersService.getUser(params.id).subscribe((res) => {
          this.userForm.name.setValue(res.data.name);
          this.userForm.email.setValue(res.data.email);
          this.userForm.phone.setValue(res.data.phone);
          this.userForm.country.setValue(res.data.country);
          this.userForm.isAdmin.setValue(res.data.isAdmin);
          this.userForm.zip.setValue(res.data.zip);
          this.userForm.street.setValue(res.data.street);
          this.userForm.apartment.setValue(res.data.apartment);
          this.userForm.password.setValidators([]);
          this.userForm.password.updateValueAndValidity();
          this.form.controls['password'].disable();
        });
      }
    });
  }
  get userForm() {
    return this.form.controls;
  }

  private _addUser(user:User){
    this.usersService.createUsers(user).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: res.status,
          detail: `User ${res.data.name} added successfully`,
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
          detail: `User failed to create`,
        });
      }
    );
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      name: this.userForm.name.value,
      email: this.userForm.email.value,
      phone: this.userForm.phone.value,
      country: this.userForm.country.value,
      isAdmin: this.userForm.isAdmin.value,
      password: this.userForm.password.value,
      city:this.userForm.city.value,
      street:this.userForm.street.value,
      apartment:this.userForm.apartment.value
    };
    // IF UPDATE AND IF ADD
    if (this.editMode) {
      this._updateUser(user, this.userId);
    } else {
      this._addUser(user);
    }
  }
  cancel() {
    this.location.back();
  }
  private _updateUser(user:User,userId:string){
    this.usersService.updateUser(user,userId).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: res.status,
          detail: `User updated successfully`,
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
          detail: `User failed to update`,
        });
      }
    );
  }
}
