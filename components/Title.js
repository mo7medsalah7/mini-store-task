import React from 'react';
import styled from 'styled-components';

const TitleLayout = styled.h2`
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};

  @media screen and (max-width: 766px) {
    font-size: 18px;
    font-weight: ${(props) => props.fontWeight - 100};
  }
`;

function Title({ fontSize, fontWeight, lineHeight, data }) {
  return (
    <TitleLayout
      fontSize={fontSize}
      fontWeight={fontWeight}
      lineHeight={lineHeight}
      data={data}
    >
      {data}
    </TitleLayout>
  );
}

export default Title;
