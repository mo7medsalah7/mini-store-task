import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';
import Products from './Products';

const GlobalStyles = createGlobalStyle`

  html {

    --maxWidth: 1100px;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
    box-sizing: border-box;
    font-size: 62.5%;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height:2;
  }
  a {
    text-decoration: none;
    color: var(---black);
  }


  p{
    padding: 0;
    margin: 0;
  }
  h2, h3, h4 {
    padding: 0;
    margin: 0;
  }
  button {
    all: unset;
    cursor: pointer;
  }

  .active {
    border-bottom: 1px solid #53da7c;
  }
  .clicked {
    background-color: #1d1f22 !important;
    color: #fff;
  }
`;

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem 0rem;

  @media screen and (max-width: 922px) {
    padding: 1rem 2rem;
  }
`;

export default function Page({ children }) {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <Products />
      <InnerStyles>{children}</InnerStyles>
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};
