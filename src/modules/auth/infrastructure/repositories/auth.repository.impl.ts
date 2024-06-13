
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../domain/entities';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { UserDocument } from '../schemas/user.schema';

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserDocument>
    ) {}

    private mapDocumentToEntity(userDocument: UserDocument): User {
        if (!userDocument) {
          return null;
        }
        const { username, password } = userDocument;
        return new User(username, password);
    }

    private mapEntityToDocument(user: User): UserDocument {
      const { ...rest } = user;
      return { ...rest } as UserDocument;
    }

    async findByUsername(username: string): Promise<User> {
      const userDocument = await this.userModel
      .findOne({ username })
      .exec();
      return this.mapDocumentToEntity(userDocument);
    }

    async create(user: User): Promise<User> {
        const userExists = await this.findByUsername(user.username);
        if (userExists) {
            throw new HttpException('user exits', HttpStatus.CONFLICT)
        }
        const newUserDocument = new this.userModel(this.mapEntityToDocument(user));
        const savedUserDocument = await newUserDocument.save();
        return this.mapDocumentToEntity(savedUserDocument);
    }
}   
