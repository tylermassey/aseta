import * as React from 'react';
import { connect } from 'react-redux';

import { AddExpensePayload } from '../api/expenses/model';
import ExpenseService from '../api/expenses/service';
import { ResponseType } from '../api/response';
import ReduxState from '../redux/state';

interface OwnProps {
    expenseService: ExpenseService;
}

interface ReduxStateProps {
    user: any;
}

interface OwnState {
    expenseFields: {
        name: string;
        amount: number;
    };
}

type AllProps = OwnProps & ReduxStateProps;

class ExpensePage extends React.Component<AllProps, OwnState> {
    NAME = 'name';
    AMOUNT = 'amount';

    constructor(props: AllProps) {
        super(props);
        this.state = {
            expenseFields: {
                name: '',
                amount: 0,
            },
        };
    }

    submitExpense = async () => {
        const payload: AddExpensePayload = {
            ...this.state.expenseFields,
            userId: this.props.user.uid,
        };
        const response = await this.props.expenseService.add(payload);
        switch (response.type) {
            case ResponseType.Error:
            case ResponseType.Success:
                break;
        }
    };

    handleFieldChange = (field: string) => (
        event: React.FormEvent<HTMLInputElement>
    ) =>
        this.setState({
            ...this.state,
            expenseFields: {
                ...this.state.expenseFields,
                [field]: event.currentTarget.value,
            },
        });

    render() {
        return (
            <div>
                <h2>add expense</h2>
                <input
                    onChange={this.handleFieldChange(this.NAME)}
                    placeholder="name"
                    type="text"
                    value={this.state.expenseFields.name}
                />
                <input
                    onChange={this.handleFieldChange(this.AMOUNT)}
                    placeholder="amount"
                    type="number"
                    value={this.state.expenseFields.amount}
                />
                <button onClick={this.submitExpense}>add</button>
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
