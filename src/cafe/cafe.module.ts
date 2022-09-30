import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CafeEntity } from './cafe.entity';
import { CafeService } from './cafe.service';


@Module({
  providers: [CafeService],
  imports: [TypeOrmModule.forFeature([CafeEntity])],
})
export class CafeModule {}
