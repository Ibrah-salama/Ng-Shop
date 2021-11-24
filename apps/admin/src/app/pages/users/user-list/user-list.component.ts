import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService, User } from '@blubits/users';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-user-list',
  templateUrl: './user-list.component.html',
  styles: [],
})

export class UserListComponent implements OnInit,OnDestroy {
  users:User[]=[]
  countries:any=[]
  endSub$:Subject<boolean> = new Subject()
  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
    ) {}

  ngOnInit(): void {
   this._getUsers()
  }
  ngOnDestroy(){
    this.endSub$.next()
    this.endSub$.complete()
  }

  private _getUsers(){
    this.usersService.getUsers().pipe(takeUntil(this.endSub$)).subscribe((res)=>{
      this.users = res.data
    })
  }

  getCountryName(countryKey: string) {
    return this.usersService.getCountry(countryKey);
  }

  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this category?',
      header: 'Delete category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
        this.usersService.deleteUser(userId).subscribe(
          () => {
            this._getUsers();
            this.messageService.add({
              severity: 'success',
              summary: 'Deleted',
              detail: `User Deleted successfully :D`,
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `User failed to Delete!`,
            });
          }
        );
      },
      reject: () => {},
    });
  }

  updateUser(userId: string) {
    this.router.navigateByUrl(`/users/form/${userId}`)
}
}
