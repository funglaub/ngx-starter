import { Component, Input } from '@angular/core';
import { Post } from '../backend/posts.model';

@Component({
  selector: 'dcs-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent {
  @Input() public post: Post;
}
