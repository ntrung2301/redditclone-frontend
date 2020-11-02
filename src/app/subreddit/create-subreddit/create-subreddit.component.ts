import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SubredditModel } from '../subreddit-response';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css']
})
export class CreateSubredditComponent implements OnInit {

  createSubredditForm: FormGroup;
  subredditModel: SubredditModel;

  constructor() { 
    this.createSubredditForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.subredditModel = {
      name: '',
      description: ''
    }
  }

  ngOnInit() {}

  createSubreddit(): void {
    
  }

}
