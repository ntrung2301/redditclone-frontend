import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { PostModel } from 'src/app/shared/post.model';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  username: string;
  postLength: number;
  posts: PostModel[];

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService, private router: Router) {
    this.username = this.activatedRoute.snapshot.params.username;

    this.postService.getAllPostsByUser(this.username).subscribe((data) => {
      this.posts = data;
      this.postLength = data.length;
    }, (error) => {
      throwError(error);
    })
  }

  ngOnInit(): void {}

  goToCreatePost(): void {
    this.router.navigateByUrl('/create-post');
  }
}
