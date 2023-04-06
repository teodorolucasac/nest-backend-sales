import { CacheModule as CacheModuleNest, Module } from '@nestjs/common';
import { CacheService } from './cache.service';

@Module({
  imports: [
    CacheModuleNest.register({
      ttl: 1000 * 60 * 60 * 2,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
