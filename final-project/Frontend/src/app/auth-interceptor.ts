import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = localStorage.getItem('token')
		if (token) {
			const newReq = req.clone({
				headers: req.headers.append('Authorization', `JWT ${token}`)
			});
			return next.handle(newReq);
		}
		return next.handle(req);
	}
} 