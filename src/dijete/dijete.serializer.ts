import { Serializer } from 'jsonapi-serializer';

export const DijeteSerializer = new Serializer('children', {
  keyForAttribute: 'camelCase',
  id: 'iddijete',
  attributes: ['oib', 'ime', 'prezime' , 'datumrodenja']
});