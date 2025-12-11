import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/catagory.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
    ) { }

    create(createCategoryDto: any) {
        const category = this.categoriesRepository.create(createCategoryDto);
        return this.categoriesRepository.save(category);
    }

    findAll() {
        return this.categoriesRepository.find();
    }

    findOne(id: number) {
        return this.categoriesRepository.findOne({ where: { id } });
    }

    async update(id: number, updateCategoryDto: any) {
        await this.categoriesRepository.update(id, updateCategoryDto);
        return this.findOne(id);
    }

    remove(id: number) {
        return this.categoriesRepository.delete(id);
    }
}
