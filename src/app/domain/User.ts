import { Credential } from './Credential';

export class User {
    id: number;
    name: string;
    email?: string;
    credential?: Credential;
}
