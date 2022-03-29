import { Component, OnInit } from '@angular/core';
import {Account} from '../models';
import {ApiService} from '../api.service';
import { AppComponent } from '../app.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

	email = '';
	password = '';
	returnPage = 'account';

	constructor(private apiService: ApiService, 
				private appComponent: AppComponent,
				private router: Router,
    			private route: ActivatedRoute) { }

	ngOnInit() {
	    // Get the query params
	    if (this.appComponent.logged) {
	    	this.router.navigateByUrl(this.returnPage);
	    }
	  }

	login() {
		if (this.email && this.password) {
	      this.apiService.login(this.email, this.password).subscribe((data) => {
	      	if (data.token) {
	      		localStorage.setItem('token', data.token)
	      		this.appComponent.logged = true;
	      		this.router.navigateByUrl(this.returnPage);
	      	}
	      });
    	} else {
    		alert('Error! Please be sure that entered email and password are correct! After that you can try again.')
    	}
	}
}
