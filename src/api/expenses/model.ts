interface AddExpensePayload {
    name: string;
    amount: number;
    userId: string;
}

interface Expense {
    id?: string;
    userId: string;
    name: string;
    amount: number;
    addedWhen: number;
}

export { AddExpensePayload, Expense };
