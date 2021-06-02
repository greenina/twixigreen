import React from 'react';
import Product from '../Product';
import './style.css';
import {db, firebaseApp} from '../../firebase'

class Productlist extends React.Component {
  render() {
    firebaseApp.auth().onAuthStateChanged(function (user) {
      if (user) {
        const email = user.email
      } else {
        const email = '1'
      }
    });
    const { name, price, imgg, a, ecoval, wished, email } = this.props;
    console.log("productList",wished)
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
            email = {email}
            cg = {this.props.cg}
          />
        </div>
      );
    });
  }
}

export default Productlist;
