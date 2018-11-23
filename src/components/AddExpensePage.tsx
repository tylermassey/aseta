import * as React from 'react';
import { connect } from 'react-redux';
import {
    Alert,
    Button,
    Col,
    Collapse,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
} from 'reactstrap';

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

interface RequestAlert {
    type: 'success' | 'danger';
    message: string;
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
    categoryFormOpen: boolean;
    expenseAlert: RequestAlert | undefined;
    categoryAlert: RequestAlert | undefined;
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
            categoryFormOpen: false,
            expenseAlert: undefined,
            categoryAlert: undefined,
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
                this.setState({
                    expenseAlert: { type: 'danger', message: response.message },
                });
                break;
            case ResponseTypes.Success:
                this.setState({
                    expenseFields: {
                        ...this.state.expenseFields,
                        name: '',
                        amount: 0,
                    },
                    expenseAlert: {
                        type: 'success',
                        message: 'Expense added!',
                    },
                });
                break;
        }
        setTimeout(() => this.setState({ expenseAlert: undefined }), 4000);
    };

    submitCategory = async () => {
        const payload = {
            name: this.state.categoryFields.name,
            userId: this.props.user.uid,
        };
        const response = await this.props.categoryService.add(payload);
        switch (response.type) {
            case ResponseTypes.Error:
                this.setState({
                    categoryAlert: {
                        type: 'danger',
                        message: response.message,
                    },
                });
                break;
            case ResponseTypes.Success:
                this.setState({
                    categories: [...this.state.categories, response.payload],
                    categoryFields: { name: '' },
                    categoryAlert: {
                        type: 'success',
                        message: 'Category added!',
                    },
                });
                setTimeout(
                    () => this.setState({ categoryFormOpen: false }),
                    2000
                );
                break;
        }
        setTimeout(() => this.setState({ categoryAlert: undefined }), 4000);
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

    isFormValid = (): boolean =>
        this.state.expenseFields.name.length > 0 &&
        Boolean(this.state.expenseFields.amount);

    getCategoryToggleText = (): string =>
        this.state.categoryFormOpen
            ? 'Hide category form'
            : this.state.categories.length > 0
            ? 'Show category form'
            : 'Try adding a category!';

    render() {
        return (
            <Row style={{ justifyContent: 'center' }}>
                <Col style={{ maxWidth: 600 }}>
                    <Form>
                        <FormGroup>
                            <Label>Name</Label>
                            <Input
                                onChange={this.handleFieldChange(
                                    Forms.Expense,
                                    this.NAME
                                )}
                                placeholder="Sunday brunch"
                                type="text"
                                value={this.state.expenseFields.name}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Amount</Label>
                            <Input
                                onChange={this.handleFieldChange(
                                    Forms.Expense,
                                    this.AMOUNT
                                )}
                                type="number"
                                value={this.state.expenseFields.amount}
                            />
                        </FormGroup>
                        <FormGroup>
                            {this.state.categories.length > 0 && (
                                <>
                                    <Label>Categories</Label>
                                    <Input
                                        type="select"
                                        multiple
                                        onChange={this.handleSelectInput(
                                            Forms.Expense,
                                            this.CATEGORY_IDS
                                        )}
                                    >
                                        {this.state.categories.map(category => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </Input>
                                </>
                            )}
                        </FormGroup>
                        <Button
                            block
                            outline
                            disabled={!this.isFormValid()}
                            color="primary"
                            onClick={this.submitExpense}
                        >
                            <i className="fa fa-circle-o-notch fa-spin" />
                            Add Expense
                        </Button>
                    </Form>
                    {this.state.expenseAlert && (
                        <Alert
                            color={this.state.expenseAlert.type}
                            style={{ marginTop: 12 }}
                        >
                            {this.state.expenseAlert.message}
                        </Alert>
                    )}
                    <div style={{ marginTop: 40 }} />
                    <Collapse isOpen={this.state.categoryFormOpen}>
                        <Form>
                            <FormGroup>
                                <Label>Name</Label>
                                <Input
                                    onChange={this.handleFieldChange(
                                        Forms.Category,
                                        this.CATEGORY
                                    )}
                                    placeholder="Eating out"
                                    type="text"
                                    value={this.state.categoryFields.name}
                                />
                            </FormGroup>
                            <Button
                                block
                                outline
                                color="primary"
                                disabled={
                                    this.state.categoryFields.name.length === 0
                                }
                                onClick={this.submitCategory}
                            >
                                Add Category
                            </Button>
                        </Form>
                        {this.state.categoryAlert && (
                            <Alert
                                color={this.state.categoryAlert.type}
                                style={{ marginTop: 12 }}
                            >
                                {this.state.categoryAlert.message}
                            </Alert>
                        )}
                    </Collapse>
                    <Button
                        block
                        color="link"
                        style={{ marginTop: 16 }}
                        onClick={() =>
                            this.setState({
                                categoryFormOpen: !this.state.categoryFormOpen,
                            })
                        }
                    >
                        {this.getCategoryToggleText()}
                    </Button>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state: ReduxState): ReduxStateProps => ({
    user: state.auth.user,
});

export default connect<ReduxStateProps, {}, OwnProps>(mapStateToProps)(
    ExpensePage
);
