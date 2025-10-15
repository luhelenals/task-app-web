import { TaskStatus } from "src/core/database/entities/task.entity";

export class TaskDto {
    titulo: string;
    descricao?: string;
    status?: TaskStatus;
    data_conclusao?: Date | null;
}