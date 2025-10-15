import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignUpDto {
    @IsEmail({}, { message: 'Por favor, informe um email válido.' })
    email: string;

    @IsString()
    @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
    password: string;
}