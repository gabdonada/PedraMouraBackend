import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { UserController } from './infrastructure/controllers/user.controller';
import { VehiclesController } from './infrastructure/controllers/vehicle.controller';
import { UserUseCasesModule } from './uses-cases/user/user-use-cases.module';
import { VehicleUseCasesModule } from './uses-cases/vehicle/vehicle-use-cases.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'pedramoura', //it is a secret used to communicate between the services - hardcoded are not recommended
    }),
    VehicleUseCasesModule,
    UserUseCasesModule
  ],
  controllers: [
    AppController, 
    UserController,
    VehiclesController
  ],
  providers: [],
})
export class AppModule {}
