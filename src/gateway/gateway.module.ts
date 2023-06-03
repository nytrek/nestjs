import { Module } from '@nestjs/common';
import { myGateWay } from './gateway';

@Module({
  providers: [myGateWay],
})
export class GatewayModule {}
