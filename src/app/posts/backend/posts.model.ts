import { Record } from 'immutable';

const defaultValues = {
  body: '',
  id: '',
  title: '',
  userId: ''
};

export class Post extends Record(defaultValues) {
  public body: string;
  public id: string;
  public title: string;
  public userId: string;
}
