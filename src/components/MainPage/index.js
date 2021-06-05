import './style.css';
import { db, firebaseApp } from '../../firebase';
import React, { useEffect, useState } from 'react';
import Tippy from 'react-tooltip';
import { useSelector, useDispatch } from 'react-redux';
//import Arrow from './Arrow'

import leftArrow from '../../img/left-arrow.svg'
import rightArrow from '../../img/right-arrow.svg'
//import Switch from './Switch';

function MainPage() {
  const [img_src, setImgSrc] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [products, setProducts] = useState({});
  const [score, setScore] = useState(0);
  const [signIn, setSignIn] = useState(true);
  const [email, setEmail] = useState('1');
  //const [overlayMode, setOverlay] = useState(0);
  //const [overlayInfo, setOverlayInfo] = useState([]);
  //const [recArray, setRecArray] = useState([]);

  let states = ['adult_bad', 'adult_normal', 'adult_good', 'adult_dance'];
  var timer;
  var dispatch = useDispatch();

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
  }, []);
  useEffect(() => {
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
  }, []);

  useEffect(() => {
    var infos = ['name', 'wished', 'experience'];
    clearTimeout(timer);
    var bukkuk = document.getElementById('companion_gif');
    // console.log(bukkuk);
    //if (bukkuk != null) bukkuk.style = 'margin-left: -15%';
    //setOverlayInfo(['']);
    db.collection('users')
      .doc(email)
      .get()
      .then(function (doc) {
        //console.log('doc', doc);
        let docs = doc.data();
        setUserInfo([]);
        //console.log("wished list",docs['wished'])
        for (var i = 0; i < Object.keys(docs).length; i++) {
          let dic = userInfo;
          dic[infos[i]] = docs[infos[i]];
          setUserInfo(dic);
        }

        var tmpScore = 0;
        for (i = 0; i < userInfo['wished'].length; i++) {
          //console.log(products[userInfo['wished'][i]]['eco']);
          tmpScore += products[userInfo['wished'][i]]['eco'];
          //console.log(products[userInfo['wished'][i]]);
        }
        if (userInfo['wished'].length > 0) {
          setScore(Math.round(tmpScore / userInfo['wished'].length));
          // var
          // db.collection('users').doc('1').set()
        } else setScore(4);
        //console.log(
        //  "user's eco score",
        //  Math.round(tmpScore / userInfo['wished'].length)
        //);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const resizeArea = (data) => {
    const winWidth = document.body.offsetWidth;
    let a = [];
    for (let i = 0; i < data.length; i++) {
      a.push((data[i] * winWidth) / 1440);
    }
    return a.join();
  };
  const [windowSize, setWindowSize] = useState(document.body.offsetWidth);
  const handleResize = () => {
    setWindowSize({
      winWidth: window.innerWidth,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      // cleanup
      window.removeEventListener('resize', handleResize);
    };
  }, [windowSize]);

  const mv2mypage = () => {
    document.location.href = '/mypage';
  };

  return (
    <div>
      <div className="slider">
        <div className="slides">
          <input
            type="radio"
            name="radio-btn"
            id="radio-lr"
            defaultChecked
          ></input>
          <input type="radio" name="radio-btn" id="radio-kc"></input>
          <input type="radio" name="radio-btn" id="radio-br"></input>
          <input type="radio" name="radio-btn" id="radio-mr"></input>

          <div className="slide first">
            <img
              src="https://ifh.cc/g/218GD0.jpg"
              alt=""
              useMap="#livingroom-map"
            ></img>
            <map
              id="livingroom-map"
              name="livingroom-map"
              width="100%"
              height="100%"
              border="5px solid #000000"
            >
              <area
                data-tip="tissue"
                shape="poly"
                alt=""
                title=""
                coords={resizeArea([
                  768, 536, 765, 528, 772, 520, 782, 518, 789, 520,
                  796, 525, 797, 527, 804, 527, 809, 534, 809, 537,
                  821, 536, 825, 541, 828, 549, 828, 565, 827, 569,
                  815, 583, 775, 583, 756, 582, 751, 576, 750, 564,
                  749, 549, 760, 539, 763, 536, 767, 536
                ])}
                href="/category/tissue"
                target=""
              />
              <area
                data-tip="cushion"
                shape="poly"
                alt=""
                title=""
                coords={resizeArea([
                  1101, 530, 1106, 507, 1122, 479, 1128, 460, 1140, 447,
                  1151, 442, 1170, 444, 1181, 448, 1205, 449, 1221, 448,
                  1233, 448, 1242, 453, 1245, 464, 1241, 477, 1236, 491,
                  1234, 508, 1226, 517, 1218, 528, 1209, 539, 1202, 543,
                  1179, 541, 1156, 540, 1128, 539, 1103, 535, 1103, 535
                ])}
                href="/category/cushion"
                target=""
              />
            </map>
          </div>
          <div className="slide">
            <img
              src="https://ifh.cc/g/OsS9QH.jpg"
              alt=""
              useMap="#kitchen-map"
            ></img>
            <map
              id="kitchen-map"
              name="kitchen-map"
              width="100%"
              height="100%"
              border="5px solid #000000"
            >
              <area
                data-tip="scrubber"
                shape="poly"
                alt=""
                title=""
                coords={resizeArea([
                  634, 421, 640, 420, 648, 427, 649, 432, 655, 437,
                  659, 458, 654, 473, 648, 479, 638, 479, 631, 474,
                  627, 461, 629, 441, 635, 433, 632, 432, 630, 425
                ])}
                href="/category/scrubber"
                target=""
              />
              <area
                data-tip="detergent"
                shape="poly"
                alt=""
                title=""
                coords={resizeArea([
                  542, 386, 559, 385, 566, 387, 570, 390, 569, 399,
                  563, 404, 555, 404, 558, 408, 558, 417, 567, 421,
                  575, 431, 578, 446, 573, 461, 565, 471, 551, 475,
                  538, 476, 526, 473, 518, 466, 513, 454, 512, 440,
                  518, 425, 526, 418, 531, 414, 531, 406, 536, 402,
                  533, 397, 532, 392, 535, 387, 539, 386, 539, 386
                ])}
                href="/category/detergent"
                target=""
              />
              <area
                data-tip="tissue"
                shape="poly"
                alt=""
                title=""
                coords={resizeArea([
                  845, 295, 860, 290, 880, 286, 907, 292, 920, 301,
                  921, 402, 914, 409, 908, 410, 904, 408, 903, 405,
                  901, 403, 895, 409, 884, 411, 869, 411, 854, 408,
                  843, 403, 840, 396, 839, 364, 840, 300
                ])}
                href="/category/tissue"
                target=""
              />
            </map>
          </div>
          <div className="slide">
            <img
              src="https://ifh.cc/g/SkwUIG.jpg"
              alt=""
              useMap="#bathroom-map"
            ></img>
            <map
              id="bathroom-map"
              name="bathroom-map"
              width="100%"
              height="100%"
              border="5px solid #000000"
            >
              <area
                data-tip="tissue"
                shape="poly"
                alt=""
                title=""
                coords={resizeArea([
                  171, 469, 171, 454, 176, 450, 201, 449, 207, 443,
                  215, 443, 225, 452, 237, 453, 251, 466, 261, 481,
                  263, 496, 262, 518, 257, 522, 257, 548, 258, 558,
                  252, 562, 221, 573, 217, 573, 216, 541, 200, 541,
                  185, 540, 173, 531, 165, 518, 162, 503, 164, 491,
                  171, 478, 175, 475
                ])}
                href="/category/tissue"
              />
              <area
                data-tip="toothpaste"
                data-place="bottom"
                shape="poly"
                alt=""
                title=""
                coords={resizeArea([
                  725, 447, 751, 445, 758, 447, 761, 450, 761, 457,
                  758, 503, 757, 522, 754, 524, 752, 530, 745, 534,
                  735, 533, 730, 529, 729, 524, 726, 522, 722, 477, 721, 452
                ])}
                href="/category/toothpaste"
                target=""
              />
              <area
                data-tip="shampoo"
                shape="poly"
                alt=""
                title=""
                coords={resizeArea([
                  1074, 448, 1064, 446, 1056, 450, 1056, 460, 1060, 462,
                  1062, 470, 1063, 472, 1052, 482, 1053, 529, 1056, 536,
                  1066, 537, 1095, 538, 1096, 534, 1100, 538, 1111, 537,
                  1103, 518, 1076, 455, 1084, 454, 1099, 492, 1108, 515,
                  1118, 538, 1134, 538, 1139, 535, 1140, 527, 1142, 487,
                  1133, 473, 1131, 461, 1128, 456, 1128, 448, 1120, 444,
                  1110, 446, 1100, 445, 1095, 451, 1096, 461, 1102, 464,
                  1103, 471, 1097, 475, 1094, 470, 1094, 461, 1088, 457,
                  1090, 456, 1088, 447, 1080, 445, 1084, 454, 1076, 455
                ])}
                href="/category/shampoo"
                target=""
              />
            </map>
          </div>
          <div className="slide">
            <img
              src="https://ifh.cc/g/fa8P08.jpg"
              alt=""
              useMap="#myroom-map"
            ></img>
            <map
              id="myroom-map"
              name="myroom-map"
              width="100%"
              height="100%"
              border="5px solid #000000"
            >
              <area
                data-tip="facial"
                shape="poly"
                alt=""
                title=""
                coords={resizeArea([
                  257, 398, 277, 397, 281, 399, 283, 407, 282, 453,
                  279, 455, 276, 461, 266, 462, 260, 459, 259, 452,
                  257, 448, 253, 404, 254, 400
                ])}
                href="/category/facial"
                target=""
              />
              <area
                data-tip="tissue"
                shape="poly"
                alt=""
                title=""
                coords={resizeArea([
                  1165, 501, 1147, 499, 1138, 503, 1137, 518, 1138, 540,
                  1144, 547, 1157, 550, 1186, 562, 1194, 562, 1231, 560,
                  1235, 552, 1235, 518, 1227, 512, 1219, 509, 1226, 499,
                  1226, 492, 1220, 483, 1208, 481, 1198, 483, 1197, 479,
                  1190, 475, 1182, 473, 1169, 477, 1161, 486, 1162, 495

                ])}
                href="/category/tissue"
                target=""
              />
              <area
                data-tip="eco-bag"
                shape="poly"
                alt=""
                title=""
                coords={resizeArea([
                  1241, 629, 1223, 628, 1218, 633, 1219, 683, 1220, 736,
                  1228, 742, 1242, 745, 1301, 742, 1310, 739, 1312, 735,
                  1311, 630, 1310, 625, 1293, 625, 1292, 618, 1285, 607,
                  1276, 599, 1261, 599, 1250, 608, 1244, 617
                ])}
                href="/category/bag"
                target=""
              />
            </map>
          </div>
          <div className="navigation-manual">
            <label htmlFor="radio-lr" className="manual-btn-lr"></label>
            <label htmlFor="radio-kc" className="manual-btn-kc"></label>
            <label htmlFor="radio-br" className="manual-btn-br"></label>
            <label htmlFor="radio-mr" className="manual-btn-mr"></label>
          </div>
          <div
            className="companion-mainpage"
            data-tip="If you want to see me, just click me!"
          >
            <img
              id="companion-mp"
              className="companion-mp"
              src={img_src[score]}
              alt="companion"
              key={score}
              margin-left="-15%"
              onClick={mv2mypage}
            ></img>
          </div>

          <Tippy
            delayShow={100}
            backgroundColor="rgba(0,169,0,0.9)"
            delayUpdate={1000}
          />
        </div>
      </div>
      
      <div
        class="left-arrow"
        //onClick={prevSlide}
    >
        <img src={leftArrow} />
      </div>
      <div
        class="right-arrow"
      //onClick={nextSlide}
    >
      <img src={rightArrow} />
    </div>
      
    </div>
  );
}

export default MainPage;
