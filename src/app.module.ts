import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { GoogleStrategy } from './infrastructure/config/google.stategy';
import { GitAutheticationController } from './infrastructure/controllers/github-authetication.controller';
import { GoogleAutheticationController } from './infrastructure/controllers/google-authetication.controller';
import { VehiclesController } from './infrastructure/controllers/vehicle.controller';
import { UserUseCasesModule } from './uses-cases/user/user-use-cases.module';
import { VehicleUseCasesModule } from './uses-cases/vehicle/vehicle-use-cases.module';
import { AuthUseCasesModule } from './uses-cases/auth/auth-use-cases.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'pedramoura', //it is a secret used to communicate between the services - hardcoded are not recommended
    }),
    AuthUseCasesModule,
    UserUseCasesModule,
    VehicleUseCasesModule
  ],
  controllers: [
    AppController,
    VehiclesController,
    GoogleAutheticationController,
    GitAutheticationController
  ],
  providers: [GoogleStrategy],
})
export class AppModule {}
