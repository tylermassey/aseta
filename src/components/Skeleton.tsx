import * as React from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Container,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
} from 'reactstrap';

import { logout } from '../utils/auth';
import { isSizeAtLeast, MediaSizes } from '../utils/mediaWatcher';

interface OwnProps {
    mediaSize: MediaSizes;
    content: JSX.Element;
}

interface OwnState {
    menuOpen: boolean;
}

class Skeleton extends React.Component<OwnProps, OwnState> {
    constructor(props: OwnProps) {
        super(props);
        this.state = {
            menuOpen: false,
        };
    }

    toggle = () => this.setState({ menuOpen: !this.state.menuOpen });

    render() {
        return (
            <div>
                <Navbar
                    color="light"
                    light
                    expand="md"
                    fixed={
                        isSizeAtLeast(this.props.mediaSize, MediaSizes.md)
                            ? ''
                            : 'bottom'
                    }
                >
                    <NavbarBrand tag={Link} to="/">
                        ASETA
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.menuOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} to="/expenses">
                                    Expenses
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/metrics">
                                    Metrics
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#" onClick={logout}>
                                    Logout
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Container fluid>
                    <div>{this.props.content}</div>
                </Container>
            </div>
        );
    }
}

export default Skeleton;
