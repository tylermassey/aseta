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

enum ExpenseFields {
    UserId = 'userId',
    Name = 'name',
    Amount = 'amount',
    CategoryIds = 'categoryIds',
    AddedWhen = 'addedWhen',
}

export { AddExpensePayload, Expense, ExpenseFields };
