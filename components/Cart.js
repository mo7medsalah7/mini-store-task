import React from 'react';
import styled from 'styled-components';
import Title from './Title';
import { useSelector } from 'react-redux';
import getPrice from '../utils.js/get-price';
import Attribute from './Attribute';
import heroImage from '../utils.js/heroImage';

const CartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const CartItem = styled.div`
  flex: 1;
  border-top: 1px solid #e5e5e5;
  display: flex;
  h2 {
    margin-top: 2rem;
  }
  p {
    font-family: 'Raleway';
    font-size: 18px;
  }
`;
const LeftSide = styled.div``;
const RightSide = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  flex: 1;
  gap: 4rem;
  img {
    width: 150px;
    height: 300px;
    object-fit: contain;
  }
`;

const PriceContainer = styled.div`
  margin-bottom: 1rem;
`;

const ProductPrice = styled.span`
  font-weight: 700;
  font-size: 30px;
`;

const IncreaseDecrease = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  button {
    padding: 0 2rem;
    cursor: pointer;
    border: 1px solid #1d1f22;
    font-size: 30px;
    font-weight: 400;
  }
`;

function Cart() {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div>
      <Title fontSize="32px" fontWeight="700" data="Cart" />
      <CartItemsContainer>
        {cartItems?.map((item) => {
          const price = getPrice(item, 'USD');
          console.log('mo', item?.attributes);
          return (
            <CartItem>
              <LeftSide>
                <Title font-size="30px" fontWeight="600" data={item.name} />

                <PriceContainer>
                  <ProductPrice>
                    {price?.map((priceItem) => (
                      <ProductPrice>
                        {priceItem.currency.symbol}
                        {priceItem.amount}
                      </ProductPrice>
                    ))}
                  </ProductPrice>
                </PriceContainer>
                <Attribute
                  attributes={item?.attributes?.find((element) => element)}
                />
              </LeftSide>
              <RightSide>
                <IncreaseDecrease>
                  <button>+</button>
                  <span>1</span>
                  <button>-</button>
                </IncreaseDecrease>
                <img src={heroImage(item)} alt={item?.name} />
              </RightSide>
            </CartItem>
          );
        })}
      </CartItemsContainer>
    </div>
  );
}

export default Cart;
