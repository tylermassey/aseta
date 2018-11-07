interface AddExpensePayload {
    name: string;
    amount: number;
    userId: string;
    categoryIds: string[];
}

interface Expense {
    id?: string;
    userId: string;
    categoryIds: string[];
    name: string;
    amount: number;
    addedWhen: number;
}

export { AddExpensePayload, Expense };
