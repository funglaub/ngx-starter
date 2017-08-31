import { IState } from '@dcs/ngx-utils';
import { postsReducer } from './posts.reducer';
import { List, Map } from 'immutable';

describe('postsReducer', () => {
  const subect = postsReducer;

  describe('initial state', () => {
    const nextState: IState = postsReducer(undefined, { type: 'Foo' });

    it('sets loading to false', () => {
      expect(nextState.get('loading')).toBe(false);
    });

    it('sets error to null', () => {
      expect(nextState.get('error')).toBe(null);
    });

    it('sets entities to an empty List', () => {
      expect(nextState.get('entities').size).toBe(0);
      expect(List.isList(nextState.get('entities'))).toBe(true);
    });

    it('sets currentEntityId to an empty Map', () => {
      expect(nextState.get('currentEntityId').size).toBe(0);
      expect(Map.isMap(nextState.get('currentEntityId'))).toBe(true);
    });
  });

  describe('POSTS_READ_START', () => {
    const nextState: IState = postsReducer(undefined, {
      type: 'POSTS_READ_START'
    });

    it('sets loading to true', () => {
      expect(nextState.get('loading')).toBe(true);
    });
  });

  describe('POSTS_READ_NEXT', () => {
    const nextState: IState = postsReducer(undefined, {
      type: 'POSTS_READ_NEXT',
      payload: [{ id: 1, title: 'foo', body: 'bar', userId: 42 }]
    });

    it('sets loading to false', () => {
      expect(nextState.get('loading')).toBe(false);
    });

    it('sets currentEntityId to an empty Map', () => {
      expect(nextState.get('currentEntityId').size).toBe(0);
      expect(Map.isMap(nextState.get('currentEntityId'))).toBe(true);
    });

    it('sets entities to a List with size 1', () => {
      expect(nextState.get('entities').size).toBe(1);
      expect(List.isList(nextState.get('entities'))).toBe(true);
    });
  });

  describe('POSTS_READ_ERROR', () => {
    const nextState: IState = postsReducer(undefined, {
      type: 'POSTS_READ_ERROR',
      payload: 'Server broken beyond repair'
    });

    it('sets loading to false', () => {
      expect(nextState.get('loading')).toBe(false);
    });

    it('sets error to action payload', () => {
      expect(nextState.get('error')).toBe('Server broken beyond repair');
    });
  });

  describe('POSTS_READ_ONE', () => {
    const nextState: IState = postsReducer(undefined, {
      type: 'POSTS_READ_ONE',
      payload: 3
    });

    it('sets currentEntityId to the action payload', () => {
      expect(nextState.get('currentEntityId')).toBe(3);
    });
  });
});
