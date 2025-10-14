import { User } from '../users/users.entity';
import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn,
    ManyToOne 
} from 'typeorm';

// Status possíveis para uma tarefa
export enum TaskStatus {
    PENDENTE = 'PENDENTE',
    EM_ANDAMENTO = 'EM_ANDAMENTO',
    CONCLUIDA = 'CONCLUIDA',
}

@Entity({ name: 'tasks' })
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column({ nullable: true })
    descricao: string;

    @Column({
        type: 'enum',
        enum: TaskStatus,
        default: TaskStatus.PENDENTE,
    })
    status: TaskStatus;

    @CreateDateColumn() // cria data automaticamente
    data_criacao: Date;

    @Column({ type: 'datetime', nullable: true }) // A data de conclusão pode ser nula
    data_conclusao: Date | null;

    // --- Relacionamento ---
    // muitas tarefas -> um usuário
    @ManyToOne(() => User, (user) => user.tasks, { eager: false })
    owner: User;

    @Column()
    ownerId: number;
}