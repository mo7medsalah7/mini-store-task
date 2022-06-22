import React from 'react';
import styled from 'styled-components';

const TitleLayout = styled.h2`
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
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
