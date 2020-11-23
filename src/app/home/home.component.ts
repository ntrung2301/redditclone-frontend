import { Component, OnInit } from '@angular/core';
import { PostModel } from '../shared/post.model';
import { PostService } from '../shared/post.service';
import { faArrowUp, faArrowDown, faComments } from '@fortawesome/free-solid-svg-icons';
import { throwError } from 'rxjs';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: PostModel[];

  constructor(private postService: PostService) {
    this.postService.getAllPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  ngOnInit(): void {
  }

}
