import './style.css';
import React, { useState, useEffect } from 'react';
import Heart from 'react-animated-heart';
import { db } from '../../firebase';
import RecProduct from '../RecProduct';
import { Button } from '@material-ui/core';
import { facials_element, facials } from './product_array';
import { tissue_element, tissue } from './product_array';
import { toothpaste_element, toothpaste } from './product_array';
import { scrubber_element, scrubber } from './product_array';
import { bag_element, bag } from './product_array';
import { detergent_element, detergent } from './product_array';
import { cushion_element, cushion } from './product_array';
import { shampoo_element, shampoo } from './product_array';
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom';

function DetailPage(props) {
  //console.log("props",props)
  const [recArray, setRecArray] = useState([]);
  const [wished, setWished] = useState([]);
  const [category, setCategory] = useState();
  const [products, setProducts] = useState({});
  const [img_src, setImgSrc] = useState({});
  const [score, setScore] = useState(0);
  const [console2, setConsole2] = useState();
  const [console3, setConsole3] = useState(0);
  const [bukkuk, setBukkuk] = useState([]);
  const [stage, setStage] = useState([]);
  const [status, setStatus] = useState();
  const [isClick, setClick] = useState();
  const [userInfo, setUserInfo] = useState({});
  const [idd, setIdd] = useState();
  const [product_id, setProductId] = useState(0);
  const [e_length, setELength] = useState(0);
  const [elements, setElements] = useState([]);
  const [products_in, setProductIn] = useState([]);
  // const [dominant, setDominant] = useState(0);
  // const [subDominant, setSubDominant] = useState(0);
  // const [triDominant, setTriDominant] = useState(0);
  // const [img1, setImg1] = useState('');
  // const [img2, setImg2] = useState('');
  // const [img3, setImg3] = useState('');
  const dominant = 0;

  const name = props.location.state.name;
  const price = props.location.state.price;
  const img = props.location.state.imgg;
  const link = props.location.state.link;
  const idx = props.location.state.idx;
  const ecoval = props.location.state.ecoval;
  var value = '';
  var cgg = '';
  // var product_id = 0;
  var states = ['adult_bad', 'adult_normal', 'adult_good', 'adult_dance'];
  // console.log('num', idx + 1);
  var avg = function (list) {
    var sum = 0;
    for (var i = 0; i < list.length; i++) {
      sum += list[i];
    }
    return sum / list.length;
  };

  var heartClick = function (e) {
    // console.log('heartIdd', idd);
    var index = wished.indexOf(idd);
    // console.log('index', index);
    if (!isClick) {
      if (index === -1) {
        wished.push(idd);
      }
    } else {
      if (index !== -1) {
        wished.splice(index, 1);
      }
    }
    setClick(!isClick);
    setWished(wished);
    db.collection('users').doc('1').update({
      wished: wished,
    });
    setStatus(
      avg(
        wished.map(function (el) {
          db.collection('products')
            .doc(String(el))
            .get()
            .then(function (doc1) {
              var docs1 = doc1.data();
              return docs1['eco'];
            });
        })
      )
    );
    isClick ? setConsole2('true') : setConsole2('false');
  };

  useEffect(() => {
    console.log('db get');
    db.collection('products')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          ////////get product list//////////
          var docs = doc.data();
          let dic = products;
          dic[doc.id] = docs;
          setProducts(dic);

          // console.log('products check', products);

          if (dic[doc.id]['name'] == name) {
            cgg = products[doc.id]['category'];
            var tmp = Number(doc.id);

            if (cgg == 'facial') {
              setELength(facials_element.length);
              setElements(facials_element);
              setProductIn(facials);
              for (var i = 0; i < facials.length; i++) {
                if (facials[i][0] == tmp) {
                  setProductId(i);
                  break;
                }
              }
            } else if (cgg == 'tissue') {
              setELength(tissue_element.length);
              setElements(tissue_element);
              setProductIn(tissue);
              for (var i = 0; i < tissue.length; i++) {
                if (tissue[i][0] == tmp) {
                  setProductId(i);
                  break;
                }
              }
            } else if (cgg == 'toothpaste') {
              setELength(toothpaste_element.length);
              setElements(toothpaste_element);
              setProductIn(toothpaste);
              for (var i = 0; i < toothpaste.length; i++) {
                if (toothpaste[i][0] == tmp) {
                  setProductId(i);
                  break;
                }
              }
            } else if (cgg == 'scrubber') {
              setELength(scrubber_element.length);
              setElements(scrubber_element);
              setProductIn(scrubber);
              for (var i = 0; i < scrubber.length; i++) {
                if (scrubber[i][0] == tmp) {
                  setProductId(i);
                  break;
                }
              }
            } else if (cgg == 'bag') {
              setELength(bag_element.length);
              setElements(bag_element);
              setProductIn(bag);
              for (var i = 0; i < bag.length; i++) {
                if (bag[i][0] == tmp) {
                  setProductId(i);
                  break;
                }
              }
            } else if (cgg == 'detergent') {
              setELength(detergent_element.length);
              setElements(detergent_element);
              setProductIn(detergent);
              for (var i = 0; i < detergent.length; i++) {
                if (detergent[i][0] == tmp) {
                  setProductId(i);
                  break;
                }
              }
            } else if (cgg == 'cushion') {
              setELength(cushion_element.length);
              setElements(cushion_element);
              setProductIn(cushion);
              for (var i = 0; i < cushion.length; i++) {
                if (cushion[i][0] == tmp) {
                  setProductId(i);
                  break;
                }
              }
            } else if (cgg == 'shampoo') {
              setELength(shampoo_element.length);
              setElements(shampoo_element);
              setProductIn(shampoo);
              for (var i = 0; i < shampoo.length; i++) {
                if (shampoo[i][0] == tmp) {
                  setProductId(i);
                  break;
                }
              }
            }

            console.log('::::::', elements, products_in);
            console.log('category', cgg, 'product_id', product_id);
            console.log(products_in[product_id]);
            debugger;
          }
          /////////get product id, category///////////
          if (doc.data().name === name) {
            setIdd(doc.id);
            setCategory(doc.data().category);
            db.collection('products1')
              .doc(doc.id)
              .get()
              .then(function (doc2) {
                setStage(doc2.data()['stage']);
                console.log('::::::::', doc2.data()['stage']);
              });
            db.collection('users')
              .doc('1')
              .get()
              .then(function (docc) {
                var docs = docc.data();
                setWished(docs['wished']);
                setScore(docs['score']);
                var clicked = !!(docs['wished'].indexOf(doc.id) + 1);
                setStatus(
                  avg(
                    wished.map(function (el) {
                      db.collection('products')
                        .doc(String(el))
                        .get()
                        .then(function (doc1) {
                          var docs1 = doc1.data();
                          return docs1['eco'];
                        });
                    })
                  )
                );
                setClick(clicked);
              });
          }
        });
      });

    db.collection('companion')
      .doc('bukkuk')
      .get()
      .then(function (doc) {
        let docs = doc.data();
        // console.log('link', link);
        setImgSrc([]);
        for (var i = 0; i < Object.keys(docs).length; i++) {
          let dic = img_src;
          dic[i] = docs[states[i]];
          setImgSrc(dic);
        }
        let tdic = img_src;
        tdic[4] = img_src[2];
        // console.log('companion img source list', img_src);
      });
  }, [product_id]);

  useEffect(() => {
    console.log('page re-rendered');
  }, [product_id]);

  return (
    <div class="whole">
      <div className="d_companion">
        <a href="/mypage">
        <img
          id="bukkuk"
          className="companion_gif"
          src={img_src[score]}
          alt="companion"
          key={status}
          margin-left="-10%"
          ></img>
          </a>
      </div>
      <div className="wrap">
        <div className="img">
          <img
            src={img}
            alt="Product image"
            width="500px"
            height="500px"
            className="product_img"
          ></img>
        </div>
        <div className="info">
          <div className="row1">
            <h1 className="product_name">{name}</h1>
            <Heart className="heart" isClick={isClick} onClick={heartClick} />
            <div
              className="share"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                // console.log('copy');
                alert('copied');
              }}
            >
              <img src="/images/share.png" height="30px" />
            </div>

            <a href={link}>
              <div className="buy">
                <span
                  class="iconify"
                  data-icon="clarity:shopping-bag-line"
                  data-inline="false"
                  height="35px"
                ></span>
              </div>
            </a>
          </div>
          <div className="row3">
            <div className="price">
              {price}
              <span>&#8361;</span>
            </div>

            {/* <Button className="gotobuy" variant="contained">
                Go to Buy
              </Button> */}
          </div>
          <div className="row2">
            {stage[0] == 0 ? (
              <div className="feature1" id="a">
                <div className="image">
                  <img
                    src="/images/setting.png"
                    height="30px"
                    alt="icons"
                    className="icons"
                  />
                </div>
                <div>Production</div>
                <div>Process</div>
              </div>
            ) : (
              <div className="feature2" id="b">
                <div className="image">
                  <img
                    alt="icons"
                    className="icons"
                    src="/images/setting.png"
                    height="30px"
                  />
                </div>
                <div>Production</div>
                <div>Process</div>
              </div>
            )}
            {stage[1] == 0 ? (
              <div className="feature1" id="a">
                <div className="image">
                  <img
                    alt="icons"
                    src="/images/hello.png"
                    height="30px"
                    className="icons"
                  />
                </div>
                <div>Using</div>
                <div>Product</div>
              </div>
            ) : (
              <div className="feature2" id="b">
                <div className="image">
                  <img
                    alt="icons"
                    src="/images/hello.png"
                    height="30px"
                    className="icons"
                  />
                </div>
                <div>Using</div>
                <div>Product</div>
              </div>
            )}
            {stage[2] == 0 ? (
              <div className="feature1" id="a">
                <div className="image">
                  <img
                    src="/images/bin.png"
                    height="30px"
                    alt="icons"
                    className="icons"
                  />
                </div>
                <div>After</div>
                <div>Use</div>
              </div>
            ) : (
              <div className="feature2" id="b">
                <div className="image">
                  <img
                    src="/images/bin.png"
                    height="30px"
                    alt="icons"
                    className="icons"
                  />
                </div>
                <div>After</div>
                <div>Use</div>
              </div>
            )}
          </div>
        </div>
      </div>
      {ecoval > 0 ? (
        <div>
          <div>
            {products_in != null && products_in.length > 0 ? (
              <div>
                <Link
                  to={{
                    pathname: `/detail/`,
                    state: {
                      name: products_in[0][1],
                      price: products_in[0][2],
                      imgg: products_in[0][e_length],
                      link: products_in[0][e_length+2],
                      ecoval: Number(products_in[0][e_length+1]),
                      idx: products_in[0][e_length+3],
                    },
                  }}
                >
                <img
                  alt="product_img"
                  className="oone"
                  src={products_in[0][elements.length]}
                    width="250px"
                    onClick={() => {setProductId(0)}}
                ></img>
                </Link>
                <Link
                  to={{
                    pathname: `/detail/`,
                    state: {
                      name: products_in[1][1],
                      price: products_in[1][2],
                      imgg: products_in[1][e_length],
                      link: products_in[1][e_length+2],
                      ecoval: Number(products_in[1][e_length+1]),
                      idx: products_in[1][e_length+3],
                    },
                  }}
                >
                <img
                  alt="product_img"
                  className="two"
                  src={products_in[1][elements.length]}
                    width="250px"
                    onClick={() => {setProductId(1)}}
                  ></img>
                </Link>
                <Link
                  to={{
                    pathname: `/detail/`,
                    state: {
                      name: products_in[2][1],
                      price: products_in[2][2],
                      imgg: products_in[2][e_length],
                      link: products_in[2][e_length+2],
                      ecoval: Number(products_in[2][e_length+1]),
                      idx: products_in[2][e_length+3],
                    },
                  }}
                >
                <img
                  alt="product_img"
                  className="two"
                  src={products_in[2][elements.length]}
                    width="250px"
                    onClick={() => {setProductId(2)}}
                  ></img>
                </Link>
              </div>
            ) : null}
          </div>
          <div className="table3">
            {products_in != null &&
            products_in.length > 0 &&
            product_id != null ? (
              <table>
                <thead> {cgg} </thead>
                <tbody>
                  {products_in[product_id].map((val, index) =>
                    index != 0 && index < e_length ? (
                      <tr>
                        <td className="first_col" id="factors">
                          {' '}
                          {elements[index]}{' '}
                        </td>
                        <td className="second_col" id={(index == 1)?"green1":"notgreen"}>
                          {' '}
                          {products_in[0][index]}{' '}
                        </td>{' '}
                        <td className="second_col" id={(index == 1)?"green1":"notgreen"}>
                          {' '}
                          {products_in[1][index]}{' '}
                        </td>
                        <td className="second_col" id={(index == 1)?"green1":"notgreen"}>
                          {' '}
                          {products_in[2][index]}{' '}
                        </td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
            ) : null}
          </div>
        </div>
      ) : (
        <div>
            <div>
              {products_in != null && products_in.length > 0 ? (
                <div>
                <Link
                to={{
                  pathname: `/detail/`,
                  state: {
                    name: products_in[product_id][1],
                    price: products_in[product_id][2],
                    imgg: products_in[product_id][e_length],
                    link: products_in[product_id][e_length+2],
                    ecoval: Number(products_in[product_id][e_length+1]),
                    idx: products_in[product_id][e_length+3],
                  },
                }}
              >
          <img
            alt="product_img"
            className="one"
            src={img}
                      width="250px"
                      onclick = {()=>{}}
              ></img>
              </Link>
                <Link
                to={{
                  pathname: `/detail/`,
                  state: {
                    name: products_in[0][1],
                    price: products_in[0][2],
                    imgg: products_in[0][e_length],
                    link: products_in[0][e_length+2],
                    ecoval: Number(products_in[0][e_length+1]),
                    idx: products_in[0][e_length+3],
                  },
                }}
              >
              <img
                className="two"
                alt="product_img"
                src={products_in[0][elements.length]}
                      width="250px"
                      onClick={() => {setProductId(0)}}
              ></img>
                  </Link>
                  </div>
            ) : null}
          </div>
          <div>
            {products_in != null &&
            products_in.length > 0 &&
            product_id != null ? (
              <table>
                <thead> {cgg} </thead>
                <tbody>
                  {products_in[product_id].map((val, index) =>
                    index != 0 && index < e_length ? (
                      <tr>
                        <td className="first_col" id="factors">
                          {' '}
                          {elements[index]}{' '}
                        </td>
                        <td className="second_col"> {val} </td>
                        <td className="third_col" id="green1">
                          {' '}
                          {products_in[dominant][index]}{' '}
                        </td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailPage;
