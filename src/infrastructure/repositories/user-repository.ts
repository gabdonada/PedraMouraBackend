import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { GithubUserResponse } from "src/domain/entities/github-response.entity";
import { User } from "src/domain/entities/user.entity";
import { IUserRepository } from "src/domain/repositories/user-repository-abstract";
import { PrismaService } from "src/infrastructure/config/prisma.service";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
      private prisma: PrismaService,
      private jwt: JwtService,
      private configService: ConfigService){}

    async authenticate(code: string): Promise<string> {
      const accessTokenResponse = await axios.post(
        'https://github.com/login/oauth/access_token',
        null, //request body
        {//URL params
            params: {
                client_id: this.configService.get<string>('GITHUB_CLIENT_ID'),
                client_secret: this.configService.get<string>('GITHUB_CLIENT_SECRET'),
                code
            },
            //retun method desired
            headers:{
                Accept: 'application/json'
            }
        }
      );

      const { access_token } = accessTokenResponse.data;
      
      const userResponse = await axios.get('https://api.github.com/user', {
        headers:{
          Authorization: `Bearer ${access_token}`
        }
      });

      const userInfo = plainToClass(GithubUserResponse,userResponse.data)

      let user = await this.prisma.user.findUnique({
        where:{
          platformId: userInfo.id.toString(),
          platformType: 'GIT',
        }
      })

      if(!user){
        user = await this.prisma.user.create({
            data:{
              platformId: userInfo.id.toString(),
              platformType: 'GIT',
              name: (!userInfo.name ? userInfo.login : userInfo.name) ,
              avatarUrl: userInfo.avatar_url,
              login: userInfo.login,
            }
          })
      }

      const payload = {
        //user info that I want inside of the token (just public ones - it is not crypted)
        name: user.name,
        avatarUrl: user.avatarUrl
      }

      const token = this.jwt.sign(payload,{
          expiresIn: '30 days', 
          subject: user.id //secret is who owns this token.
      })

      return token;
    }

    async create(userInfo: User): Promise<User> {
      const user = await this.prisma.user.create({
          data:{
            platformId: userInfo.platformId,
            platformType: userInfo.platformType,
            name: userInfo.name,
            avatarUrl: userInfo.avatarUrl,
            login: userInfo.login,
          }
      });
      return user;
    }

    async findUnique(userInfo: User): Promise<User> {
      const user = await this.prisma.user.findUnique({
        where:{
          platformId: userInfo.platformId,
          platformType: userInfo.platformType
        }
      })
      return user;
    }

}