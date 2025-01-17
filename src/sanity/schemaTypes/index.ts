import { type SchemaTypeDefinition } from 'sanity'

import postType from './postType';
import service from './service';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, service],
}
