import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class UserFactoryService {
  
  createNewUserByPlatformType(type: String, obj: any) {
    if (type === 'GOOGLE') {
        return this.createNewUserByGoogle(obj);
      } else {
        return obj;
      }
  }

  createNewUserByGoogle(obj: any) {
    const user = new User();
    user.platformId = obj.id;
    user.platformType = "GOOGLE";
    user.login = obj.email;
    user.name = obj.firstName;
    if (obj.lastName) {
        user.name += (' ' + obj.lastName); 
    }
    user.avatarUrl = obj.picture;
    return user;
  }

}