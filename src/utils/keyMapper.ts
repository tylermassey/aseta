interface KeyBase {
    type: 'number' | 'backspace' | 'null';
}

export interface NumberKey extends KeyBase {
    value: number;
}

export type NonValueKey = KeyBase;

export type Key = NumberKey | NonValueKey;

export const getKeyValue = (keyNumber: number): Key => {
    switch (keyNumber) {
        case 48:
            return { type: 'number', value: 0 };
        case 49:
            return { type: 'number', value: 1 };
        case 50:
            return { type: 'number', value: 2 };
        case 51:
            return { type: 'number', value: 3 };
        case 52:
            return { type: 'number', value: 4 };
        case 53:
            return { type: 'number', value: 5 };
        case 54:
            return { type: 'number', value: 6 };
        case 55:
            return { type: 'number', value: 7 };
        case 56:
            return { type: 'number', value: 8 };
        case 57:
            return { type: 'number', value: 9 };
        case 8:
            return { type: 'backspace' };
        default:
            return { type: 'null' };
    }
};
