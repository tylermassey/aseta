import { firestore } from 'firebase/app';

import { errorResponse, Response, successResponse } from '../response';
import { Expense, ExpenseFields } from './model';
import { ExpenseRepository } from './service';

class ExpenseFirebaseRepository implements ExpenseRepository {
    private collection: firestore.CollectionReference;

    constructor(collection: firestore.CollectionReference) {
        this.collection = collection;
    }

    async add(expense: Expense): Promise<Response<Expense, Expense>> {
        try {
            const addedDoc = await this.collection.add(expense);
            return successResponse({ id: addedDoc.id, ...expense });
        } catch (err) {
            return errorResponse(err.message, expense);
        }
    }

    async withUserId(
        userId: string
    ): Promise<Response<Expense[], { userId: string }>> {
        try {
            const querySnapshot = await this.collection
                .where(ExpenseFields.UserId, '==', userId)
                .get();
            const docs = querySnapshot.docs;
            return successResponse(docs.map(this.fromDoc));
        } catch (err) {
            return errorResponse(err.message, { userId });
        }
    }

    private fromDoc(doc: any): Expense {
        const docData = doc.data();
        return {
            id: doc.id,
            userId: docData.userId,
            name: docData.name,
            amount: docData.amount,
            categoryIds: docData.categoryIds,
            addedWhen: docData.addedWhen,
        };
    }
}

export default ExpenseFirebaseRepository;
