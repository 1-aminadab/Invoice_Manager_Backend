/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private prisma: PrismaService) {}

  async create(userData: any) {
    this.logger.log(`Creating user with data: ${JSON.stringify(userData)}`);
    try {
      const createdUser = await this.prisma.user.create({ data: userData });
      this.logger.log(`User created successfully with ID: ${createdUser.user_id}`);
      return createdUser;
    } catch (error) {
      this.logger.error('Error creating user', error.stack);
      throw new HttpException('Error creating user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    this.logger.log('Fetching all users');
    try {
      const users = await this.prisma.user.findMany();
      this.logger.log('Users fetched successfully');
      return users;
    } catch (error) {
      this.logger.error('Error fetching users', error.stack);
      throw new HttpException('Error fetching users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    this.logger.log(`Fetching user with ID: ${id}`);
    try {
      const user = await this.prisma.user.findUnique({ where: { user_id: id } });
      if (!user) {
        this.logger.warn(`User with ID: ${id} not found`);
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      this.logger.log(`User with ID: ${id} fetched successfully`);
      return user;
    } catch (error) {
      this.logger.error(`Error fetching user with ID: ${id}`, error.stack);
      throw new HttpException('Error fetching user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, userData: any) {
    this.logger.log(`Updating user with ID: ${id}, data: ${JSON.stringify(userData)}`);
    try {
      const user = await this.prisma.user.update({
        where: { user_id: id },
        data: userData,
      });
      this.logger.log(`User with ID: ${id} updated successfully`);
      return user;
    } catch (error) {
      this.logger.error(`Error updating user with ID: ${id}`, error.stack);
      if (error.code === 'P2025') {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Error updating user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    this.logger.log(`Deleting user with ID: ${id}`);
    try {
      const user = await this.prisma.user.delete({ where: { user_id: id } });
      this.logger.log(`User with ID: ${id} deleted successfully`);
      return user;
    } catch (error) {
      this.logger.error(`Error deleting user with ID: ${id}`, error.stack);
      if (error.code === 'P2025') {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException('Error deleting user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
