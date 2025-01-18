import { type SchemaTypeDefinition } from 'sanity'

import postType from './postType';
import service from './service';
import location from './location';
import agent from './agent';
import job from './job';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, service, location, agent, job],
}
