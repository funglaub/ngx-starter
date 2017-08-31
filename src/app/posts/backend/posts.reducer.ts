import { IState, IAction } from '@dcs/ngx-utils';
import { actionNames } from './posts.actions';
import { fromJS, Map } from 'immutable';

const initialState: IState = fromJS({
  entities: [],
  currentEntityId: {},
  loading: false,
  error: null
});

export const postsReducer = function(
  state: IState = initialState,
  action: IAction
): IState {
  switch (action.type) {
    case actionNames.readStart:
      return state.set('loading', true);

    case actionNames.readError:
      return state.merge(
        fromJS({
          loading: false,
          error: action.payload
        })
      );

    case actionNames.readNext:
      return state.merge(
        fromJS({
          loading: false,
          error: null,
          entities: action.payload
        })
      );

    case actionNames.readOne:
      return state.set('currentEntityId', action.payload);
  }

  return state;
};
