import { Module } from '@nestjs/common';
import { MetaResolver } from './meta.resolver';

@Module({
  providers: [MetaResolver],
})
export class MetaModule {}
