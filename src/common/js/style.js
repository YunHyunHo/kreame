import styled from 'styled-components';
import { useState } from 'react';
import BookMarkModal from '../../component/modal/BookMarkModal';

export const Inner = styled.div`
  width: 1280px;
  margin: 0 auto;
  padding: ${props => props.padding};
  box-sizing: border-box;
  border-top: ${props => props.bordertop};
`
// Button
export const Button = styled.button`
  height: ${props => props.height}
  border: 1px solid #d3d3d3;
  border-radius: 12px;
  padding: 10px 30px;
`
// MainItems
const MainItems = styled.div`
  flex: 0 0 auto;

  margin-top: 16px;
  .productInfo{
    padding: 9px 0 0;
  }
  em{
    display: inline-block;
    font-size: 14px;
    font-style: normal;
    padding-bottom: 2px;
    font-weight: 700;
  }
  .name{
    font-size: 14px;
    margin: 4px 0 0 0
  }
  .price{
    padding: 7px 0 0;
    strong{
      font-size: 15px;
    }
    p{
      font-size: 11px;
      margin: 0;
      color: rgba(34,34,34,.5); 
    }
  }
  
`
const MainItemImage = styled.div`
  position: relative;
  width: 294px;
  height: 294px;
  background-image: url(${props => props.url});
  background-size: contain;
  background-color: #000;
  background-position: center;
  border-radius: 15px;

  .bookMark{
    width: 25px;
    height: 25px;
    border: 1px solid #555;
    position: absolute;
    right:10px;
    bottom: 10px;
    border-radius: 50px;
    background-color: #fff;
  }
`
export const MainItem = ({p}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <MainItems>
        <MainItemImage url={p.images[0].url}>
          <div className='bookMark'></div>
        </MainItemImage>
        {/* <img alt="Main Test Images" src="/images/img0.png"/> */}
        <div className='productInfo'>
          <em>{p.title}</em>
          <p className='name'>상세</p>
          <div className='price'>
            <strong>금액</strong>
            <p>즉시 구매가</p>
          </div>
        </div>
      </MainItems>
      <BookMarkModal></BookMarkModal>
    </>
  )
}

const CardItem = styled.div` 
  flex: 0 0 19%;
  p{
    margin: 8px 0;
    text-align: center;
  }
`
const CardImage = styled.div`
  background-image: url(${props => props.url});
  background-repeat: no-repeat;
  background-color: #000;
  background-size: contain;
  background-position: center;
  height: 100px;
  border-radius: 15px;
`
export const Card = ({item}) => {
  return(
    <CardItem>
      <CardImage url={item.url}></CardImage>
      <p>{item.title}</p>
    </CardItem>
  )
}