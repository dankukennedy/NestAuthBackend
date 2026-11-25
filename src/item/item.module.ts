import { Module } from '@nestjs/common';
import { ItemService } from './item.service.js';
import { ItemController } from './item.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './schemas/item-schema.js';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Item.name,
      schema: ItemSchema
    }
  ])
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
