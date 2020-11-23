import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { SubredditModel } from '../subreddit-response';
import { SubredditService } from '../subreddit.service';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css']
})
export class CreateSubredditComponent implements OnInit {

  createSubredditForm: FormGroup;
  subredditModel: SubredditModel;
  title = new FormControl('');
  description = new FormControl('');

  constructor(private router: Router, private subredditService: SubredditService, private toastr: ToastrService) { 
    this.createSubredditForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.subredditModel = {
      name: '',
      description: ''
    }
  }

  ngOnInit() {}

  discard(): void {
    this.router.navigateByUrl('/');
  }

  createSubreddit(): void {
    this.subredditModel.name = this.createSubredditForm.get('title').value;
    this.subredditModel.description = this.createSubredditForm.get('description').value;

    this.subredditService.saveSubreddit(this.subredditModel)
      .subscribe(data => {
        this.router.navigateByUrl('/list-subreddits');
        this.toastr.success('Create subreddit successful');
      }, error => {
        throwError(error);
      })
  }
}
