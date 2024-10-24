import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { PrismaService } from './prisma/prisma.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    })
    ,UsersModule, AuthModule, TasksModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, PrismaService],
})
export class AppModule {}
