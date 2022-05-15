import { Serializer } from 'jsonapi-serializer';

export const GrupaSerializer = new Serializer('group', {
  id: 'id',
  attributes: ['naziv', 'datumosnivanja' , 'djeca']
});