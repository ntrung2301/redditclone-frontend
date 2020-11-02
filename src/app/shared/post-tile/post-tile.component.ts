import { Component, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp, faComments } from '@fortawesome/free-solid-svg-icons';
import { PostModel } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {

  // $ defines the variable is an Observable 
  posts$: Array<PostModel> = [];
  
  faComments = faComments;
  
  constructor(private postService: PostService) { 
    this.postService.getAllPosts().subscribe(post => {
      this.posts$ = post;
    });
  }

  ngOnInit(): void {
  }


}