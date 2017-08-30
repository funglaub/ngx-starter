import { createSelector } from 'reselect/lib';
import { IState } from '@dcs/ngx-utils';
import { List, Map } from 'immutable';
import { Post } from './posts.model';

function rawPostsSelector(state: IState): List<Map<string, any>> {
  return state.getIn(['posts', 'entities']);
}

export function postsLoadingSelector(state: IState): boolean {
  return state.getIn(['posts', 'loading']);
}

export const postsSelector = createSelector(
  [rawPostsSelector],
  (posts: List<Map<string, any>>) => {
    return posts.map((post: Map<string, any>) => {
      return new Post(post);
    });
  }
);
