import { firestore } from 'firebase/app';

import { errorResponse, Response, successResponse } from '../response';
import { Category, CategoryFields } from './model';
import { CategoryRepository } from './service';

class CategoryFirebaseRepository implements CategoryRepository {
    private collection: firestore.CollectionReference;

    constructor(collection: firestore.CollectionReference) {
        this.collection = collection;
    }

    async add(category: Category): Promise<Response<Category, Category>> {
        try {
            const addedDoc = await this.collection.add(category);
            return successResponse(this.fromDoc(await addedDoc.get()));
        } catch (err) {
            return errorResponse(err.message, category);
        }
    }

    async withUserId(
        userId: string
    ): Promise<Response<Category[], { userId: string }>> {
        try {
            const querySnapshot = await this.collection
                .where(CategoryFields.UserId, '==', userId)
                .get();
            const docs = querySnapshot.docs;
            return successResponse(docs.map(this.fromDoc));
        } catch (err) {
            return errorResponse(err.message, { userId });
        }
    }

    private fromDoc(doc: any): Category {
        const docData = doc.data();
        return {
            id: doc.id,
            name: docData.name,
            userId: docData.userId,
            addedWhen: docData.addedWhen,
        };
    }
}

export default CategoryFirebaseRepository;
