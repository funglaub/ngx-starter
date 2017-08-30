import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { PostsComponent } from './posts.component';
import { PostsActions } from './backend/posts.actions';
import { APP_REDUCERS } from '@dcs/ngx-utils';
import { postsReducer } from './backend/posts.reducer';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent
  }
];

@NgModule({
  declarations: [PostsComponent, PostsListComponent, PostDetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes), TranslateModule],
  providers: [
    PostsActions,
    {
      provide: APP_REDUCERS,
      useValue: { name: 'posts', reducer: postsReducer },
      multi: true
    }
  ]
})
export class PostsModule {}
