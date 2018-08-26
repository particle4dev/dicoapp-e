import React from 'react';
import styled from 'styled-components';
import image from './logo.png';

const Wrapper = styled.div`
  text-align: center;
  padding: 20px 0 20px 0;
  flex: 1;
`;

const Logo = () => (
  <Wrapper>
    <img src={image} alt="logo" />
  </Wrapper>
);

export default Logo;
