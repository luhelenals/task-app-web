import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dtos/signup.dto';
import { SignInDto } from './dtos/signin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    /* cadastro de novo usuário */
    async signUp(signUpDto: SignUpDto): Promise<{ message: string }> {
        const { email, password } = signUpDto;

        // verifica se o usuário existe
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
            throw new ConflictException('Um usuário com este email já existe.');
        }

        // criptografa a senha
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // cria e salva novo usuário
        await this.usersService.create({
            email,
            password: hashedPassword,
        });

        return { message: 'Usuário cadastrado com sucesso!' };
    }

    /* login de um usuário e retorna um token JWT */
    async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
        const { email, password } = signInDto;

        // busca o usuário pelo email
        const user = await this.usersService.findByEmailWithPassword(email);
        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas.');
        }

        // valida a senha no banco
        const isPasswordMatching = await bcrypt.compare(password, user.password);
        if (!isPasswordMatching) {
            throw new UnauthorizedException('Credenciais inválidas.');
        }

        // gera token JWT
        const payload = { sub: user.id, email: user.email };
        const accessToken = await this.jwtService.signAsync(payload);

        return {
            access_token: accessToken,
        };
    }
}