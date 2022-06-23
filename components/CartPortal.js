import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Title from './Title';
import getPrice from '../utils.js/get-price';
import heroImage from '../utils.js/heroImage';
import Attribute from './Attribute';
import { addToCart, removeFromCart } from '../store/cartSlice';
import Button from './Button';
import Link from 'next/link';

const Portal = styled.div`
  position: relative;
  z-index: 500;

  button.cart-btn {
    position: relative;
  }
  span.cart-count {
    font-size: 14px;
    font-weight: 700;
    background-color: #000;
    color: #fff;
    border-radius: 100%;
    position: absolute;
    top: 0;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    top: -11px;
    right: -15px;
  }
`;

const PortalCard = styled.div`
  position: absolute;
  top: 5rem;
  right: 0rem;
  background-color: #fff;
  padding: 1rem 1.5rem;
  box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  -webkit-box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  overflow-x: hidden;
`;

const PortalCardHead = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;
  span {
    font-weight: 700;
  }
`;

const PortalCardContent = styled.div``;

/** */

const CartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const CartItem = styled.div`
  flex: 1;
  border-top: 1px solid #e5e5e5;
  display: flex;
  gap: 4rem;
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
    width: 100px;
    height: 120px;
    object-fit: contain;
  }
`;

const PriceContainer = styled.div`
  margin-bottom: 1rem;
`;

const ProductPrice = styled.span`
  font-weight: 500;
  font-size: 18px;
`;

const IncreaseDecrease = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  button {
    padding: 0 0.7rem;
    cursor: pointer;
    border: 1px solid #1d1f22;
    font-size: 20px;
    font-weight: 400;
  }
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin: 2rem 0;
  font-size: 20px;
  font-weight: 700;
  padding: 0 10px;
`;

const CartButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;
  a.basic-btn button {
    background-color: transparent;
    color: #000;
    border: 2px solid #000;
  }
  a.green-btn {
    border: 2px solid #5ece7b;
  }
  button {
    padding: 1rem 3rem;
  }
`;

/** */

function CartPortal({ cartQuantity }) {
  const [showPortal, setShowPortal] = React.useState(false);

  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);
  const dispatch = useDispatch();

  function toggleCart() {
    setShowPortal(!showPortal);
  }

  return (
    <Portal>
      <button className="cart-btn" onClick={toggleCart}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.5613 4.87359C19.1822 4.41031 18.5924 4.12873 17.9821 4.12873H5.15889L4.75914 2.63901C4.52718 1.77302 3.72769 1.16895 2.80069 1.16895H0.653099C0.295301 1.16895 0 1.45052 0 1.79347C0 2.13562 0.294459 2.418 0.653099 2.418H2.80069C3.11654 2.418 3.39045 2.61936 3.47434 2.92139L6.04306 12.7077C6.27502 13.5737 7.07451 14.1778 8.00152 14.1778H16.4028C17.3289 14.1778 18.1507 13.5737 18.3612 12.7077L19.9405 6.50575C20.0877 5.941 19.9619 5.33693 19.5613 4.87365L19.5613 4.87359ZM18.6566 6.22252L17.0773 12.4245C16.9934 12.7265 16.7195 12.9279 16.4036 12.9279H8.00154C7.68569 12.9279 7.41178 12.7265 7.32789 12.4245L5.49611 5.39756H17.983C18.1936 5.39756 18.4042 5.49824 18.5308 5.65948C18.6567 5.81994 18.7192 6.0213 18.6567 6.22266L18.6566 6.22252Z"
            fill="#43464E"
          />
          <path
            d="M8.44437 14.9814C7.2443 14.9814 6.25488 15.9276 6.25488 17.0751C6.25488 18.2226 7.24439 19.1688 8.44437 19.1688C9.64445 19.1696 10.6339 18.2234 10.6339 17.0757C10.6339 15.928 9.64436 14.9812 8.44437 14.9812V14.9814ZM8.44437 17.9011C7.9599 17.9011 7.58071 17.5385 7.58071 17.0752C7.58071 16.6119 7.9599 16.2493 8.44437 16.2493C8.92885 16.2493 9.30804 16.6119 9.30804 17.0752C9.30722 17.5188 8.90748 17.9011 8.44437 17.9011Z"
            fill="#43464E"
          />
          <path
            d="M15.6875 14.9814C14.4875 14.9814 13.498 15.9277 13.498 17.0752C13.498 18.2226 14.4876 19.1689 15.6875 19.1689C16.8875 19.1689 17.877 18.2226 17.877 17.0752C17.8565 15.9284 16.8875 14.9814 15.6875 14.9814ZM15.6875 17.9011C15.2031 17.9011 14.8239 17.5385 14.8239 17.0752C14.8239 16.612 15.2031 16.2493 15.6875 16.2493C16.172 16.2493 16.5512 16.612 16.5512 17.0752C16.5512 17.5188 16.1506 17.9011 15.6875 17.9011Z"
            fill="#43464E"
          />
        </svg>
        {cartQuantity > 0 && <span className="cart-count">{cartQuantity}</span>}
      </button>
      {showPortal && (
        <PortalCard>
          <PortalCardHead>
            <Title fontSize="18px" fontWeight="700" data="My Bag" />
            <span>{cartQuantity} Items</span>
          </PortalCardHead>
          <PortalCardContent>
            <CartItemsContainer>
              {cartItems?.length > 0 &&
                cartItems?.map((item) => {
                  const price = getPrice(item, 'USD');
                  return (
                    <CartItem>
                      <LeftSide>
                        <Title
                          font-size="30px"
                          fontWeight="600"
                          data={item.name}
                        />

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
                          attributes={item?.attributes?.find(
                            (element) => element
                          )}
                        />
                      </LeftSide>
                      <RightSide>
                        <IncreaseDecrease>
                          <button onClick={() => dispatch(addToCart(item))}>
                            +
                          </button>
                          <span>{item.qty}</span>
                          <button
                            onClick={() => dispatch(removeFromCart(item))}
                          >
                            -
                          </button>
                        </IncreaseDecrease>
                        <img src={heroImage(item)} alt={item?.name} />
                      </RightSide>
                    </CartItem>
                  );
                })}
              {cartItems?.length === 0 && <p>No Items Added To Cart</p>}

              <TotalPrice>
                <span>Total</span>
                <div>
                  <p>$5000</p>
                </div>
              </TotalPrice>
              <CartButtons>
                <Link href="/cart">
                  <a href="/cart" className="basic-btn">
                    <Button data="View Bag" inStock />
                  </a>
                </Link>
                <Link href="/cart">
                  <a href="/cart" className="green-btn">
                    <Button data="Checkout" inStock />
                  </a>
                </Link>
              </CartButtons>
            </CartItemsContainer>
          </PortalCardContent>
        </PortalCard>
      )}
    </Portal>
  );
}

export default CartPortal;
