import { Task } from './task.entity';
import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    OneToMany 
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    // --- Relacionamento ---
    // um user -> muitas tarefas
    @OneToMany(() => Task, (task) => task.owner, { cascade: true })
    tasks: Task[];
}