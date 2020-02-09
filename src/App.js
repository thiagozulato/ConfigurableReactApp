import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const Header = styled.div`
  ${props => css`
    height: 60px;
    background: #fff;
    color: #333;
    box-shadow: 0px 1px 4px #d9d9d9;
  `}
`;

const Layout = styled.div`
  ${props => css`
    background: #edf1f2;
    display: flex;
    flex-direction: ${props.column ? 'column' : 'row'};
    flex: 1;
    height: 100%;
  `}
`;

const SideBar = styled.div`
  ${props => css`
    background: ${props.theme.primaryColor};
    width: 210px;
    z-index: 1;
  `}
`;

const Content = styled.div`
  ${() => css`
    padding: 25px;
  `}
`;

const Menu = styled.div`
  ${props => css`
    padding: 20px 0;

    a {
      padding: 8px 20px;
      background: #cce0de;
      border-radius: 4px;
      text-decoration: none;
      color: ${props.theme.primaryColor};

      &:hover {
        background: #c6dcda;
      }
    }

    a + a {
      margin-left: 6px;
    }
  `}
`;

class App extends Component {
  renderLinks = () => {
    const { match, menu } = this.props;
    
    return menu.map(menuItem => <Link key={menuItem.id} to={`${match.url}${menuItem.url}`}>{menuItem.nome}</Link>)
  }

  renderRoutes = () => {
    const { match, menu } = this.props;

    return menu.map(menuItem => <Route key={menuItem.id} exact={menuItem.subMenus.length === 0} path={`${match.url}${menuItem.url}`} render={() => <span>{menuItem.nome}</span>} />);
  }
  render() {
    return (
      <Layout>
        <SideBar>
          sidebar
        </SideBar>
        <Layout column>
          <Header>
            header
          </Header>
          <Content>
            <Menu>
              {this.renderLinks()}
            </Menu>
            <div className="rotas">
              <Switch>
                {this.renderRoutes()}
              </Switch>
            </div>
          </Content>
        </Layout>        
      </Layout>
    );
  }
}

export default App;
