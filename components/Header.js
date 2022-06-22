import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const NavContainer = styled.nav`
  padding: 1.5rem 0;
`;
const Left = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  text-align: center;
  gap: 2rem;
  a {
    all: unset;
    cursor: pointer;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    letter-spacing: 2px;
    line-height: 20px;
    color: var(--c-text);
    text-transform: uppercase;
    text-decoration: none;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 0%;
      height: 1px;
      transition: width 0.3s ease;
      background: transparent;
    }
  }
`;
const Right = styled.div``;
const Logo = styled.div``;

export default function Header() {
  return (
    <NavContainer>
      <Left>
        <Link href="/products/all">All</Link>
        <Link href="/products/clothes">Clothes</Link>
        <Link href="/products/tech">Tech</Link>
      </Left>
    </NavContainer>
  );
}
