import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Account, Payment, AuthToken, ResponseMessage, Wish} from './models';
import {Comment} from './models'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

	BASE_URL = 'http://127.0.0.1:8000';

	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};
	  
	constructor(private client: HttpClient) {
		client.head("Access-Control-Allow-Origin");
	}

	login(username: string, password: string): Observable<AuthToken> {
		return this.client.post<AuthToken>(`${this.BASE_URL}/api/login/`, {
			username,
			password
		});
	}

	register(name: string, username: string, phone: string, address: string, password: string): Observable<ResponseMessage> {
		return this.client.post<ResponseMessage>(`${this.BASE_URL}/api/register/`, {
			password,
			profile: {
				name,
				phone,
				username,
				address
			}
		});
	}

	getAccount(): Observable<Account> {
		return this.client.get<Account>(`${this.BASE_URL}/api/account/`);
	}

	addWish(text: string): Observable<Wish> {
		return this.client.post<Wish>(`${this.BASE_URL}/api/wish/`, {
			text
		});
	}

	updateWish(id: number, text: string): Observable<Wish> {
		return this.client.put<Wish>(`${this.BASE_URL}/api/wish/${id}/`, {
			text
		});
	}

	deleteWish(id: number): Observable<ResponseMessage> {
		return this.client.delete<ResponseMessage>(`${this.BASE_URL}/api/wish/${id}/`)
	}

	extendSubscription(amount: number, days: number, method: string): Observable<ResponseMessage> {
		return this.client.post<ResponseMessage>(`${this.BASE_URL}/api/payment/`, {
			amount,
			method,
			days
		});
	} 

	getFeedbacks(): Observable<Comment[]>{
		return this.client.get<Comment[]>(`${this.BASE_URL}/api/feedback/`);
	}

	addFeedback(email: string, content: string): Observable<Comment> {
		return this.client.post<Comment>(`${this.BASE_URL}/api/feedback/`,
		{
			email: email,
			content: content
		});
	}
}
