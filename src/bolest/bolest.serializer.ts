import { Serializer } from 'jsonapi-serializer';

export const BolestSerializer = new Serializer('disease', {
  id: 'idbolest',
  attributes: ['naziv']
});
