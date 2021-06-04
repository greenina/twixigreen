import './style.css';
import React from 'react';
import Productlist from './productlist';
import { db, firebaseApp } from './../../firebase';
import { useState, useEffect } from 'react';

var count = 0;
var cgg = '';
var initial = '';
var route = '';
var email = '1';
var signIn = true;
var wished = [];
var score = 0;
var products = [];
class CategoryPage extends React.Component {
  constructor(props) {
    super(props);

    cgg = props.match.params.cg;
    this.state = {
      name: [],
      price: [],
      imgg: [],
      a: [],
      ecoval: [],
      img_src: [],
      score: score,
      wished: [],
      id: [],
      wishlist: wished,
      email: email,
      signIn: signIn,
      route: route,
    };

    this.datarefresh = this.datarefresh.bind(this);
    this.onesight = this.onesight.bind(this);
    this.bukkuk = this.bukkuk.bind(this);
    this.bukkukthen = this.bukkukthen.bind(this);
    this.wishthen = this.wishthen.bind(this);
    // this.scorethen = this.scorethen.bind(this);
    this.afteremaildownload = this.afteremaildownload.bind(this);
    this.jebal = this.jebal.bind(this);
  }

  jebal(v) {
    this.bukkuk();
  }
  bukkuk() {
    console.log('bukkuk');
    db.collection('companion').doc('bukkuk').get().then(this.bukkukthen);
    firebaseApp.auth().onAuthStateChanged(this.afteremaildownload);
  }
  afteremaildownload(user) {
    if (user) {
      email = user.email;
      signIn = true;
    } else {
      email = '1';
      signIn = false;
    }

    this.setState(() => ({
      email: email,
    }));

    db.collection('users').doc(this.state.email).get().then(this.wishthen);
  }
  wishthen(doc) {
    // eslint-disable-next-line no-lone-blocks

    let docs = doc.data();
    this.setState(() => ({
      wishlist: docs['wished'],
    }));

    this.setState(
      () => (
        {
          score: score,
          wishlist: wished,
        },
        () => {
          alert('callback');
        }
      )
    );
    this.datarefresh(this.props.cg);
  }
  bukkukthen(doc) {
    var states = ['adult_bad', 'adult_normal', 'adult_good', 'adult_dance'];
    let docs = doc.data();
    let dic = this.state.img_src;

    for (var i = 0; i < Object.keys(docs).length; i++) {
      dic = this.state.img_src;
      dic[i] = docs[states[i]];
      this.setState((prv) => ({
        img_src: dic,
      }));
    }
    dic[4] = dic[2];
    this.setState((prv) => ({ img_src: dic }));
  }
  onesight() {
    var elements = document.getElementsByClassName('productbox');

    count++;
    for (var i = 0; i < elements.length; i++) {
      if (count % 2 === 1)
        elements[i].classList.add('ecoo' + this.state.ecoval[i]);
      else elements[i].classList.remove('ecoo' + this.state.ecoval[i]);
    }
  }

