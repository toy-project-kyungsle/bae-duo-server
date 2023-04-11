import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: 'CLIENT_ID', // CLIENT_ID
      clientSecret: 'SECRET', // CLIENT_SECRET
      callbackURL: 'http://localhost:3000/auth/google/callback',
      //passReqToCallback: true,
      scope: ['email', 'profile'],
    });
  }
  // @nestjs/passport PassportStrategy를 상속
  // passport-google-oauth20 Strategy 사용
  // Strategy의 이름은 'google'로 지정
  // validate 함수 내에서, 성공적인 google 로그인에 대한 유효성 검증
  // google에서 보내주는 'profile' 정보만 로그로 기록

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { id, name, emails, photos } = profile;

    const user = {
      provider: 'google',
      providerId: id, // session에서 user.id를 빼려면, providerId가 아닌 id로 설정해주자.
      firstName: name.givenName, // 혹은 name: name.givenName으로만 받자.
      lastName: name.familyName,
      email: emails[0].value,
      picture: photos[0].value,
      accessToken,
      refreshToken,
    };
    return done(null, user);
  }
}
