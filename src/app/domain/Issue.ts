import { CommentInfo } from './Comment';
import { User } from './User';

export class Issue {
    id: number;
    label: string;
    description: string;
    assignedTo: User;
    created: Date;
    comments?: CommentInfo[];
}
