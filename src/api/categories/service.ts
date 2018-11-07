import { firestore } from 'firebase';

import { Response } from '../response';
import CategoryFirebaseRepository from './firebaseRepository';
import { AddCategoryPayload, Category } from './model';

interface CategoryRepository {
    add(category: Category): Promise<Response<Category, Category>>;
    withUserId(
        userId: string
    ): Promise<Response<Category[], { userId: string }>>;
}

class CategoryService {
    private categoryRepository: CategoryRepository;

    constructor(
        categoryRepository: CategoryRepository = new CategoryFirebaseRepository(
            firestore().collection('categories')
        )
    ) {
        this.categoryRepository = categoryRepository;
    }

    async add(
        payload: AddCategoryPayload
    ): Promise<Response<Category, Category>> {
        const category: Category = {
            ...payload,
            addedWhen: Date.now(),
        };
        return this.categoryRepository.add(category);
    }

    async withUserId(
        userId: string
    ): Promise<Response<Category[], { userId: string }>> {
        return this.categoryRepository.withUserId(userId);
    }
}

export { CategoryRepository };
export default CategoryService;
