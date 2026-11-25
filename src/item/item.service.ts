import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto.js';
import { UpdateItemDto } from './dto/update-item.dto.js';
import { Item } from './schemas/item-schema.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name) private readonly ItemModal: Model<Item>,
  ){}


  async create(createItemDto: CreateItemDto) {
    const { code, description, name } = createItemDto
    //TODO: check if item code existed
    const codeInUse = await this.ItemModal.findOne({code})
    if(codeInUse) throw new ConflictException('Item Code Already existed');

    const newItem = await this.ItemModal.create({
      name,
      description,
      code
    })

    if(!newItem) throw new ConflictException('Item cannot be created')
    return { message:"Item Created Successfully"}
  }

  async findAll() {
    const allItems = await this.ItemModal.find()
    if(allItems.length===0) return ('No Item is found')
    return { allItems };
  }

  async findOne(id: string) {
    const item = await this.ItemModal.findById({_id:id})
    if(!item) throw new UnauthorizedException(`Item with ID not ${id} found`)
    return { item };
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    const item = await this.ItemModal.findById({ _id: id })
    if (!item) throw new UnauthorizedException(`Item with ID not ${id} found`)
    Logger.error(updateItemDto)
    const updateItem = await this.ItemModal.findByIdAndUpdate({ _id: id}, updateItemDto)
    return { updateItem };
  }

  async remove(id: string) {
    const item = await this.ItemModal.findById({_id:id})
    if (!item) throw new UnauthorizedException(`Item not found with ID:${id}`)
    await this.ItemModal.findByIdAndDelete({_id:id})
    return { message:"Item deleted successfully"};
  }
}
