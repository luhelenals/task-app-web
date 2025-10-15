import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/signup.dto';
import { SignInDto } from './dtos/signin.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    /**
     * Rota para cadastro de novos usuários
     * URL: POST /auth/signup
     */
    @Post('signup')
    signUp(@Body() signUpDto: SignUpDto): Promise<{ message: string }> {
        return this.authService.signUp(signUpDto);
    }

    /**
     * Rota para login de usuários existentes
     * URL: POST /auth/signin
     */
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signIn(@Body() signInDto: SignInDto): Promise<{ access_token: string }> {
        return this.authService.signIn(signInDto);
    }
}