import { User } from '../../entities';

export interface AuthRepository {
  findByUsername(username: string): Promise<User>;
  create(user: User): Promise<User>;
}
