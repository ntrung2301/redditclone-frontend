import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { CommentPayload } from 'src/app/shared/comment.payload';
import { CommentService } from 'src/app/shared/comment.service';
import { PostModel } from 'src/app/shared/post.model';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  
  postId: number;
  post: PostModel;
  commentForm: FormGroup;
  comment: CommentPayload;
  comments: CommentPayload[];

  constructor(private postService: PostService, private activateRoute: ActivatedRoute, private commentService: CommentService) {
    this.postId = this.activateRoute.snapshot.params.id;
    this.postService.getPost(this.postId).subscribe((data) => {
      this.post = data; 
    }, error => {
      throwError(error);
    });

    this.commentForm = new FormGroup ({
      text: new FormControl('', Validators.required)
    });

    this.comment = {
      text: '',
      postId: this.postId
    };
   }
   
  ngOnInit() { 
    this.getPostById();
    this.getCommentsByPost();
  }

  submitComment() {
    this.comment.text = this.commentForm.get('text').value;

    this.commentService.postComment(this.comment).subscribe((data) => {
      this.commentForm.get('text').setValue('');
      this.getCommentsByPost();
      this.comments = data;
    }, error => {
      throwError(error);
    })
  }

  private getPostById() {
    this.postService.getPost(this.postId).subscribe((data) => {
      this.post = data;
    }, error => {
      throwError(error);
    })
  }

  private getCommentsByPost() {
    this.commentService.getAllCommentsByPost(this.postId).subscribe((data) => {
      this.comments = data;
    }, error => {
      throwError(error);
    })
  }

}
