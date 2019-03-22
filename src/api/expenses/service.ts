import { firestore } from 'firebase';

import { Response } from '../shared/response';
import ExpenseFirebaseRepository from './firebaseRepository';
import { AddExpensePayload, Expense } from './model';

interface ExpenseRepository {
    add(expense: Expense): Promise<Response<Expense, Expense>>;
    withUserId(
        userId: string
    ): Promise<Response<Expense[], { userId: string }>>;
}

class ExpenseService {
    private expenseRepository: ExpenseRepository;

    constructor(
        expenseRepository: ExpenseRepository = new ExpenseFirebaseRepository(
            firestore().collection('expenses')
        )
    ) {
        this.expenseRepository = expenseRepository;
    }

    async add(payload: AddExpensePayload): Promise<Response<Expense, Expense>> {
        const expense: Expense = {
            ...payload,
            addedWhen: Date.now(),
        };
        return this.expenseRepository.add(expense);
    }

    async withUserId(
        userId: string
    ): Promise<Response<Expense[], { userId: string }>> {
        return this.expenseRepository.withUserId(userId);
    }
}

export { ExpenseRepository };
export default ExpenseService;
