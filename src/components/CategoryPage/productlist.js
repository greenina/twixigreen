import React from 'react';
import Product from '../Product';
import './style.css';
class Productlist extends React.Component {
  render() {
    const { name, price, imgg, a, ecoval, wished } = this.props;
    return name.map((val, idx) => {
      return (
        <div className="exact_product">
          <Product
            name={name[idx]}
            price={price[idx]}
            imgg={imgg[idx]}
            a={a[idx]}
            ecoval={ecoval[idx]}
            idx={idx}
            wished={wished[idx]}
          />
        </div>
      );
    });
  }
}

export default Productlist;
