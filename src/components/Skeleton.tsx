import * as _ from 'lodash';
import * as React from 'react';
import { Link, RouteProps } from 'react-router-dom';
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

type AllProps = OwnProps & RouteProps;

enum Pages {
    Add = '',
    Expenses = 'expenses',
    Metrics = 'metrics',
}

class Skeleton extends React.Component<AllProps, OwnState> {
    constructor(props: AllProps) {
        super(props);
        this.state = {
            menuOpen: false,
        };
    }

    toggle = () => this.setState({ menuOpen: !this.state.menuOpen });

    handleLinkClick = () => {
        if (!isSizeAtLeast(this.props.mediaSize, MediaSizes.md)) {
            _.delay(this.toggle, 300);
        }
    };

    isPageActive = (page: Pages) =>
        this.props.location &&
        this.props.location.pathname.substring(1) === page;

    render() {
        return (
            <div>
                <Navbar
                    color="dark"
                    dark
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
                            <NavItem active={this.isPageActive(Pages.Add)}>
                                <NavLink
                                    tag={Link}
                                    to="/"
                                    onClick={this.handleLinkClick}
                                >
                                    Add
                                </NavLink>
                            </NavItem>
                            <NavItem active={this.isPageActive(Pages.Expenses)}>
                                <NavLink
                                    tag={Link}
                                    to="/expenses"
                                    onClick={this.handleLinkClick}
                                >
                                    Expenses
                                </NavLink>
                            </NavItem>
                            <NavItem active={this.isPageActive(Pages.Metrics)}>
                                <NavLink
                                    tag={Link}
                                    to="/metrics"
                                    onClick={this.handleLinkClick}
                                >
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
                <Container
                    style={{
                        marginTop: isSizeAtLeast(
                            this.props.mediaSize,
                            MediaSizes.md
                        )
                            ? 30
                            : 20,
                    }}
                >
                    {this.props.content}
                </Container>
            </div>
        );
    }
}

export default Skeleton;
