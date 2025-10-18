import { Controller, Put, Delete, Param, Body, UseGuards, Req, ForbiddenException, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':email')
    async getUser(@Param('email') email: string) {
        return this.usersService.findByEmail(email);
    }

    @Put(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() updateUserDto: any,
        @Req() req: Request
    ) {
        const userId = parseInt(id, 10);
        if (req.user && (req.user as any).id !== userId) {
            throw new ForbiddenException('Você só pode editar seu próprio usuário.');
        }
        return this.usersService.update(userId, updateUserDto);
    }

    @Delete(':id')
    async deleteUser(
        @Param('id') id: string,
        @Req() req: Request
    ) {
        const userId = parseInt(id, 10);
        if (req.user && (req.user as any).id !== userId) {
            throw new ForbiddenException('Você só pode deletar seu próprio usuário.');
        }
        return this.usersService.delete(userId);
    }
}
