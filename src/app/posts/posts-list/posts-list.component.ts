import { Component, Input } from '@angular/core';
import { PresentationalComponent } from '@dcs/ngx-utils';
import { List } from 'immutable';
import { Post } from '../backend/posts.model';

@Component({
  selector: 'dcs-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent extends PresentationalComponent {
  @Input() public posts: List<Post>;
  @Input() public loading: boolean;
}
