import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../models'
import { ApiService } from '../api.service'

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  
  constructor(private apiService: ApiService) {}

  comments: Comment[] = [];
  public email = ""
  public content = ""

  ngOnInit(): void {
    this.get_Feedbacks()
  }

  add(){
    return this.apiService.addFeedback(this.email,this.content).subscribe(feedback => {
      window.location.reload();
    })
  }
  
  get_Feedbacks(){
    this.apiService.getFeedbacks().subscribe(feedback => this.comments = feedback);
  }

}
