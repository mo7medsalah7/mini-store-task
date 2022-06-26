import React from 'react';
import styled from 'styled-components';

const DropDownCard = styled.div`
  position: absolute;
  top: 5rem;
  right: 0rem;
  background-color: #fff;
  padding: 1rem 1.5rem;
  box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  -webkit-box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  overflow-x: hidden;
`;

function DropDownMenu(props) {
  return <DropDownCard>{props.children}</DropDownCard>;
}

export default DropDownMenu;
