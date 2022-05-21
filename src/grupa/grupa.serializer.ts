import { Serializer } from 'jsonapi-serializer';

export const GrupaSerializer = new Serializer('group', {
  id: 'idgrupa',
  attributes: ['naziv', 'datumosnivanja', 'djeca']
});
