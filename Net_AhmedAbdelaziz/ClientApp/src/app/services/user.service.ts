import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getUser(): Observable<any> {
        return this.http.get(`api/user`);
    }
    getUserById(id): Observable<any> {
        return this.http.get(`api/user/${id}`);
    }
    addUser(user): Observable<any> {

        const httpHeaders = this.getHTTPHeaders();
        return this.http.post(`api/user`, {...user}, { headers: httpHeaders });
    }
    UpdateUser(payload): Observable<any> {
        const httpHeaders = this.getHTTPHeaders();
        return this.http.put(`api/user/${payload.id}`, {...payload.user}, { headers: httpHeaders });
    }
    deleteUserById(id): Observable<any> {
        return this.http.delete(`api/user/${id}`);
    }

    getHTTPHeaders(): HttpHeaders {
		const result = new HttpHeaders();
		result.set('Content-Type', 'application/json');
		return result;
	}
}