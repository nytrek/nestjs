import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateSignDto } from '../../../signs/dtos/CreateSign.dto';
import { Sign } from '../../../signs/signs.entity';

@Injectable()
export class SignsService {
  constructor(
    @InjectRepository(Sign) private readonly signRepository: Repository<Sign>,
  ) {}

  getSigns(): Promise<Sign[]> {
    return this.signRepository.find({
      order: {
        createdAt: 'desc',
      },
    });
  }

  createSign(createSignDto: CreateSignDto): Promise<Sign> {
    return this.signRepository.save({
      ...createSignDto,
      createdAt: new Date(),
    });
  }

  deleteSign(signId: number): Promise<DeleteResult> {
    return this.signRepository.delete(signId);
  }
}
