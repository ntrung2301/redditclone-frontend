import { Component, Input, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { throwError } from 'rxjs';
import { PostModel } from '../post.model';
import { PostService } from '../post.service';
import { VoteType } from '../vote-type';
import { VotePayload } from '../vote.payload';
import { VoteService } from '../vote.service';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {
  
  @Input() post: PostModel;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  votePayload: VotePayload;

  constructor(private voteService: VoteService, private postService: PostService) {
    this.votePayload = {
      voteType: undefined,
      postId: undefined
    };
   }

  ngOnInit(): void {}

  upvotePost(): void {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.postVote();
  }

  downvotePost(): void {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.postVote();
  }

  private postVote() {
    this.votePayload.postId = this.post.id;
    this.voteService.submitVote(this.votePayload).subscribe(() => {
      this.updatePost();
    }, error => {
      throwError(error);
    });
  }

  private updatePost() {
    this.postService.getPost(this.post.id).subscribe((post) => {
      console.log(post);
      this.post = post;
      console.log(this.post);
    });
  }
}
