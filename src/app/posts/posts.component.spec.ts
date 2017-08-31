import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import {
  NgReduxTestingModule,
  MockNgRedux
} from '@angular-redux/store/testing';
import { Subscription, Observable, Subject } from 'rxjs';

import { PostsActions } from './backend/posts.actions';
import { PostsComponent } from './posts.component';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { fromJS, List, Record } from 'immutable';

@Injectable()
class FakePostActions {
  protected fetchAll() {
    return {
      type: 'POSTS_READ',
      payload: Observable.from([
        { id: 1, title: 'foo', body: 'bar', userId: 42 }
      ])
    };
  }

  protected setCurrentEntity(id: number) {
    return {
      type: 'POSTS_READ_ONE',
      payload: id
    };
  }
}

describe('PostsComponent', () => {
  let subject: PostsComponent;
  let posts$: Observable<List<any>>;
  let actions: PostsActions;
  const paramsSubject: Subject<any> = new Subject();

  beforeEach(() => {
    TestBed.resetTestingModule();
    MockNgRedux.reset();

    TestBed.configureTestingModule({
      imports: [CommonModule, NgReduxTestingModule],
      providers: [
        { provide: PostsActions, useClass: FakePostActions },
        { provide: ActivatedRoute, useValue: { params: paramsSubject } }
      ]
    });
  });

  beforeEach(() => {
    const postsActions = TestBed.get(PostsActions);
    const activatedRoute = TestBed.get(ActivatedRoute);
    subject = new PostsComponent(postsActions, activatedRoute);
    posts$ = subject.posts$ as Observable<List<any>>;
    actions = postsActions;

    spyOn(actions, 'fetchAll');
    spyOn(actions, 'setCurrentEntity');
    subject.ngOnInit();
  });

  describe('the page', () => {
    it('calls fetchAll()', () => {
      expect(actions.fetchAll).toHaveBeenCalledTimes(1);
    });

    it('loads posts', () => {
      let posts: List<any>;

      posts$.subscribe(data => {
        posts = data;
        expect(List.isList(posts)).toBeTruthy();
        expect(posts.size).toEqual(1);
        expect(Record.getDescriptiveName(posts.first())).toEqual('Post');
      });
    });

    describe('on route change', () => {
      beforeEach(() => {
        paramsSubject.next({ id: 5 });
      });

      it('calls setCurrentEntity with the params id', () => {
        expect(actions.setCurrentEntity).toHaveBeenCalledWith(5);
      });
    });
  });
});
