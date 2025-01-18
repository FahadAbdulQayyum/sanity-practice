import { type SchemaTypeDefinition } from 'sanity'

import postType from './postType';
import service from './service';
import location from './location';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, service, location],
}
