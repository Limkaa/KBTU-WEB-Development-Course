import { Component, OnInit } from '@angular/core';
import { Account } from '../models'
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service'
import {AppComponent} from '../app.component'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

	personName = '';
	email = '';
	phone = '';
	address = '';
	password = '';
	repeated_password = '';

  constructor(private apiService: ApiService, 
        private appComponent: AppComponent,
        private router: Router,
          private route: ActivatedRoute) { }

  ngOnInit(): void {
   if (this.appComponent.logged) {
      this.router.navigateByUrl('account');
    }
  }

  register() {
    if (this.personName && this.email && this.phone && this.address && this.password && (this.password == this.repeated_password)) {
      this.apiService.register(this.personName, this.email, this.phone, this.address, this.password).subscribe((data) => {
        if (!data) {
          alert("Please  email or password!")
        }
      });
      this.router.navigateByUrl('account');
    } else {
      alert('Error! Please check correctness of passwords. And be sure that all field are filled. After that try to register again')
    }
  }
  
}
