import { Controller, Get, UseGuards, Res, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export default class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    // initiates the Google OAuth2 login flow
  }
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res) {
    // handles the Google OAuth2 callback
    const jwt = req.user.jwt;
    if (jwt) res.redirect(`http://localhost:3000?jwt=${jwt}`);
    else res.redirect(`http://localhost:3000?error=login_failed`);
  }
}
