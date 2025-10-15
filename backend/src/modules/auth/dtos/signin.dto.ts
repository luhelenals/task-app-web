import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class SignInDto {
    @IsEmail({}, { message: 'Por favor, informe um email válido.' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
    password: string;
}