import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowDown, faArrowUp, faComments, faEllipsisH} from '@fortawesome/free-solid-svg-icons';
import { PostModel } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {

  // $ defines the variable is an Observable 
  @Input() posts: PostModel[];
  faComments = faComments;
  faEllipsish = faEllipsisH;
  
  constructor( private router: Router) { 
  }

  ngOnInit(): void {
  }

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id)
  }

}
