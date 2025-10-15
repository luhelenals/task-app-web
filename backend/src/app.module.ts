import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './core/database/database.module';
import { PrismaModule } from './prisma/prisma.module';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [UsersModule, AuthModule, TasksModule, DatabaseModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
