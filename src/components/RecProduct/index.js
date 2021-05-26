/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react';
import './style.css';
class RecProduct extends Component {
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
    console.log('Recprops', this.props);
    return (
      <header>
        <div className="recBox"></div>
        <div
          id={'rdb' + idx}
          className="recommendbox"
          valuee={this.props.eco}
          // onMouseEnter={this.recommend}
        >
          <div className="rimage">
            <a href={this.props.a}>
              <img
                className="imagee"
                src={this.props.imgg}
                alt="Recommend image"
              ></img>
            </a>
          </div>
          <div>
            <p className="rdes1">{this.props.name}</p>
            <p className="rdes2">{this.props.price}won</p>
          </div>
        </div>
      </header>
    );
  }
}

export default RecProduct;
