/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react';
import './style.css';
//import $ from 'jquery';
import DetailPage from '../DetailPage';
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom';

class Product extends Component {
  constructor(props) {
    super(props);
    // console.log('props', this.props);

    this.state = {
      name: '',
      price: '',
      imgg: '',
      a: '',
      ecoval: 1,
    };
    this.me = this.me.bind(this);
    this.ml = this.ml.bind(this);
  }

  // componentDidMount(){
  //   $(".productbox").mouseenter(function(){console.log('on');
  //   $(this).addClass("eco"+this.props.ecoval)});
  // $(".productbox").mouseleave(function(){$(this).removeClass("eco"+this.props.ecoval)});
  // }

  me() {
    // console.log('on');
    //   console.log(this.state.ecoval);
    document
      .getElementById('pdb' + this.props.idx)
      .classList.add('eco' + this.props.ecoval);
    // console.log(document.getElementById('pdb'));
  }

  ml() {
    // console.log('off');
    // $(this).removeClass("eco"+this.props.ecoval);
    document
      .getElementById('pdb' + this.props.idx)
      .classList.remove('eco' + this.props.ecoval);
  }

  render() {
    var { name, price, imgg, a, ecoval, wished, idx } = this.props;
    return (
      <header>
        <div
          id={'pdb' + idx}
          className="productbox"
          value={this.props.eco}
          onMouseEnter={this.me}
          onMouseLeave={this.ml}
        >
          <div className="pimage">
            <Link
              to={{
                pathname: `/detail/`,
                state: {
                  name: this.props.name,
                  price: this.props.price,
                  imgg: this.props.imgg,
                  link: this.props.a,
                  ecoval: this.props.ecoval,
                  idx: this.props.idx,
                },
              }}
            >
              <img
                classname="imgg"
                src={this.props.imgg}
                alt="Product image"
                width="175px"
                height="175px"
              ></img>
            </Link>
          </div>
          {this.props.wished ? (
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
          )}
          <div>
            <p className="des">{this.props.name}</p>
            <p className="des">{this.props.price} won</p>
          </div>
        </div>
      </header>
    );
  }
}

export default Product;
