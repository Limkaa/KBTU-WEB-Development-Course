import { Component, OnInit } from '@angular/core';
import { Account, Wish } from '../models'
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service'
import {AppComponent} from '../app.component'

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {
  loaded: boolean = false;
  new_wish = '';

  account: Account;

  constructor(private apiService: ApiService, 
        private appComponent: AppComponent,
        private router: Router,
          private route: ActivatedRoute) { }

  ngOnInit() {
      if (!this.appComponent.logged) {
        this.router.navigateByUrl('login');
      } else {
        this.getAccount()
      }
    }

  getAccount() {
    this.apiService.getAccount().subscribe((data) => {
      if (data) {
        this.account = data
        this.loaded = true;
      } else {
        this.appComponent.logged = false
        localStorage.removeItem('token')
      }
    });
    this.loaded = true;
  }

  add_wish() {
    this.apiService.addWish(this.new_wish).subscribe((data) => {
      if (data) {
        this.new_wish = ''
        this.getAccount()
      } else {
        alert('Something went wrong!')
      }
    });
  }

  update_wish(index: number, text: string) {
    this.apiService.updateWish(this.account.wishes[index].id, text).subscribe((data) => {
      if (data) {
        this.getAccount()
        alert('Successfully updated and saved!')
      } else {
        alert('Something went wrong!')
      }
    });
  }

  delete_wish(index: number) {
    this.apiService.deleteWish(this.account.wishes[index].id).subscribe((data) => {
      if (data) {
        this.getAccount()
      } else {
        alert('Something went wrong!')
      }
    });
  }

}
