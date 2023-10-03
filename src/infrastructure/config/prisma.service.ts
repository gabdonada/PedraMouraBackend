import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  
  async onModuleInit() {
    await this.$connect();
  }

    //Used to shutdown prisma connection when DH connection is down
    // async enableShutdownHooks(app: INestApplication) {
    //     this.$on('beforeExit', async () => {
    //         await app.close();
    //     });
    // }
}
