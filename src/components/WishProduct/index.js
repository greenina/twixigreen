/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react';
import './style.css';
class WishProduct extends Component {
  constructor(props) {
    super(props);
    // console.log('props', this.props);

    this.state = {
      name: '',
      price: '',
      imgg: '',
      a: '',
      wished: false,
      ecoval: 1,
    };
    // this.recommend = this.recommend.bind(this);
  }

  // recommend() {
  //   if (this.props.ecoval > 0) console.log('bukkuk loved this product');
  //   else console.log("bukkuk's recommendation!");
  // }

  render() {
    var { name, price, imgg, a, ecoval, wished, idx } = this.props;
    return (
      <header>
        <div
          id={'pdb' + idx}
          className="productbox"
          valuee={this.props.eco}
          // onMouseEnter={this.recommend}
        >
          <div className="pimage">
            <a href={this.props.a}>
              <img
                src={this.props.imgg}
                alt="Product image"
                width="175px"
                height="175px"
              ></img>
            </a>
          </div>
          {/* {this.props.wished ? (
            <img
              className="heart"
              src="https://ifh.cc/g/d7BZO6.png"
              width="30px"
            />
          ) : (
            <img
              className="heart"
              src="https://ifh.cc/g/IuZase.png"
              width="30px"
            />
          )} */}
          <div>
            <p className="wdes1">{this.props.name}</p>
            <p className="wdes2">{this.props.price}won</p>
          </div>
        </div>
      </header>
    );
  }
}

export default WishProduct;
