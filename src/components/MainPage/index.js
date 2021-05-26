import './style.css';
import {db} from '../../firebase';
import React, { useEffect, useState } from 'react';
import Tippy from 'react-tooltip';
//import Switch from './Switch';

function MainPage() {
  const [img_src, setImgSrc] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [products, setProducts] = useState({});
  const [score, setScore] = useState(0);
  //const [overlayMode, setOverlay] = useState(0);
  //const [overlayInfo, setOverlayInfo] = useState([]);
  //const [recArray, setRecArray] = useState([]);

  let states = ['adult_bad', 'adult_normal', 'adult_good', 'adult_dance'];
  var timer;

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
        console.log('companion img source list', img_src);
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
        console.log('product list', products);
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
      .doc('1')
      .get()
      .then(function (doc) {
        let docs = doc.data();
        setUserInfo([]);
        for (var i = 0; i < Object.keys(docs).length; i++) {
          let dic = userInfo;
          dic[infos[i]] = docs[infos[i]];
          setUserInfo(dic);
        }

        var tmpScore = 0;
        for (i = 0; i < userInfo['wished'].length; i++) {
          console.log(products[userInfo['wished'][i]]['eco']);
          tmpScore += products[userInfo['wished'][i]]['eco'];
          console.log(products[userInfo['wished'][i]]);
        }
        if (userInfo['wished'].length > 0) {
          setScore(Math.round(tmpScore / userInfo['wished'].length));
          // var
          // db.collection('users').doc('1').set()
        } else setScore(4);
        console.log(
          "user's eco score",
          Math.round(tmpScore / userInfo['wished'].length)
        );
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
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
          <input type="radio" name="radio-btn" id="radio-lr" defaultChecked></input>
          <input type="radio" name="radio-btn" id="radio-kc"></input>
          <input type="radio" name="radio-btn" id="radio-br"></input>
          <input type="radio" name="radio-btn" id="radio-mr"></input>
        
          <div className="slide first">
            <img src="https://ifh.cc/g/xEbVfF.jpg" alt="" useMap="#livingroom-map"></img>
            <map id="livingroom-map" name="livingroom-map" width="100%" height="100%" border="5px solid #000000">
              <area data-tip="tissue"
                shape="poly" alt="" title=""
                coords={resizeArea([753,537,745,547,744,565,799,566,812,556,812,536,786,534,795,517,775,518,761,512,768,536,753,538])}
                href= "/category/living" target="" />
              <area data-tip="tree"
                shape="poly" alt="" title=""
                coords={resizeArea([780,483,776,519,786,524,804,526,820,520,822,484,802,479,801,459,812,456,814,467,818,460,815,449,820,448,827,445,825,438,829,432,830,426,829,422,836,422,834,417,841,410,839,407,819,411,830,403,835,395,830,392,841,385,823,388,822,377,810,377,796,377,798,368,796,359,791,352,779,363,770,369,774,382,778,393,774,403,767,414,771,411,762,423,770,432,764,439,771,445,776,450,764,456,772,462,761,471,787,459,799,461,800,479,790,480])}
                  />
              <area data-tip="cushion"
                shape="poly" alt="" title=""
                coords={resizeArea([1164,440,1133,450,1110,514,1103,527,1167,524,1209,526,1231,500,1237,481,1246,449,1241,439,1186,434,1174,437])}
                href= "/category/living" target="" />
              <area data-tip="rug"
                shape="poly" alt="" title=""
                coords={resizeArea([1308,771,1226,704,1094,706,1079,747,1074,745,1084,706,1069,692,934,572,935,547,889,553,900,575,886,575,874,571,870,566,867,552,862,550,851,562,846,557,841,563,837,553,822,551,820,564,816,569,809,573,804,576,802,576,794,578,789,578,769,578,754,575,730,574,719,570,712,566,705,562,697,555,693,550,619,551,525,769])}
                  />
              <area data-tip="light" data-place="bottom"
                shape="poly" alt="" title=""
                coords={resizeArea([518,28,584,28,601,76,549,76,546,72])}
                  />
              <area data-tip="light" data-place="bottom"
                shape="poly" alt="" title=""
                coords={resizeArea([618,76,738,77,746,26,602,25])}
                  />
              <area data-tip="ligth" data-place="bottom"
                shape="poly" alt="" title=""
                coords={resizeArea([764,28,752,72,817,72,830,24])}
                  />
            </map>
          </div>
          <div className="slide">
            <img src="https://ifh.cc/g/lXUw7U.jpg" alt="" useMap="#kitchen-map"></img>
            <map id="kitchen-map" name="kitchen-map" width="100%" height="100%" border="5px solid #000000">
              <area data-tip="cloth"
                shape="poly" alt="" title=""
                coords={resizeArea([283,514,277,519,280,602,284,610,304,613,330,609,334,604,335,552,338,517,333,512,299,514])}
                href= "/category/kitchen" target="" />
              <area data-tip="pan"
                shape="poly" alt="" title=""
                coords={resizeArea([946,458,949,466,923,470,920,476,924,478,927,480,941,482,951,478,961,473,977,478,1006,478,1026,473,1032,466,1036,456,978,456])}
                  />
              <area data-tip="scrubber"
                shape="poly" alt="" title=""
                coords={resizeArea([634,424,633,429,640,433,635,440,632,454,633,468,639,472,645,474,650,469,653,455,650,440,641,430,636,423])}
                href= "/category/kitchen" target="" />
              <area data-tip="detergent"
                shape="poly" alt="" title=""
                coords={resizeArea([539,391,560,389,565,391,562,397,546,399,548,406,553,412,552,420,560,423,571,439,563,458,556,467,541,470,526,466,517,451,518,436,526,422,534,416,534,408,539,405,541,395,538,397,536,390])}
                href= "/category/kitchen" target="" />
              <area data-tip="wrap" data-tip="hello world"
                shape="poly" alt="" title=""
                coords={resizeArea([377,406,378,396,388,398,390,402,422,403,420,410,420,424,411,434,423,434,419,444,419,461,395,472,358,472,344,460,341,445,339,438,353,433,346,430,344,418,343,408,350,403,368,403])}
                  />
            </map>
          </div>
          <div className="slide">
            <img src="https://ifh.cc/g/2rKxQD.jpg" alt="" useMap="#bathroom-map"></img>
            <map id="bathroom-map" name="bathroom-map" width="100%" height="100%" border="5px solid #000000">
              <area data-tip="tissue"
                shape="poly" alt="" title=""
                coords={resizeArea([229,516,231,512,250,511,250,557,224,565,222,527,208,533,189,534,175,522,169,507,169,494,180,476,193,470,210,469,218,469,225,472,230,484,233,498])}
                 />
              <area data-tip="soap"
                shape="poly" alt="" title=""
                coords={resizeArea([568,461,565,466,570,470,602,470,606,470,607,463,603,460])}
                 />
              <area data-tip="toothpaste" data-place="bottom"
                shape="poly" alt="" title=""
                coords={resizeArea([727,451,754,450,756,456,750,518,746,527,739,528,735,526,734,517,731,517,727,455])}
                href= "/category/bath" target=""  />
              <area data-tip="toothbrush"
                shape="poly" alt="" title=""
                coords={resizeArea([779,434,778,466,785,469,793,468,806,468,806,431,800,432,806,402,805,400,798,401,794,414,798,416,794,432,787,432,781,417,785,415,781,404,778,403,774,405,769,405,780,430])}
                 />
              <area data-tip="shampoo"
                shape="poly" alt="" title=""
                coords={resizeArea([1063,454,1075,453,1081,469,1081,473,1086,481,1092,490,1099,490,1099,484,1107,474,1110,472,1107,470,1108,460,1112,460,1112,457,1101,457,1099,454,1101,452,1120,451,1123,452,1120,456,1120,460,1125,460,1124,470,1121,472,1125,477,1134,487,1133,521,1132,530,1114,531,1097,492,1092,492,1108,532,1098,531,1098,511,1090,492,1092,531,1058,531,1058,485,1065,477,1070,472,1069,470,1067,469,1067,461,1070,461,1072,461,1071,457,1063,457,1061,454])}
                href= "/category/bath" target="" />
            </map>
          </div>
          <div className="slide">
            <img src="https://ifh.cc/g/tcEe36.jpg" alt="" useMap="#myroom-map"></img>
            <map id="myroom-map" name="myroom-map" width="100%" height="100%" border="5px solid #000000">
              <area data-tip="facial"
                shape="poly" alt="" title=""
                coords={resizeArea([207,411,222,409,226,412,224,433,225,452,222,455,223,464,213,462,213,456,210,451,208,428])}
                href= "/category/beauty" target="" />
              <area data-tip="blanket"
                shape="poly" alt="" title=""
                coords={resizeArea([672,462,664,472,667,481,670,489,676,496,673,508,670,518,668,541,666,564,670,571,679,576,670,585,669,591,678,595,693,600,705,601,724,594,744,595,775,594,791,599,831,591,848,589,858,580,894,575,903,566,899,536,883,504,843,473,803,461,776,456,760,453,695,456])}
                />
              <area data-tip="mug"
                shape="poly" alt="" title=""
                coords={resizeArea([1160,508,1155,503,1160,525,1161,541,1170,546,1174,544,1175,536,1171,532,1173,526,1179,525,1188,526,1195,529,1200,523,1198,513,1194,509,1194,503,1174,500,1166,502])}
                  />
              <area data-tip="eco-bag"
                shape="poly" alt="" title=""
                coords={resizeArea([1225,634,1227,732,1245,736,1281,736,1305,734,1304,631,1300,629,1286,633,1286,623,1282,609,1270,605,1263,605,1253,615,1247,635])}
                href= "/category/beauty" target="" />
            </map>
          </div>
          <div className="navigation-manual">
            <label htmlFor="radio-lr" className="manual-btn-lr"></label>
            <label htmlFor="radio-kc" className="manual-btn-kc"></label>
            <label htmlFor="radio-br" className="manual-btn-br"></label>
            <label htmlFor="radio-mr" className="manual-btn-mr"></label>
          </div>
          <div className="companion-mainpage">
          <img
            id="companion-mp"
            className="companion-mp"
            src={img_src[score]}//"https://ifh.cc/g/d7BZO6.png"//{img_src[score]}
            alt="companion"
            key={score}
            margin-left="-15%"
            onClick={mv2mypage} 
            data-tip="If you want to see me, just click me!"
          ></img>
        </div>
        <Tippy delayShow={100} backgroundColor="rgba(0,169,0,0.9)" delayUpdate={1000}/>
        </div>
      </div>
    </div>
  );
}

/*<div className="companion">
<img
  id="bukkuk"
  className="companion_gif"
  src={img_src[score]}
  alt="companion"
  key={score}
></img>
</div>
*/

export default MainPage;
