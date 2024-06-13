import { Controller, Post, Get, Body, Param, UseGuards, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto';
import { JwtAuthGuard } from '../../../auth/infrastructure';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import {
  File,
  randomName,
  deleteFile,
} from '../../commons';
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: File.directoryToSave,  
        filename: (_, file, cb) => cb(null, `${randomName()}${extname(file.originalname)}`),
      }),
      limits: {
        fileSize:File.maxSizeAllowed,  
      },
      fileFilter: (_, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          cb(new HttpException('Only image files are allowed!', HttpStatus.BAD_REQUEST), false);
        } else {
          cb(null, true);
        }
      },
    }),
  )
  async create(@Body() body: Record<string, any>, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('Picture is required', HttpStatus.BAD_REQUEST);
    }
    const picturePath = file.path;

    const createProductDto = plainToClass(CreateProductDto, { ...body, price: +body.price, picture: picturePath });
    const errors = await validate(createProductDto);

    if (errors.length > 0) {
      await deleteFile(picturePath); 
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }
    try {
      const response = await this.productService.create(createProductDto, picturePath);      
      return response;
    } catch (error) {
      await deleteFile(file.path); 
      throw error;
    }
  }

  @Get(':sku')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('sku') sku: string) {
    return this.productService.findOne(sku);
  }

}

