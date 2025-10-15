import { Controller, UseGuards, Body, Delete, Get, Param, Put, Post, Req, ForbiddenException, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './dtos/task.dto';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    async findAll(@Req() req: Request) {
        const user = req.user as any;
        return this.tasksService.findAllByUserId(user.id);
    }

    @Get(':id')
    async findOne(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: Request
    ) {
        const user = req.user as any;
        const task = await this.tasksService.findById(id);
        if (!task || task.ownerId !== user.id) {
            throw new ForbiddenException('Acesso negado à tarefa.');
        }
        return task;
    }

    @Post()
    async create(@Body() taskDto: TaskDto, @Req() req: Request) {
        const user = req.user as any;
        return this.tasksService.create({
            titulo: taskDto.titulo,
            descricao: taskDto.descricao,
            status: taskDto.status,
            data_conclusao: taskDto.data_conclusao,
            owner: { connect: { id: user.id } },
        });
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() taskDto: TaskDto,
        @Req() req: Request
    ) {
        const user = req.user as any;
        const task = await this.tasksService.findById(id);
        if (!task || task.ownerId !== user.id) {
            throw new ForbiddenException('Acesso negado à tarefa.');
        }
        return this.tasksService.update(id, taskDto);
    }

    @Delete(':id')
    async delete(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: Request
    ) {
        const user = req.user as any;
        const task = await this.tasksService.findById(id);
        if (!task || task.ownerId !== user.id) {
            throw new ForbiddenException('Acesso negado à tarefa.');
        }
        return this.tasksService.delete(id);
    }
}