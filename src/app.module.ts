import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GoogleStrategy } from './infrastructure/config/google.stategy';
import { GitAutheticationController } from './infrastructure/controllers/github-authetication.controller';
import { GoogleAutheticationController } from './infrastructure/controllers/google-authetication.controller';
import { MaintenanceController } from './infrastructure/controllers/maintenance.controller';
import { VehiclesController } from './infrastructure/controllers/vehicle.controller';
import { AuthUseCasesModule } from './uses-cases/auth/auth-use-cases.module';
import { UserUseCasesModule } from './uses-cases/user/user-use-cases.module';
import { VehicleUseCasesModule } from './uses-cases/vehicle/vehicle-use-cases.module';
import { MaintenanceUseCasesModule } from './uses-cases/maintenance/maintenance-use-cases.module';


@Module({
  imports: [
    AuthUseCasesModule,
    UserUseCasesModule,
    VehicleUseCasesModule,
    MaintenanceUseCasesModule
  ],
  controllers: [
    AppController,
    VehiclesController,
    GoogleAutheticationController,
    GitAutheticationController,
    MaintenanceController
  ],
  providers: [
    GoogleStrategy
  ]
})
export class AppModule {}
