import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { Col, Row, Table } from 'reactstrap';

import { Expense } from '../api/expenses/model';
import ExpenseService from '../api/expenses/service';
import { ResponseTypes } from '../api/response';
import ReduxState from '../redux/state';

interface OwnProps {
    expenseService: ExpenseService;
}

interface ReduxStateProps {
    user: any;
}

interface OwnState {
    expenses: TableExpense[];
}

interface TableExpense extends Expense {
    date: string;
}

type AllProps = OwnProps & ReduxStateProps;

class AllExpensesPage extends React.Component<AllProps, OwnState> {
    constructor(props: AllProps) {
        super(props);
        this.state = {
            expenses: [],
        };
    }

    async componentDidMount() {
        await this.getExpenses();
    }

    addDateToExpense = (expense: Expense): TableExpense => ({
        ...expense,
        date: new Date(expense.addedWhen).toLocaleDateString(),
    });

    getExpenses = async () => {
        const expensesResponse = await this.props.expenseService.withUserId(
            this.props.user.uid
        );
        switch (expensesResponse.type) {
            case ResponseTypes.Error:
                break;
            case ResponseTypes.Success:
                const formattedExpenses = expensesResponse.payload.map(
                    this.addDateToExpense
                );
                const sortedExpenses = _.reverse(
                    _.sortBy(formattedExpenses, ['addedWhen'])
                );
                this.setState({
                    expenses: sortedExpenses,
                });
        }
    };

    render() {
        return (
            <Row>
                <Col>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.expenses.map((expense, index) => (
                                <tr key={`expense-row-${index}`}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{expense.name}</td>
                                    <td>${expense.amount}</td>
                                    <td>{expense.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state: ReduxState): ReduxStateProps => ({
    user: state.auth.user,
});

export default connect<ReduxStateProps, {}, OwnProps>(mapStateToProps)(
    AllExpensesPage
);
