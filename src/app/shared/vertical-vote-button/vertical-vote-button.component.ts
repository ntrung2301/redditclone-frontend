import { Component, Input, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { throwError } from 'rxjs';
import { PostModel } from '../post.model';
import { PostService } from '../post.service';
import { VoteType } from '../vote-type';
import { VotePayload } from '../vote.payload';
import { VoteService } from '../vote.service';

@Component({
  selector: 'app-vertical-vote-button',
  templateUrl: './vertical-vote-button.component.html',
  styleUrls: ['./vertical-vote-button.component.css']
})
export class VerticalVoteButtonComponent implements OnInit {

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

  ngOnInit(): void {
  }

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
    this.voteService.submitVote(this.votePayload).subscribe((data) => {
      this.postService.getPost(this.post.id).subscribe((post) => {
        this.post = post;
      }, error => {
        throwError(error);
      })
    }, error => {
      throwError(error);
    })
  }
}
