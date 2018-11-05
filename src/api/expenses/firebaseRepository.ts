import { firestore } from 'firebase/app';

import {
    errorResponse,
    Response,
    ResponseType,
    successResponse,
} from '../response';
import { Expense } from './model';
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
            return errorResponse(ResponseType.Error, err.message, expense);
        }
    }
}

export default ExpenseFirebaseRepository;
