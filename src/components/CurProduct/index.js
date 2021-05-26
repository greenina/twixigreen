/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react';
import './style.css';
class CurProduct extends Component {
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
        <div className="curBox"></div>
        <div
          id={'cdb' + idx}
          className="currentBox"
          valuee={this.props.eco}
          // onMouseEnter={this.recommend}
        >
          <div className="cimage">
            <a href={this.props.a}>
              <img
                className="imagec"
                src={this.props.imgg}
                alt="Recommend image"
              ></img>
            </a>
          </div>
          <div>
            <p className="cdes1">{this.props.name}</p>
            <p className="cdes2">{this.props.price}won</p>
          </div>
        </div>
      </header>
    );
  }
}

export default CurProduct;
