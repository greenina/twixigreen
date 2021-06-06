
import './style.css';
import './animation.css';
import React, { useState, useEffect } from 'react';
import Heart from 'react-animated-heart';
import { db, firebaseApp } from '../../firebase';
import { facials_element, facials } from './product_array';
import { tissue_element, tissue } from './product_array';
import { toothpaste_element, toothpaste } from './product_array';
import { scrubber_element, scrubber } from './product_array';
import { bag_element, bag } from './product_array';
import { detergent_element, detergent } from './product_array';
import { cushion_element, cushion } from './product_array';
import { shampoo_element, shampoo } from './product_array';
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom';
import Modal from '../Modal/Modal';


function DetailPage(props) {
 
  const [wished, setWished] = useState([]);
  const [category, setCategory] = useState();
  const [products, setProducts] = useState({});
  const [img_src, setImgSrc] = useState({});
  const [score, setScore] = useState(0);
  const [stage, setStage] = useState([]);
  const [status, setStatus] = useState();
  const [isClick, setClick] = useState();
  const [idd, setIdd] = useState();
  const [product_id, setProductId] = useState(0);
  const [e_length, setELength] = useState(0);
  const [elements, setElements] = useState([]);
  const [products_in, setProductIn] = useState([]);
  const [signIn, setSignIn] = useState(false);
  const [email, setEmail] = useState('1');
  const [textBalloon, setTextBalloon] = useState("")
  const [heart, setHeart] = useState(false)
  const [share, setShare] = useState(0)
  const [buy, setBuy] = useState(false)
  const [imgId, setImgId] = useState("a1")
  const [ modalOpen, setModalOpen ] = useState(false);
  

  const dominant = 0;

  const name = props.location.state.name;
  const price = props.location.state.price;
  const img = props.location.state.imgg;
  const link = props.location.state.link;
  const ecoval = props.location.state.ecoval;
  var cgg = '';
  var states = ['adult_bad', 'adult_normal', 'adult_good', 'adult_dance'];
  const openModal = () => {
    setModalOpen(true);
  }
  const closeModal = () => {
    setModalOpen(false);
  }


  var avg = function (list) {
    var sum = 0;
    for (var i = 0; i < list.length; i++) {
      sum += list[i];
    }
    return sum / list.length;
  };


  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(function (user) {
      if (user) {
        setSignIn(true);
        setEmail(user.email);
      } else {
        setSignIn(false);
        setEmail('1');
      }
    });

    db.collection('companion')
      .doc('bukkuk')
      .get()
      .then(function (doc) {
        let docs = doc.data();
       
        setImgSrc([]);
        for (var i = 0; i < Object.keys(docs).length; i++) {
          let dic = img_src;
          dic[i] = docs[states[i]];
          setImgSrc(dic);
        }
        let tdic = img_src;
        tdic[4] = img_src[2];
        
      });
  }, []);

  var heartClick = function (e) {
   
    var index = wished.indexOf(idd);
   
    if (!isClick) {
      if (index === -1) {
        wished.push(idd);
      }
      if(ecoval==0){
        setTextBalloon('/images/text21.png')
        setImgId("a1")
        setTimeout(function(){setTextBalloon('/images/text27.png');setImgId("a7")},2000)
      }
      else{
        setTextBalloon('/images/text23.png')
        setImgId("a3")
        setTimeout(function(){setTextBalloon('/images/text25.png');setImgId("a5")},2000)
      }
    } else {
      if (index !== -1) {
        wished.splice(index, 1);
      }
      if(ecoval==0){
        setTextBalloon('/images/text22.png')
        setImgId("a2")
        setTimeout(function(){setTextBalloon('/images/text27.png');setImgId("a7")},2000)
        
      }
      else{
        setTextBalloon('/images/text24.png')
        setImgId("a4")
        setTimeout(function(){setTextBalloon('/images/text26.png')},2000)
        setImgId("a6")
      }
    }
    setClick(!isClick);
    setWished(wished);
    db.collection('users').doc(email).update({
      wished: wished,
    });

    var tmpScore = 0;
    for (var i = 0; i < wished.length; i++) {
      tmpScore += products[wished[i]]['eco'];
    }
    if (wished.length > 0) {
      setScore(Math.round(tmpScore / wished.length));
      // var
      // db.collection('users').doc('1').set()
    } else setScore(4);
   
  };

  useEffect(() => {
    window.scrollTo(0, 0); 
    db.collection('products')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          ////////get product list//////////
          var docs = doc.data();
          let dic = products;
          dic[doc.id] = docs;
          setProducts(dic);

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
            } 
            else if (cgg == 'tissue') {
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
          }

          if (doc.data().name === name) {
            setIdd(doc.id);
            setCategory(doc.data().category);
            db.collection('products1')
              .doc(doc.id)
              .get()
              .then(function (doc2) {
                setStage(doc2.data()['stage']);
               
              });
            db.collection('users')
              .doc(email)
              .get()
              .then(function (docc) {
                var docs = docc.data();
                setWished(docs['wished']);

                var tmpScore = 0;
                if (docs['wished'].length > 0) {
                  for (var i = 0; i < docs['wished'].length; i++) {
                    tmpScore += products[docs['wished'][i]]['eco'];
                  
                  }
                  setScore(Math.round(tmpScore / docs['wished'].length));
                 
                } else setScore(4);

                var clicked = !!(docs['wished'].indexOf(doc.id) + 1);
                setClick(clicked);
    if(ecoval==0){
      setTextBalloon('/images/text27.png')
      setImgId("a7")
    }
    else if(clicked){
      setTextBalloon("images/text25.png")
      setImgId("a5")
    }
    else{
      setTextBalloon("/images/text26.png")
      setImgId("a6")
    }
      });
        }
          });
            });
  }, [product_id, email]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [score]);

  const mvPage = () => {
    let parentCat =
      category == 'scrubber' || category == 'detergent'
        ? 'kitchen'
        : category == 'tissue' || category == 'cushion'
        ? 'living'
        : category == 'shampoo' || category == 'toothpaste'
        ? 'bath'
        : category == 'bag' || category == 'facial'
        ? 'beauty'
        : '';
    document.location.href = '/category/' + parentCat;
  };

  return (
    <div>
      <link href="https://emoji-css.afeld.me/emoji.css" rel="stylesheet"></link> 
            
      <img id={imgId} class="slideUp"src={textBalloon}/>
      <div className="router">
        <text id="router-text" className="mv2cat" onClick={mvPage}>
          <b>
            {category == 'scrubber' || category == 'detergent'
              ? 'Kitchen'
              : category == 'tissue' || category == 'cushion'
              ? 'Living'
              : category == 'shampoo' || category == 'toothpaste'
              ? 'Bathroom'
              : category == 'bag' || category == 'facial'
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
        <text id="router-text">{category}</text>
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
        <text id="router-text">{name}</text>
      </div>
      <hr className="hr-line" />
      <div class="whole">
        
        <div className="d_companion">
          <a href="/mypage">
            <img
              id="bukkuk"
              className="d_companion_gif"
              src={img_src[score]}
              alt="companion"
              key={status}
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
              <div className="icon1">
                <div className="icon2">
                  <div className="heart1">
                    <div className="heartHome"onMouseEnter={()=>{console.log("mouse on heart");setHeart(true)}} onMouseLeave={()=>{console.log("mouse leave heart");setHeart(false)}}>
                    <Heart className="heart" isClick={isClick} onClick={heartClick} />
                    </div>
                    {heart?<div className="hearta"><div>wish</div></div>:<div className="heartb"></div>}
                  </div>
                  <div className="space"></div>
                  <div className="share1">
                    <div className="shareContainer">
                    <div
                    onMouseEnter={()=>{console.log("mouse on heart");setShare(1)}} onMouseLeave={()=>{console.log("mouse leave heart");setShare(0)}}
                      className="share"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        openModal();
                        setShare(2);
                        setTimeout(function(){setShare(0)},1500)
                      }}
                    >

                    <img src="/images/copy.png" height="35px"/>
                    {/* <img src="/images/share.png" height="30px" /> */}
                    </div>
                    <Modal link={window.location.href} open={ modalOpen } close={ closeModal } header="Modal heading">

                // Modal.js <main> { props.children } </main>에 내용이 입력된다. 
                리액트 함수형 모달 팝업창입니다.
                쉽게 만들 수 있어요. 
                같이 만들어봐요!
            </Modal>
                    <div className="space2"></div>
                    </div>
                    {share==1?<div className="sharea">share</div>:<div></div>}
                  </div>
                <div className="buy1">
                  <a onClick={() => window.open(link, '_blank')}>
                    <div className="buy"
                    onMouseEnter={()=>{console.log("mouse on heart");setBuy(true)}} onMouseLeave={()=>{console.log("mouse leave heart");setBuy(false)}}
                    >
                      <span
                        class="iconify"
                        data-icon="clarity:shopping-bag-line"
                        data-inline="false"
                        height="35px"
                      ></span>
                    </div>
                  </a>
                  {buy?<div className="buya">buy</div>:<div classname="buyb"></div>}

                </div>
              </div>
              <div className="space3"></div>
              {share==1?<div></div>:(share==0?<div></div>:
              <div className="sharec">Copied to clipboard<i class="em em-white_check_mark" aria-role="presentation" aria-label="WHITE HEAVY CHECK MARK"></i></div>)}
            </div>
              
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
                  <div className="contents1">
                    Production process is not eco-friendly. Those processes emit
                    a range of pollutants, and substantial environmental
                    safeguards are needed.
                  </div>
                  <div className="image">
                    <img
                      src="/images/setting.png"
                      height="30px"
                      alt="icons"
                      className="icons"
                    />
                  </div>
                  <div>Production</div>
                  {/* <div>Process</div> */}
                </div>
              ) : (
                <div className="feature2" id="b">
                  <div className="contents2">
                    Production process is eco-friendly. Those processes are
                    making effort to minimize the amount of pollutants.
                  </div>

                  <div className="image">
                    <img
                      alt="icons"
                      className="icons"
                      src="/images/setting.png"
                      height="30px"
                    />
                  </div>
                  <div>Production</div>
                  {/* <div>Process</div> */}
                </div>
              )}
              {stage[1] == 0 ? (
                <div className="feature1" id="a">
                  <div className="contents1">
                    During using this product, you may harm the environment.
                    Please use other eco-friendly substitute to become a hero
                    for the Earth.
                  </div>
                  <div className="image">
                    <img
                      alt="icons"
                      src="/images/hello.png"
                      height="30px"
                      className="icons"
                    />
                  </div>
                  <div>Usage</div>
                  {/* <div>Product</div> */}
                </div>
              ) : (
                <div className="feature2" id="b">
                  <div className="contents2">
                    During using this product, you do not have to harm the
                    environment a lot. Using this product may be the start of
                    doing your best.
                  </div>
                  <div className="image">
                    <img
                      alt="icons"
                      src="/images/hello.png"
                      height="30px"
                      className="icons"
                    />
                  </div>
                  <div>Usage</div>
                  {/* <div>Product</div> */}
                </div>
              )}
              {stage[2] == 0 ? (
                <div className="feature1" id="a">
                  <div className="contents1">
                    There is a high possibility that this product will return to
                    nature after use and cause trouble. If we recycled more, we
                    would save more.
                  </div>
                  <div className="image">
                    <img
                      src="/images/bin.png"
                      height="30px"
                      alt="icons"
                      className="icons"
                    />
                  </div>
                  <div>Afterward</div>
                  {/* <div>Use</div> */}
                </div>
              ) : (
                <div className="feature2" id="b">
                  <div className="contents2">
                    After use, this product can be recycled at the end of their
                    useful life. You are the best to think about the environment
                    until after using the product.
                  </div>
                  <div className="image">
                    <img
                      src="/images/bin.png"
                      height="30px"
                      alt="icons"
                      className="icons"
                    />
                  </div>
                  <div>Afterward</div>
                  {/* <div>Use</div> */}
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
                        link: products_in[0][e_length + 2],
                        ecoval: Number(products_in[0][e_length + 1]),
                        idx: products_in[0][e_length + 3],
                      },
                    }}
                  >
                    <img
                      alt="product_img"
                      className="oone"
                      src={products_in[0][elements.length]}
                      width="250px"
                      onClick={() => {
                        setProductId(0);
                      }}
                    ></img>
                  </Link>
                  <Link
                    to={{
                      pathname: `/detail/`,
                      state: {
                        name: products_in[1][1],
                        price: products_in[1][2],
                        imgg: products_in[1][e_length],
                        link: products_in[1][e_length + 2],
                        ecoval: Number(products_in[1][e_length + 1]),
                        idx: products_in[1][e_length + 3],
                      },
                    }}
                  >
                    <img
                      alt="product_img"
                      className="two"
                      src={products_in[1][elements.length]}
                      width="250px"
                      onClick={() => {
                        setProductId(1);
                      }}
                    ></img>
                  </Link>
                  <Link
                    to={{
                      pathname: `/detail/`,
                      state: {
                        name: products_in[2][1],
                        price: products_in[2][2],
                        imgg: products_in[2][e_length],
                        link: products_in[2][e_length + 2],
                        ecoval: Number(products_in[2][e_length + 1]),
                        idx: products_in[2][e_length + 3],
                      },
                    }}
                  >
                    <img
                      alt="product_img"
                      className="two"
                      src={products_in[2][elements.length]}
                      width="250px"
                      onClick={() => {
                        setProductId(2);
                      }}
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
                          <td
                            className="second_col"
                            id={index == 1 ? 'green1' : 'notgreen'}
                          >
                            {' '}
                            {products_in[0][index]}{' '}
                          </td>{' '}
                          <td
                            className="second_col"
                            id={index == 1 ? 'green1' : 'notgreen'}
                          >
                            {' '}
                            {products_in[1][index]}{' '}
                          </td>
                          <td
                            className="second_col"
                            id={index == 1 ? 'green1' : 'notgreen'}
                          >
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
                        link: products_in[product_id][e_length + 2],
                        ecoval: Number(products_in[product_id][e_length + 1]),
                        idx: products_in[product_id][e_length + 3],
                      },
                    }}
                  >
                    <img
                      alt="product_img"
                      className="one"
                      src={img}
                      width="250px"
                      onclick={() => {}}
                    ></img>
                  </Link>
                  <Link
                    to={{
                      pathname: `/detail/`,
                      state: {
                        name: products_in[0][1],
                        price: products_in[0][2],
                        imgg: products_in[0][e_length],
                        link: products_in[0][e_length + 2],
                        ecoval: Number(products_in[0][e_length + 1]),
                        idx: products_in[0][e_length + 3],
                      },
                    }}
                  >
                    <img
                      className="two"
                      alt="product_img"
                      src={products_in[0][elements.length]}
                      width="250px"
                      onClick={() => {
                        setProductId(0);
                      }}
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
    </div>
  );
}

export default DetailPage;

