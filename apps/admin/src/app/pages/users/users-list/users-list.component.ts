import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsersService } from '../../../../../../../libs/users/src/lib/services/users.service';
import { User } from '../../../../../../../libs/users/src/lib/models/user';


@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styles: [
  ]
})
export class UsersListComponent implements OnInit {

  users: User[] = [];

  constructor(
    private usersService: UsersService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this._getUsers();
  }

  private _getUsers(){
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
    })
  }

  updateUser( userid: string ){  //nos lleva a agregar una nueva categoria pero con el id de la categoria que seleccionamos actualizar
    this.router.navigateByUrl(`users/form/${userid}`)
  }

  //metodo para eliminar usuarios
  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this User?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(userId).subscribe(
          () => {
            this._getUsers();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'User is not deleted!'
            });
          }
        );
      }
    });
  }

  //metodo para paises
  getCountryName( countryKey: string){
    if(countryKey) return this.usersService.getCountry(countryKey)
  }

}
