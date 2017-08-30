import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '@dcs/ngx-utils';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import { PostsActions } from './backend/posts.actions';
import { Post } from './backend/posts.model';
import { postsSelector, postsLoadingSelector } from './backend/posts.selectors';
import { List } from 'immutable';

@Component({
  selector: 'dcs-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent extends ContainerComponent implements OnInit {
  @select(postsSelector) public posts$: Observable<List<Post>>;
  @select(postsLoadingSelector) public loading$: Observable<boolean>;

  constructor(private postsActions: PostsActions) {
    super();
  }

  public ngOnInit(): void {
    this.postsActions.fetchAll();
  }
}
