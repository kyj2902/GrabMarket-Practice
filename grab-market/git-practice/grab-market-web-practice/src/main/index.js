import "./index.css";
import React from "react";
import axios from "axios";

function MainPage() {
  const [products, setProducts] = React.useState([]);
  /* useState 안에 기본값이 들어가는데, products는 배열이니까 빈 배열 []을 넣어줌. */
  React.useEffect(function () {
    /* setProducts가 실행되면 계속해서 렌더링이 무한반복되기 때문에 한 번만 네트워크 통신이 되기 위해 useEffect를 사용함. */
    axios
      .get(
        "https://8ea92b0d-c092-4c6f-b999-f3fc6b941a0e.mock.pstmn.io/practice_products"
      )
      .then(function (result) {
        const products = result.data.products;
        /* 서버에 저장된 products 배열을 이 js에서 만든 products에 담아준다. */
        setProducts(products);
        /* 아래서 map으로 배열이 순회해야 하는데, 위에서 기본값이 빈 배열이니까 순회할 수 없음. */
        /* 이 배열(products)를 업데이트(setProducts) 해줘야 함. */
        /* 업데이트 될 때마다 비었던 배열에 products 값이 들어감(?) */
      })
      .catch(function (error) {
        console.log("에러 발생 : ", error);
      });
  }, []);
  return (
    <div>
      <div id="header">
        <div id="header-area">
          <img src="images/icons/logo.png" />
        </div>
      </div>
      <div id="body">
        <div id="banner">
          <img src="images/banners/banner1.png" />
        </div>
        <h1>판매되는 상품들</h1>
        <div id="product-list">
          {products.map(function (product, index) {
            /* 위에서 받은 products라는 배열 순회. product: 순회하는 배열의 값 */
            /* map은 return이 가능하는데, 이때 화면에 보여질 product-card를 return한다! */
            /* 현재 products의 길이가 3이므로 3번 반복하게 됨. */
            /* 그때의 순회 값인 product의 객체들을 반환하게 코드를 적어준다. */
            return (
              <div className="product-card">
                <div>
                  <img className="product-img" src={product.imageUrl}></img>
                </div>
                <div className="product-contents">
                  <span className="product-name">{product.name}</span>
                  <span className="product-price">{product.price}원</span>
                  <div className="product-seller">
                    <img
                      className="product-avatar"
                      src="images/icons/avatar.png"
                    ></img>
                    <span>{product.seller}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div id="footer"></div>
    </div>
  );
}

export default MainPage;
