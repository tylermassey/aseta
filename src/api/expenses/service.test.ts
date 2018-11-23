import 'jest';

import { ResponseTypes, successResponse } from '../response';
import ExpenseService from './service';

describe('Expenses service', () => {
    let expenseService: ExpenseService;

    const expenseRepository = {
        add: jest.fn(),
    };

    beforeEach(() => {
        expenseRepository.add.mockReset();
        expenseService = new ExpenseService(expenseRepository);
    });

    const addRequest = {
        name: 'test expense',
        amount: 10,
        userId: 'testId',
        categoryIds: ['id1'],
    };

    test('add - success', async () => {
        expenseRepository.add.mockReturnValueOnce(
            Promise.resolve(successResponse(addRequest))
        );
        const response = await expenseService.add(addRequest);
        expect(response.type).toEqual(ResponseTypes.Success);
        expect(response.payload).toEqual(addRequest);
    });
});