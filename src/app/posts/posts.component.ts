import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '@dcs/ngx-utils';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import { ActivatedRoute } from '@angular/router';

import { PostsActions } from './backend/posts.actions';
import { Post } from './backend/posts.model';
import {
  postsSelector,
  postsLoadingSelector,
  currentPostSelector
} from './backend/posts.selectors';
import { List } from 'immutable';

@Component({
  selector: 'dcs-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent extends ContainerComponent implements OnInit {
  @select(postsSelector) public posts$: Observable<List<Post>>;
  @select(currentPostSelector) public currentPost$: Observable<Post>;
  @select(postsLoadingSelector) public loading$: Observable<boolean>;

  constructor(
    private postsActions: PostsActions,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  public ngOnInit(): void {
    this.subscribeToObservable(
      this.activatedRoute.params,
      this.onChildParamsChange
    );
    this.postsActions.fetchAll();
  }

  private onChildParamsChange(params: { id: string }) {
    this.postsActions.setCurrentEntity(params.id);
  }
}
