import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    create(@Body() createCategoryDto: any) {
        return this.categoriesService.create(createCategoryDto);
    }

    @Get()
    findAll() {
        return this.categoriesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.categoriesService.findOne(+id);
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    update(@Param('id') id: string, @Body() updateCategoryDto: any) {
        return this.categoriesService.update(+id, updateCategoryDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    remove(@Param('id') id: string) {
        return this.categoriesService.remove(+id);
    }
}
