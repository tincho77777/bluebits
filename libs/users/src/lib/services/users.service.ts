import { Injectable } from "@angular/core";
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from "../models/user";
import * as countriesLib from 'i18n-iso-countries';
import { map } from 'rxjs/operators';

declare const require: any;

@Injectable({
    providedIn: 'root'
})
export class UsersService {

apiURLUsers = environment.apiURL + 'users';

constructor( private http: HttpClient) { 
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
}

//metodo para traer los usuarios
getUsers() : Observable <User[]> {  //el back me devuelve un observable y le digo que es de tipo array de category
    return this.http.get<User[]>(this.apiURLUsers);
} 

//metodo para traer un solo usuarios
getUser( userId: string ) : Observable <User> {  //el back me devuelve un observable y le digo que es de tipo array de category
     return this.http.get<User>(`${this.apiURLUsers}/${userId}`);  //el apiURLCategories esta definido en environments/environment.ts
} 

//metodo para crear usuarios en el backend
createUser( user: User ): Observable <User> {
    return this.http.post<User>(this.apiURLUsers, user);
}

//metodo para editar usuarios en el backend
updateUser( user: User): Observable <User> {
    return this.http.put<User>(`${this.apiURLUsers}/${user.id}` , user)
}

//metodo para eliminar usuarios
deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLUsers}/${userId}`);
}

//servicio para traer los paises
getCountries(): { id: string; name: string }[] {
    return Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
        return {
            id: entry[0],
            name: entry[1]
    };
    });
}

//servicio para obtener un pais
getCountry(countryKey: string): string {
    return countriesLib.getName(countryKey, 'en');
}


getUsersCount(): Observable<number> {
    return this.http
        .get<number>(`${this.apiURLUsers}/get/count`)
        .pipe(map((objectValue: any) => objectValue.userCount));
}

}
