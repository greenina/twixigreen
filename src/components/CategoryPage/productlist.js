import { Room } from '@material-ui/icons';
import React from 'react';
import Product from '../Product';
import './style.css';
class Productlist extends React.Component {
  render() {
    const { name, price, imgg, a, ecoval, wished, id, email, jebal, room } =
      this.props;

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
            wished={wished}
            id={id[idx]}
            email={email}
            jebal={jebal}
            room={room}
          />
        </div>
      );
    });
  }
}

export default Productlist;
