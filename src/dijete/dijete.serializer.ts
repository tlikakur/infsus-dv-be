import { Serializer } from 'jsonapi-serializer';

export const DijeteSerializer = new Serializer('child', {
  id: 'iddijete',
  attributes: ['oib', 'ime', 'prezime' , 'datumrodenja']
});