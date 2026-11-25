import { IsNotEmpty, IsString, MinLength,  } from "class-validator";


export class ItemDto {
    @IsString()
    @MinLength(3)
    name:string

    @MinLength(3)
    @IsNotEmpty()
    @IsString()
    description:string

    @IsNotEmpty()
    @MinLength(3)
    @IsString()
    code:string
}