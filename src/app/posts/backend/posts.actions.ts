import { Injectable } from '@angular/core';
import { dispatch, NgRedux } from '@angular-redux/store';
import {
  IAction,
  generateEntityActionNames,
  RestService,
  buildSchemaValidator
} from '@dcs/ngx-utils';
import { IState } from '@dcs/ngx-utils';

// Fixes typescript errors 'Return type of exported function has or is using name X
// from external module Y but cannot be named' from buildSchemaValidator()
import * as Ajv from 'ajv';

export const actionNames = generateEntityActionNames('posts');

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const postJsonSchema = {
  title: 'Post',
  type: 'object',
  properties: {
    id: { type: 'number' },
    userId: { type: 'number' },
    title: { type: 'string' },
    body: { type: 'string' }
  },
  required: ['id', 'userId', 'title', 'body']
};

export const postsValidator = buildSchemaValidator({
  title: 'Posts Array',
  type: 'array',
  items: postJsonSchema
});

@Injectable()
export class PostsActions {
  constructor(private http: RestService, private store: NgRedux<IState>) {}

  @dispatch()
  public fetchAll(): IAction {
    return {
      type: actionNames.read,
      payload: this.http.get(`${BASE_URL}/posts?_limit=10`)
    };
  }

  @dispatch()
  public setCurrentEntity(id: string | number): IAction {
    return {
      type: actionNames.readOne,
      payload: +id
    };
  }
}