  datarefresh(cg) {
    count = 0;
    var product = db
      .collection('products')
      .get()
      .then((snapshot) => {
        this.setState((prevState) => ({
          name: [],
          price: [],
          imgg: [],
          a: [],
          ecoval: [],
          wished: [],
          id: [],
        }));
        //snapshot.forEach(datacheck);
        //alert(document.getElementById('pc'))
        snapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          products[doc.id] = doc.data();
          //  console.log(products);
          var vegan = document.getElementById('vegan').checked;
          var ap = document.getElementById('ap').checked;
          var harm = document.getElementById('harm').checked;
          var ecoonly = document.getElementById('ecoonly').checked;
          var veganvalid = !vegan || doc.data().vegan === vegan;
          var apvalid = !ap || doc.data().ap === ap;
          var harmvalid = !harm || doc.data().harm === harm;
          var cgtest = false;

          if (
            (cgg == 'tissue' || cgg == 'cushion' || cgg == 'living') &&
            (doc.data().category == 'tissue' ||
              doc.data().category == 'cushion')
          ) {
            cgtest = true;
          } else if (
            (cgg == 'shampoo' || cgg == 'toothpaste' || cgg == 'bath') &&
            (doc.data().category == 'toothpaste' ||
              doc.data().category == 'shampoo')
          ) {
            cgtest = true;
          } else if (
            (cgg == 'facial' || cgg == 'bag' || cgg == 'beauty') &&
            (doc.data().category == 'facial' || doc.data().category == 'bag')
          ) {
            cgtest = true;
          } else if (
            (cgg == 'scrubber' || cgg == 'detergent' || cgg == 'kitchen') &&
            (doc.data().category == 'scrubber' ||
              doc.data().category == 'detergent')
          ) {
            cgtest = true;
          }

          var product1 = document.getElementById('product1').checked;
          var product2 = document.getElementById('product2').checked;
          if (product1 == false && product2 == false) {
            product1 = true;
            product2 = true;
          }

          var tmpStr = '';
          if (product1 && !product2) {
            if (cgg == 'tissue' || cgg == 'cushion' || cgg == 'living')
              tmpStr = 'Tissue';
            else if (cgg == 'shampoo' || cgg == 'toothpaste' || cgg == 'bath')
              tmpStr = 'Shampoo';
            else if (cgg == 'facial' || cgg == 'bag' || cgg == 'beauty')
              tmpStr = 'Facial';
            else tmpStr = 'Scrubber';
          } else if (!product1 && product2) {
            if (cgg == 'tissue' || cgg == 'cushion' || cgg == 'living')
              tmpStr = 'Cushion';
            else if (cgg == 'shampoo' || cgg == 'toothpaste' || cgg == 'bath')
              tmpStr = 'Toothpaste';
            else if (cgg == 'facial' || cgg == 'bag' || cgg == 'beauty')
              tmpStr = 'Bag';
            else tmpStr = 'Detergent';
          } else if (product1 && product2) {
            if (cgg == 'tissue' || cgg == 'cushion' || cgg == 'living')
              tmpStr = 'Tissue, Cushion';
            else if (cgg == 'shampoo' || cgg == 'toothpaste' || cgg == 'bath')
              tmpStr = 'Shampoo, Toothpaste';
            else if (cgg == 'facial' || cgg == 'bag' || cgg == 'beauty')
              tmpStr = 'Facial, Bag';
            else tmpStr = 'Scrubber, Detergent';
          }

          this.setState((prevState) => ({
            route: tmpStr,
          }));

          var cgtest2 = false;

          if (
            product1 &&
            (cgg == 'tissue' || cgg == 'cushion' || cgg == 'living') &&
            doc.data().category == 'tissue'
          ) {
            cgtest2 = true;
          } else if (
            product2 &&
            (cgg == 'tissue' || cgg == 'cushion' || cgg == 'living') &&
            doc.data().category == 'cushion'
          ) {
            cgtest2 = true;
          } else if (
            product1 &&
            (cgg == 'shampoo' || cgg == 'toothpaste' || cgg == 'bath') &&
            doc.data().category == 'shampoo'
          ) {
            cgtest2 = true;
          } else if (
            product2 &&
            (cgg == 'shampoo' || cgg == 'toothpaste' || cgg == 'bath') &&
            doc.data().category == 'toothpaste'
          ) {
            cgtest2 = true;
          } else if (
            product1 &&
            (cgg == 'facial' || cgg == 'bag' || cgg == 'beauty') &&
            doc.data().category == 'facial'
          ) {
            cgtest2 = true;
          } else if (
            product2 &&
            (cgg == 'facial' || cgg == 'bag' || cgg == 'beauty') &&
            doc.data().category == 'bag'
          ) {
            cgtest2 = true;
          } else if (
            product1 &&
            (cgg == 'scrubber' || cgg == 'detergent' || cgg == 'kitchen') &&
            doc.data().category == 'scrubber'
          ) {
            cgtest2 = true;
          } else if (
            product2 &&
            (cgg == 'scrubber' || cgg == 'detergent' || cgg == 'kitchen') &&
            doc.data().category == 'detergent'
          ) {
            cgtest2 = true;
          }

          // var wishbool = wished.includes('' + doc.id) ? true : false;

          var ecovalid = !ecoonly || doc.data().eco > 0;
          // console.log(doc.id, " => ", doc.data());

          if (
            veganvalid &&
            apvalid &&
            harmvalid &&
            ecovalid &&
            cgtest &&
            cgtest2
          )
            this.setState((prevState) => ({
              name: [...prevState.name, doc.data().name],
              price: [...prevState.price, doc.data().price],
              imgg: [...prevState.imgg, doc.data().imgg],
              a: [...prevState.a, doc.data().a],
              ecoval: [...prevState.ecoval, doc.data().eco],
              id: [...prevState.id, doc.id],
            }));
        });

        var sum = 0;
        var i;
        for (i = 0; i < this.state.id.length; i++) {
          if (this.state.wishlist.includes('' + this.state.id[i])) {
            this.setState((prevState) => ({
              wished: [...prevState.wished, true],
            }));
          } else
            this.setState((prevState) => ({
              wished: [...prevState.wished, false],
            }));
        }

        var tmpScore = 0;
        if (this.state.wishlist.length == 0)
          this.setState((prevState) => ({
            score: 2,
          }));
        else {
          for (var i = 0; i < this.state.wishlist.length; i++) {
            tmpScore += products[this.state.wishlist[i]]['eco'];
          }
          score = Math.round(tmpScore / this.state.wishlist.length);
          console.log(tmpScore, score, '2');
          this.setState((prevState) => ({
            score: Math.round(tmpScore / this.state.wishlist.length),
          }));
        }
      });
  }

  componentWillMount() {
    this.bukkuk();
  }
  render() {
    // this.bukkuk();
    var states = ['adult_bad', 'adult_normal', 'adult_good', 'adult_dance'];
    const {
      name,
      price,
      imgg,
      a,
      ecoval,
      //img_src,
      score,
      wished,
      //id,
      //wishlist,
      email,
      signIn,
    } = this.state;

    return (
      <header>
        <div>
          <div className="router">
            <text id="router-text" className="mv2cat">
              <b>
                {cgg == 'scrubber' || cgg == 'detergent' || cgg == 'kitchen'
                  ? 'Kitchen'
                  : cgg == 'tissue' || cgg == 'cushion' || cgg == 'living'
                  ? 'Living'
                  : cgg == 'shampoo' || cgg == 'toothpaste' || cgg == 'bath'
                  ? 'Bathroom'
                  : cgg == 'bag' || cgg == 'facial' || cgg == 'beauty'
                  ? 'Bedroom'
                  : ''}
              </b>
            </text>
            <text id="router-text">
              {' '}
              <span
                height="8px"
                class="iconify"
                data-icon="whh:bigger"
                data-inline="false"
                padding-bottom="5px"
              ></span>{' '}
            </text>
            <text id="router-text">{this.state.route}</text>
          </div>
          <div className="router2">
            <span
              class="iconify"
              data-icon="mdi:alpha-l"
              data-inline="false"
              width="20px"
            ></span>
            <div class="checkin2">
              <label for="product1" className="c_name">
                {cgg == 'tissue' || cgg == 'cushion' || cgg == 'living'
                  ? 'Tissue'
                  : cgg == 'scrubber' || cgg == 'detergent' || cgg == 'kitchen'
                  ? 'Scrubber'
                  : cgg == 'facial' || cgg == 'bag' || cgg == 'beauty'
                  ? 'Facial'
                  : 'Shampoo'}
              </label>
              <input
                className="c_checkboxes"
                type="checkbox"
                id="product1"
                value="product1"
                defaultChecked={
                  cgg == 'tissue' ||
                  cgg == 'shampoo' ||
                  cgg == 'facial' ||
                  cgg == 'scrubber'
                    ? true
                    : false
                }
                onClick={this.datarefresh}
              ></input>
              <label className="labels" for="product1"></label>
            </div>
          </div>
          <div className="router2">
            <span
              class="iconify"
              data-icon="mdi:alpha-l"
              data-inline="false"
              width="20px"
            ></span>
            <div class="checkin2">
              <label for="product2" className="c_name">
                {cgg == 'tissue' || cgg == 'cushion' || cgg == 'living'
                  ? 'Cushion'
                  : cgg == 'scrubber' || cgg == 'detergent' || cgg == 'kitchen'
                  ? 'Detergent'
                  : cgg == 'facial' || cgg == 'bag' || cgg == 'beauty'
                  ? 'Bag'
                  : 'Toothpaste'}
              </label>
              <input
                className="c_checkboxes"
                type="checkbox"
                id="product2"
                value="product2"
                defaultChecked={
                  cgg == 'cushion' ||
                  cgg == 'toothpaste' ||
                  cgg == 'bag' ||
                  cgg == 'detergent'
                    ? true
                    : false
                }
                onClick={this.datarefresh}
              ></input>
              <label className="labels" for="product2"></label>
            </div>
          </div>
          <div className="fixed_container">
            <div className="checkbox1kk">
              <span class="checkin">
                <label for="ecoonly" className="f_name">
                  Eco-friendly
                </label>
                <input
                  className="checkboxes"
                  type="checkbox"
                  id="ecoonly"
                  value="에코"
                  onClick={this.datarefresh}
                ></input>
                <label className="labels" for="ecoonly"></label>
              </span>
              <span class="checkin">
                <label for="vegan" className="f_name">
                  Save Environment
                </label>
                <input
                  className="checkboxes"
                  type="checkbox"
                  id="vegan"
                  value="비건"
                  onClick={this.datarefresh}
                />
                <label className="labels" for="vegan"></label>
              </span>
              <span class="checkin">
                <label for="ap" className="f_name">
                  Protect Animal
                </label>
                <input
                  className="checkboxes"
                  type="checkbox"
                  id="ap"
                  value="동물보호"
                  onClick={this.datarefresh}
                ></input>
                <label className="labels" for="ap"></label>
              </span>
              <span class="checkin">
                <label for="harm" className="f_name">
                  Stay healthy
                </label>
                <input
                  className="checkboxes"
                  type="checkbox"
                  id="harm"
                  value="유해물질x"
                  onClick={this.datarefresh}
                ></input>
                <label className="labels" for="harm"></label>
              </span>
              <button
                id="onesight"
                className="inaglance"
                onClick={this.onesight}
              >
                In a Glance
              </button>
            </div>
          </div>
        </div>
        <div id="ccontainer">
          {/* <div class="kkk"> {cgg}</div> */}

          <div class="pcandimg">
            <div id="pc">
              <Productlist
                name={name}
                price={price}
                imgg={imgg}
                a={a}
                ecoval={ecoval}
                wished={this.state.wished}
                id={this.state.id}
                email={this.state.email}
                jebal={this.jebal}
              ></Productlist>
            </div>
            <div>
              <div className="c_companion" id="cprofile">
                <a href="/mypage">
                  <img
                    id="bukkuk"
                    className="companion_gif"
                    src={this.state.img_src[this.state.score]}
                    alt="companion"
                    key={this.state.score}
                  ></img>
                </a>
                {/* <p>name : bukkuk</p>
                <p>state : {states[score]}</p> */}
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default CategoryPage;
