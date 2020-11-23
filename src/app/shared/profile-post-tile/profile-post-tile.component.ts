import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faComments, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { throwError } from 'rxjs';
import { CommentPayload } from '../comment.payload';
import { CommentService } from '../comment.service';
import { PostModel } from '../post.model';

@Component({
  selector: 'app-profile-post-tile',
  templateUrl: './profile-post-tile.component.html',
  styleUrls: ['./profile-post-tile.component.css']
})
export class ProfilePostTileComponent implements OnInit {

  @Input()
  posts: PostModel[];
  comments: CommentPayload[];
  faComments = faComments;
  faEllipsish = faEllipsisH;
  username: string;
  
  constructor( private router: Router, private commentService: CommentService, private activatedRoute: ActivatedRoute) {
    this.username = this.activatedRoute.snapshot.params.username;
    this.commentService.getAllCommentsByUser(this.username).subscribe((data) => {
      this.comments = data;
    }, (error) => {
      throwError(error);
    }) 
  }

  ngOnInit(): void {
  }

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id)
  }
  
}
