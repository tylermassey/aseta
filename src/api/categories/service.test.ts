import 'jest';

import { ResponseTypes, successResponse } from '../shared/response';
import { AddCategoryPayload } from './model';
import CategoryService from './service';

describe('Category service', () => {
    let categoryService: CategoryService;

    const categoryRepository = {
        add: jest.fn(),
        withUserId: jest.fn(),
    };

    beforeEach(() => {
        categoryRepository.add.mockReset();
        categoryRepository.withUserId.mockReset();
        categoryService = new CategoryService(categoryRepository);
    });

    const addRequest: AddCategoryPayload = {
        name: 'test category',
        userId: 'testId',
    };

    test('add - success', async () => {
        categoryRepository.add.mockReturnValueOnce(
            Promise.resolve(successResponse(addRequest))
        );
        const response = await categoryService.add(addRequest);
        expect(response.type).toEqual(ResponseTypes.Success);
        expect(response.payload).toEqual(addRequest);
    });
});
