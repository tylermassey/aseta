interface AddCategoryPayload {
    name: string;
    userId: string;
}

interface Category {
    id?: string;
    name: string;
    userId: string;
    addedWhen: number;
}

enum CategoryFields {
    UserId = 'userId',
    Name = 'name',
    AddedWhen = 'addedWhen',
}

export { AddCategoryPayload, Category, CategoryFields };
