import React from 'react';
import styled, { keyframes, css } from 'styled-components';

import http from './HttpAxios';

const loadingAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const animation = (speed = '.7s') => css`
  animation: ${loadingAnimation} ${speed} linear infinite;
`;

const LoadingSpinner = styled.div`
  border: 2px solid #efefef;
  border-top: 2px solid #673ab7;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  ${animation()}
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoadingText = styled.span`
  margin-top: 12px;
  font-size: 16px;
  color: #999;
  font-family: "Helvetica", sans-serif;
  font-weight: 300;
`;

const Loading = ({ children }) => (
  <LoadingWrapper>
    <LoadingSpinner />
    <LoadingText>{children}</LoadingText>
  </LoadingWrapper>
)

export const bootstrapLoader = (Component) => {
  return class InnerLoader extends React.Component {
    state = {
      loading: true,
      data: {}
    }

    async componentDidMount() {
      try {
        const data = await http.all([
          http.get('/api/configurations'),
          http.get('/api/configurations/theme'),
          http.get('/api/configurations/menu')
        ]);        

        this.setState({
          loading: false,
          data: {
            config: data[0].data,
            theme: data[1].data,
            menu: data[2].data
          }
        })
      } catch {
        console.log('error');
      }
    }

    renderStageApp = () => {
      const { loading, data } = this.state;

      if (loading) {
        return (
          <Loading>
            We are loading your configurations!!
          </Loading>
        )
      }

      return <Component 
                {...this.props}
                config={data.config}
                theme={data.theme}
                menu={data.menu}
              />
    }

    render() {
      return this.renderStageApp()
    }
  }
}