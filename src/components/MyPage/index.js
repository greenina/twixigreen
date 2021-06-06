/* eslint-disable jsx-a11y/alt-text */
import './style.css';
import { db, firebaseApp, firebase } from '../../firebase';
import React, { useState, useEffect } from 'react';
import WishProduct from '../WishProduct';
import CurProduct from '../CurProduct';
import RecProduct from '../RecProduct';
import Tippy from 'react-tooltip';
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function MyPage() {
  // const [img_num, setImgNum] = useState(0);
  const [img_src, setImgSrc] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [products, setProducts] = useState({});
  const [score, setScore] = useState(0);
  const [wishes, setWishes] = useState(0);
  const [printed, setPrinted] = useState([]);
  const [ishovering, setishovering] = useState(false);
  const [first, setFirst] = useState(0);
  const [overlayMode, setOverlay] = useState(0);
  const [overlayInfo, setOverlayInfo] = useState([]);
  const [recArray, setRecArray] = useState([]);
  const [signIn, setSignIn] = useState(false);
  const [email, setEmail] = useState('1');
  const [comp, setComp] = useState('Bukkuk');
  //const [mail,setMail] = useState('1')
  const mail = useSelector((state) => state.user.user);
  var del_idx = [];
  var timer;
  var delay = 1000;
  var states = [
    'adult_bad',
    'adult_normal',
    'adult_good',
    'adult_dance',
    'adult_good',
  ];
  var show_states = ['Bad', 'Normal', 'Good', 'Dance', 'Good'];

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
        //console.log('companion img source list', img_src);
      });

    var count = 0;
    db.collection('products')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var docs = doc.data();
          let dic = products;
          count++;
          dic[doc.id] = docs;
          setProducts(dic);
        });
        //console.log('product list', products);
      });
  }, [wishes]);

  useEffect(() => {
    var infos = ['name', 'wished', 'experience', 'score', 'comp'];
    clearTimeout(timer);
    var bukkuk = document.getElementById('companion_gif');
    // console.log(bukkuk);
    //console.log('---------', overlayMode, overlayInfo, recArray);
    if (bukkuk != null && overlayMode != 0) {
      bukkuk.style = 'margin-left: 10%';
    }

    db.collection('users')
      .doc(email)
      .get()
      .then(function (doc) {
        let docs = doc.data();
        setUserInfo(docs);

        var tmpScore = 0;
        //console.log('userInfo', userInfo, email);
        if (docs['wished'].length > 0) {
          for (var i = 0; i < docs['wished'].length; i++) {
            tmpScore += products[docs['wished'][i]]['eco'];
            //console.log('tmpScore', tmpScore);
          }
          setScore(Math.round(tmpScore / docs['wished'].length));
          //console.log(
          //  "user's eco score",
          //  Math.round(tmpScore / docs['wished'].length)
          //);
        } else setScore(4);
        //console.log('userInfoandfirst', docs, first);
        setWishes(docs['wished'].length);

        if (first == 0) {
          setPrinted(docs['wished']);
          //console.log('printed wishlist changed');
          setFirst(1);

          //debugger;
        }
        //console.log('printed', printed);
        //console.log(products[printed[0]]);

        //console.log(':::::::::::::', score, userInfo);
        //debugger;

        var tmpDic = docs;
        tmpDic['score'] = score;
        //debugger;
        db.collection('users').doc(email).set(tmpDic);
      });
    if (ishovering) {
      var bukkuk = document.getElementsByClassName('companion_gif')[0];
      if (bukkuk != null) bukkuk.style = 'margin-left: 10%';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [printed, wishes, overlayMode]);

  const fakefunc = function () {
    setishovering(true);
    setFirst(0);
    setPrinted([]);
  };
  const mouseEnter = (val) => {
    //console.log('mouse entered to ' + products[val]['name']);
    //console.log('current overlayInfo :::: ', overlayInfo[0]);
    timer = setTimeout(function () {
      var bukkuk = document.getElementsByClassName('companion_gif')[0];
      //console.log(bukkuk);
      if (bukkuk != null) bukkuk.style = 'margin-left: 10%';
      if (products[val]['eco'] > 0) {
        // console.log(String(val));
        setOverlayInfo([val]);
        // console.log('overlay info :::::::', overlayInfo);
        // debugger;
        setRecArray([]);
        setOverlay(1);
        // console.log('overlay num :::::::', overlayMode);
        // debugger;
      } else {
        setOverlayInfo(products[val]['category']);
        setRecArray([]);
        var temp = [];
        for (var i = 0; i < Object.keys(products).length; i++) {
          // console.log(
          //   products[val]['category'],
          //   products['' + (i + 1)]['category']
          // );
          if (
            products['' + (i + 1)]['category'] === products[val]['category'] &&
            products['' + (i + 1)]['eco'] > 0
          ) {
            temp.push('' + (i + 1));
          }
        }
        setRecArray(temp);
        // console.log('temp::::', temp);
        // console.log('recArray::::', recArray);
        setOverlay(2);
        // console.log('overlay num :::::::', overlayMode);
        // debugger;
      }
    }, delay);

    // if (products[val]['eco'] > 0)
    //   console.log('bukkuk loved this product', products[val]['name']);
    // else console.log("bukkuk's recommendation!");
  };

  const mouseLeave = (val) => {
    //console.log('mouse leaved from ' + products[val]['name']);
    // var bukkuk = document.getElementsByClassName('companion_gif')[0];
    // console.log(bukkuk);
    // bukkuk.style = 'margin-left: -15%';
    // setOverlay(0);
    // setOverlayInfo([]);
    // setRecArray([]);
    clearTimeout(timer);
    // if (products[val]['eco'] > 0)
    //   console.log('bukkuk loved this product', products[val]['name']);
    // else console.log("bukkuk's recommendation!");
  };

  const heartOff = (e) => {
    e.preventDefault();
    var tmp = userInfo;
    // console.log(tmp);
    // debugger;
    // console.log(e.target.parentElement.getAttribute('value'));
    var val = e.target.parentElement.getAttribute('value');
    var index = userInfo['wished'].indexOf(val);
    if (index !== -1) {
      del_idx.push(index);
      tmp['wished'].splice(index, 1);
    }
    // console.log(tmp);
    // debugger;
    db.collection('users')
      .doc(email)
      .set(tmp)
      .then(() => {
        var current_wish = wishes - 1;
        setWishes(current_wish);
        if (tmp['wished'].length == 0) {
          setScore(4);
        } else {
          var new_score = 0;
          for (var i = 0; i < tmp['wished'].length; i++) {
            new_score += products[tmp['wished'][i]['eco']];
          }
          setScore(Math.round(new_score / tmp['wished'].length));
          //console.log(':::::::::::::', score, userInfo);
          //debugger;
        }
        var tmpDic = userInfo;
        tmpDic['score'] = Math.round(new_score / tmp['wished'].length);
        //debugger;
        db.collection('users').doc(email).set(tmpDic);
      });
    setOverlayInfo([]);
    setRecArray([]);
    setOverlay(0);
  };
  const heartOn = (e) => {
    e.preventDefault();
    var ttmp = userInfo;
    var val = e.target.parentElement.getAttribute('value');
    var index = del_idx.pop();
    ttmp['wished'].splice(index, 0, val);

    db.collection('users')
      .doc(email)
      .set(ttmp)
      .then(() => {
        var current_wish = wishes + 1;
        var newscore = 0;
        for (var i = 0; i < ttmp['wished'].length; i++) {
          newscore += products[ttmp['wished'][i]['eco']];
          //console.log('newscore', newscore);
        }
        setScore(Math.round(newscore / ttmp['wished'].length));
        setWishes(current_wish);
        // console.log(score, userInfo);

        var tmpDic = userInfo;

        //console.log(userInfo);
        tmpDic['score'] = Math.round(newscore / ttmp['wished'].length);
        //console.log(userInfo);
        //debugger;
        db.collection('users').doc(email).set(tmpDic);
      });

    setOverlayInfo([]);
    setRecArray([]);
    setOverlay(0);

    db.collection('users')
      .doc(email)
      .get()
      .then(function (doc) {
        let docs = doc.data();
        //console.log('docc', docs);
      });
  };

  return (
    <div className="entire">
      <div className="container">
        <img
          className="background_img"
          src="https://ifh.cc/g/ohSfv7.jpg"
          alt="background"
          key="background"
        ></img>

        <div
          className="companion"
          data-tip={
            signIn && score == 0
              ? 'My home is melting down ...'
              : score == 1
              ? "You've never been Green before, have you?"
              : score == 2 || score == 4
              ? "Maybe I'll dance if you make the score higher?"
              : 'Yeah~!'
          }
        >
          <img
            id="bukkuk"
            className="companion_gif"
            src={img_src[score]}
            alt="companion"
            key={score}
            margin-left="-15%"
          ></img>
        </div>
        <div>
          {signIn ? (
            overlayMode == 0 ? (
              <div className="overlayBox">
                Your Eco Score: {score == 4 ? '2' : score} | {userInfo.comp}'s
                State: {show_states[score]}
              </div>
            ) : overlayMode == 1 ? (
              <div>
                <div className="overlayBox">
                  {' '}
                  {userInfo.comp} loves this product !
                </div>
                {overlayInfo[0] != null &&
                '0' <= overlayInfo[0] &&
                overlayInfo <= '9' &&
                Object.keys(products[overlayInfo[0]]).includes('name') ? (
                  <div className="showing">
                    <Link
                      to={{
                        pathname: `/detail/` + products[overlayInfo[0]]['name'],
                        state: {
                          name: products[overlayInfo[0]]['name'],
                          price: products[overlayInfo[0]]['price'],
                          imgg: products[overlayInfo[0]]['imgg'],
                          link: products[overlayInfo[0]]['a'],
                          ecoval: products[overlayInfo[0]]['eco'],
                          idx: [overlayInfo[0]],
                        },
                      }}
                    >
                      <CurProduct
                        name={products[overlayInfo[0]]['name']}
                        price={products[overlayInfo[0]]['price']}
                        imgg={products[overlayInfo[0]]['imgg']}
                        a={products[overlayInfo[0]]['a']}
                        ecoval={products[overlayInfo[0]]['eco']}
                        idx={overlayInfo[0]}
                      />
                    </Link>
                  </div>
                ) : null}
              </div>
            ) : (
              <div>
                <div className="overlayBox">
                  {' '}
                  {userInfo.comp}'s recommendations !
                </div>
                {/* {overlayInfo[0] != null && overlayInfo[0].length > 1 ? ( */}
                <div className="rshowing" id="showrec">
                  {/* <div> {recArray.length} </div> */}
                  {recArray.map((val, idx) => (
                    <div key={val}>
                      <Link
                        to={{
                          pathname: `/detail/` + products[val]['name'],
                          state: {
                            name: products[val]['name'],
                            price: products[val]['price'],
                            imgg: products[val]['imgg'],
                            link: products[val]['a'],
                            ecoval: products[val]['eco'],
                            idx: val,
                          },
                        }}
                      >
                        <RecProduct
                          name={products[val]['name']}
                          price={products[val]['price']}
                          imgg={products[val]['imgg']}
                          a={products[val]['a']}
                          ecoval={products[val]['eco']}
                          idx={products[val]}
                          wished={userInfo['wished'].includes(String(val))}
                          email={email}
                          id={val}
                          fakefunc={fakefunc}
                        />
                      </Link>
                    </div>
                  ))}
                </div>
                {/* ) : null} */}
              </div>
            )
          ) : (
            <div>
              <div className="overlayBox">Welcome~! Register or Sign in!</div>
            </div>
          )}
        </div>
      </div>
      <div className="wishlist">
        {printed != null &&
        printed.length > 0 &&
        userInfo['wished'] != null &&
        Object.keys(products).length > 0 ? (
          <div id="showwish">
            {printed.map((val, idx) => (
              <div
                onMouseEnter={(e) => mouseEnter(val)}
                onMouseLeave={(e) => mouseLeave(val)}
                key={val}
                value={val}
              >
                <Link
                  to={{
                    pathname: `/detail/` + products[printed[idx]]['name'],
                    state: {
                      name: products[printed[idx]]['name'],
                      price: products[printed[idx]]['price'],
                      imgg: products[printed[idx]]['imgg'],
                      link: products[printed[idx]]['a'],
                      ecoval: products[printed[idx]]['eco'],
                      idx: idx,
                    },
                  }}
                >
                  <WishProduct
                    name={products[printed[idx]]['name']}
                    price={products[printed[idx]]['price']}
                    imgg={products[printed[idx]]['imgg']}
                    a={products[printed[idx]]['a']}
                    ecoval={products[printed[idx]]['eco']}
                    idx={idx}
                    wished={printed.includes(printed[idx])}
                  />
                </Link>
                {userInfo['wished'].includes(printed[idx]) ? (
                  <img
                    className="myheart__"
                    src="https://ifh.cc/g/d7BZO6.png"
                    width="30px"
                    onClick={(e) => heartOff(e)}
                  />
                ) : (
                  <img
                    className="myheart__"
                    src="https://ifh.cc/g/IuZase.png"
                    width="30px"
                    onClick={(e) => heartOn(e)}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div
            className="emptyWished"
            //onClick={() => //console.log(userInfo['wished'])}
          >
            No Product
          </div>
        )}
      </div>
      <Tippy
        delayShow={100}
        backgroundColor="rgba(0,169,0,0.9)"
        delayUpdate={1000}
      />
    </div>
  );
}

export default MyPage;
