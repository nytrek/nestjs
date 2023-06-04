import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignsController } from './controllers/signs/signs.controller';
import { SignsService } from './services/signs/signs.service';
import { Sign } from './signs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sign])],
  controllers: [SignsController],
  providers: [SignsService],
})
export class SignsModule {}
