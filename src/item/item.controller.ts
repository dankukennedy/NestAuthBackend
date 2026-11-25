import { Controller, Get, Post, Body, Patch, Param,
  Delete, Req, UseGuards, Ip,
  Logger, } from '@nestjs/common';
import { ItemService } from './item.service.js';
import { CreateItemDto } from './dto/create-item.dto.js';
import { UpdateItemDto } from './dto/update-item.dto.js';
import { AuthGuard } from '../guards/auth.guard.js';

@UseGuards(AuthGuard)
@Controller('item')
export class ItemController {
  constructor(
    private readonly itemService: ItemService) {}

  // @Get()
  // someProtectedRoute(@Req() req:any) {
  //   return { message: 'Accessed Resource', userId: req.userId};
  // }

  // @Post()
  // async create(@Req() req: any, @Ip() ip: string, @Body(ValidationPipe) createItemDto: CreateItemDto) {
  //   Logger.log(`userId: ${req.userId} ip: ${ip}`)
  //   return this.itemService.create(createItemDto);
  // }


  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @Get()
  async findAll() {
    return this.itemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.itemService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(id, updateItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.itemService.remove(id);
  }
}
