import { Serializer } from 'jsonapi-serializer';

export const GrupaSerializer = new Serializer('group', {
  keyForAttribute: 'camelCase',
  id: 'id',
  attributes: ['naziv', 'datumOsnivanja' , 'djeca']
});