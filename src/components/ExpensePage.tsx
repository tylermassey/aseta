import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'reactstrap';

import { Category } from '../api/categories/model';
import CategoryService from '../api/categories/service';
import { AddExpensePayload } from '../api/expenses/model';
import ExpenseService from '../api/expenses/service';
import { ResponseTypes } from '../api/response';
import ReduxState from '../redux/state';

enum Forms {
    Expense = 'expenseFields',
    Category = 'categoryFields',
}

interface OwnProps {
    categoryService: CategoryService;
    expenseService: ExpenseService;
}

interface ReduxStateProps {
    user: any;
}

interface OwnState {
    categories: Category[];
    expenseFields: {
        name: string;
        amount: number;
        categoryIds: string[];
    };
    categoryFields: {
        name: string;
    };
}

type AllProps = OwnProps & ReduxStateProps;

class ExpensePage extends React.Component<AllProps, OwnState> {
    NAME = 'name';
    AMOUNT = 'amount';
    CATEGORY = 'name';
    CATEGORY_IDS = 'categoryIds';

    constructor(props: AllProps) {
        super(props);
        this.state = {
            categories: [],
            expenseFields: {
                name: '',
                amount: 0,
                categoryIds: [],
            },
            categoryFields: {
                name: '',
            },
        };
    }

    async componentDidMount() {
        await this.getCategories();
    }

    getCategories = async () => {
        const categoriesResponse = await this.props.categoryService.withUserId(
            this.props.user.uid
        );
        switch (categoriesResponse.type) {
            case ResponseTypes.Error:
                break;
            case ResponseTypes.Success:
                this.setState({
                    categories: categoriesResponse.payload,
                });
        }
    };

    submitExpense = async () => {
        const payload: AddExpensePayload = {
            ...this.state.expenseFields,
            userId: this.props.user.uid,
        };
        const response = await this.props.expenseService.add(payload);
        switch (response.type) {
            case ResponseTypes.Error:
            case ResponseTypes.Success:
                break;
        }
    };

    submitCategory = async () => {
        const payload = {
            name: this.state.categoryFields.name,
            userId: this.props.user.uid,
        };
        const response = await this.props.categoryService.add(payload);
        switch (response.type) {
            case ResponseTypes.Error:
                break;
            case ResponseTypes.Success:
                this.setState({
                    categories: [...this.state.categories, response.payload],
                });
                break;
        }
    };

    handleFieldChange = (form: Forms, field: string) => (
        event: React.FormEvent<HTMLInputElement>
    ) =>
        this.setState({
            ...this.state,
            [form]: {
                ...this.state[form],
                [field]: event.currentTarget.value,
            },
        });

    handleSelectInput = (form: Forms, field: string) => (event: any) => {
        this.setState({
            ...this.state,
            [form]: {
                ...this.state[form],
                [field]: Array.apply(null, event.target.options).map(
                    (o: any) => o.value
                ),
            },
        });
    };

    render() {
        return (
            <div style={{ width: 400, padding: 20 }}>
                <div>
                    <h2>add expense</h2>
                    <Input
                        onChange={this.handleFieldChange(
                            Forms.Expense,
                            this.NAME
                        )}
                        placeholder="name"
                        type="text"
                        value={this.state.expenseFields.name}
                    />
                    <Input
                        onChange={this.handleFieldChange(
                            Forms.Expense,
                            this.AMOUNT
                        )}
                        placeholder="amount"
                        type="number"
                        value={this.state.expenseFields.amount}
                    />
                    <Input
                        type="select"
                        multiple={true}
                        onChange={this.handleSelectInput(
                            Forms.Expense,
                            this.CATEGORY_IDS
                        )}
                    >
                        {this.state.categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </Input>
                    <Button onClick={this.submitExpense}>add</Button>
                </div>
                <div>
                    <h2>add category</h2>
                    <Input
                        onChange={this.handleFieldChange(
                            Forms.Category,
                            this.CATEGORY
                        )}
                        placeholder="name"
                        type="text"
                        value={this.state.categoryFields.name}
                    />
                    <Button onClick={this.submitCategory}>add</Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: ReduxState): ReduxStateProps => ({
    user: state.auth.user,
});

export default connect<ReduxStateProps, {}, OwnProps>(mapStateToProps)(
    ExpensePage
);
