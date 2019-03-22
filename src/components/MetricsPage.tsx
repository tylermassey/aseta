import * as React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';

import { Expense } from '../api/expenses/model';
import ExpenseService from '../api/expenses/service';
import { ResponseTypes } from '../api/shared/response';
import ReduxState from '../redux/state';

interface OwnProps {
    expenseService: ExpenseService;
}

interface ReduxStateProps {
    user: any;
}

interface OwnState {
    expenses: Expense[];
}

type AllProps = OwnProps & ReduxStateProps;

class MetricsPage extends React.Component<AllProps, OwnState> {
    constructor(props: AllProps) {
        super(props);
        this.state = {
            expenses: [],
        };
    }

    async componentDidMount() {
        await this.getExpenses();
    }

    getExpenses = async () => {
        const expensesResponse = await this.props.expenseService.withUserId(
            this.props.user.uid
        );
        switch (expensesResponse.type) {
            case ResponseTypes.Error:
                break;
            case ResponseTypes.Success:
                this.setState({
                    expenses: expensesResponse.payload,
                });
        }
    };

    render() {
        return (
            <Row>
                <Col>metrics page</Col>
            </Row>
        );
    }
}

const mapStateToProps = (state: ReduxState): ReduxStateProps => ({
    user: state.auth.user,
});

export default connect<ReduxStateProps, {}, OwnProps>(mapStateToProps)(
    MetricsPage
);
