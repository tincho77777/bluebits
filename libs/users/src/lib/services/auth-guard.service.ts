import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private localStorageToken: LocalstorageService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

    const token = this.localStorageToken.getToken();

    if(token){
      const tokenDecode = JSON.parse(atob(token.split('.')[1])); //aca divide el codigo encriptado en tres partes, necsitamos la segunda parte entonces lo dividimos y con el [1] elegimos la segunda parte
      if(tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)){
      return true;
      }
    }

    this.router.navigate(['/login'])  //si apretas un link sin estar logueado te lleva a la login page
    return false;
  }

  private _tokenExpired(expiration:any): boolean{  //metodo para comprobar si ya paso el tiempo de expiracion del token
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
