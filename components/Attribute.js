import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/dist/client/router';

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const AttributeButton = styled.div`
  padding: 1rem 2rem;
  cursor: pointer;
  border: 1px solid #1d1f22;
  font-size: 16px;
  font-weight: 400;
  background: #fff;
  color: #1d1f22;

  &:hover {
    background-color: #1d1f22;
    color: #ffffff;
  }

  @media screen and (max-width: 766px) {
    padding: 0.6rem 1rem;
  }
`;

function Attribute({ attributes }) {
  const [isClicked, setIsClicked] = React.useState(false);
  const router = useRouter();
  // For products that have various options (attributes) - the options should be selected.
  const handleClickAttribute = (e, attributeValue) => {
    setIsClicked((isClicked) => !isClicked);
    if (router.pathname === `/product/[id]`) {
      router.push({
        pathname: `/product/${router?.query?.id}`,
        query: { q: `${attributeValue}` },
      });
    } else if (router.pathname === `/cart`) {
      router.push({
        pathname: `/cart`,
        query: { q: `${attributeValue}` },
      });
    }
  };

  return (
    <ButtonContainer>
      {attributes?.items?.map((item) => {
        return (
          <AttributeButton
            key={item.id}
            onClick={(e) => handleClickAttribute(e, item.value)}
            isClicked={isClicked}
            id={item.id}
          >
            {item.value}
          </AttributeButton>
        );
      })}
    </ButtonContainer>
  );
}

export default Attribute;
