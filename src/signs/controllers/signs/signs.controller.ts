import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateSignDto } from '../../dtos/CreateSign.dto';
import { SignsService } from '../../services/signs/signs.service';

@Controller('signs')
export class SignsController {
  /**
   * We consume services through the class constructor
   * @param signService
   */
  constructor(private signService: SignsService) {}

  @Get()
  getSigns() {
    return this.signService.getSigns();
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createSign(@Body() createSignDto: CreateSignDto) {
    return this.signService.createSign(createSignDto);
  }

  @Delete('delete/:id')
  deleteSign(@Param('id') id: number) {
    return this.signService.deleteSign(id);
  }
}
