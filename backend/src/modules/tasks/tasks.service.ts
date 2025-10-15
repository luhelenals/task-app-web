import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TasksService {
    constructor(private readonly prisma: PrismaService) {}

    async findAllByUserId(userId: number) {
        return this.prisma.task.findMany({
            where: { ownerId: userId },
        });
    }

    async findById(id: number) {
        return this.prisma.task.findUnique({
            where: { id },
        });
    }

    async create(data: Prisma.TaskCreateInput) {
        return this.prisma.task.create({
            data,
        });
    }

    async update(id: number, data: Prisma.TaskUpdateInput) {
        return this.prisma.task.update({
            where: { id },
            data,
        });
    }

    async delete(id: number) {
        return this.prisma.task.delete({
            where: { id },
        });
    }

}
