import { Query, Resolver } from '@nestjs/graphql';
import * as packageJson from '../../package.json';
import { Meta } from './meta.dto';

@Resolver(_of => Meta)
export class MetaResolver {
  @Query(_returns => Meta)
  async meta() {
    return {
      version: packageJson.version,
    };
  }
}
