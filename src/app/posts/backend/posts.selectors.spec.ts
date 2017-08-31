import { IState } from '@dcs/ngx-utils';
import { Record, fromJS, List } from 'immutable';
import { postsSelector, currentPostSelector } from './posts.selectors';
import { Post } from './posts.model';

describe('postsSelectors', () => {
  const state: IState = fromJS({
    posts: {
      entities: [{ id: 1, title: 'foo', body: 'bar', userId: 1 }],
      currentEntityId: 1
    }
  });

  describe('postsSelector', () => {
    const subject = postsSelector(state);

    it('returns a list', () => {
      expect(List.isList(subject)).toBeTruthy;
    });

    it('returns a list of post models', () => {
      expect(Record.getDescriptiveName((subject as List<any>).first())).toBe(
        'Post'
      );
    });

    it('has size 1', () => {
      expect((subject as any).size).toBe(1);
    });
  });

  describe('currentPostSelector', () => {
    const subject = <Post>currentPostSelector(state);

    it('returns a Post model', () => {
      expect(Record.getDescriptiveName(subject)).toBe('Post');
    });

    it('returns the post with id 1', () => {
      expect(`${subject.id}`).toEqual('1');
    });
  });
});
