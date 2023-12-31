import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ModeModule } from './modules/mode/mode.module';
import { OptModule } from './modules/opt/opt.module';
import { ChanelModule } from './modules/chanel/chanel.module';
import { FileModule } from './modules/file/file.module';
import { RecommendationModule } from './modules/recommendation/recommendation.module';

@Module({
  imports: [UserModule, ModeModule, OptModule, ChanelModule, RecommendationModule, FileModule],
})
export class AppModule {}
