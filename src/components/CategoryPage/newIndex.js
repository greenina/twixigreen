// const CategoryPage = (props)=>{
//   const [name, setName] = useState([]);
//   const [price, setPrice] = useState([]);
//   const [imgg, setImgg] = useState([]);
//   const [a, setA] = useState([]);
//   const [ecoval, setEcoval] = useState([]);
//   const [img_src, setImg_src] = useState([]);
//   const [score, setScore] = useState(0);
//   const [wished, setWished] = useState([]);
//   const [id, setId] = useState([]);
//   const [wishlist, setWishlist] = useState([]);
//   const [email, setEmail] = useState('1');
//   const [signIn, setSignIn] = useState(false);

//   useEffect(()=>{
//     firebaseApp.auth().onAuthStateChanged(function(user) {
//       if (user) {
//         setSignIn(true);
//         setEmail(user.email)
//       } 
//     });
//     bukkuk();
//     datarefresh(props.match.params.cg)
//   },[])
//   var bukkuk=()=> {
//     db.collection('companion').doc('bukkuk').get().then(bukkukthen);
//     var user = db.collection('users').doc(email).get().then(scorethen);
//     var user = db.collection('users').doc(email).get().then(wishthen);
//   }
//   var scorethen = (doc)=> {
//     {
//       let docs = doc.data();
//       setScore(docs['score'])
//       console.log('::::::::::', score);
//     }
//   }
//   var wishthen = (doc)=> {
//     {
//       let docs = doc.data();
//       setWishlist(docs['wished'])
//     }
//   }
//   var bukkukthen = (doc) => {
//     var states = ['adult_bad', 'adult_normal', 'adult_good', 'adult_dance'];
//     let docs = doc.data();
//     let dic = img_src;

//     for (var i = 0; i < Object.keys(docs).length; i++) {
//       dic = img_src;
//       dic[i] = docs[states[i]];
//       setImg_src(dic)
//     }
//     dic[4] = dic[2];
//     setImg_src(dic)
//   }
//   var onesight = () =>{
//     var elements = document.getElementsByClassName('productbox');
//     console.log(elements, count);
//     count++;
//     for (var i = 0; i < elements.length; i++) {
//       if (count % 2 === 1)
//         elements[i].classList.add('ecoo' + ecoval[i]);
//       else elements[i].classList.remove('ecoo' + ecoval[i]);
//     }
//   }
//   var datarefresh = (cg)=> {
//     count = 0;
//     var product = db
//       .collection('products')
//       .get()
//       .then((snapshot) => {
//         setName([])
//         setPrice([])
//         setImgg([])
//         setA([])
//         setEcoval([])
//         setWished([])
//         setId([])
//         //snapshot.forEach(datacheck);
//         //alert(document.getElementById('pc'))
//         snapshot.forEach((doc) => {
//           // doc.data() is never undefined for query doc snapshots

//           var vegan = document.getElementById('vegan').checked;
//           var ap = document.getElementById('ap').checked;
//           var harm = document.getElementById('harm').checked;
//           var ecoonly = document.getElementById('ecoonly').checked;
//           var veganvalid = !vegan || doc.data().vegan === vegan;
//           var apvalid = !ap || doc.data().ap === ap;
//           var harmvalid = !harm || doc.data().harm === harm;
//           var cgtest = false;

//           if (
//             cgg == 'living' &&
//             (doc.data().category == 'tissue' ||
//               doc.data().category == 'cushion')
//           ) {
//             cgtest = true;
//           } else if (
//             cgg == 'bath' &&
//             (doc.data().category == 'toothpaste' ||
//               doc.data().category == 'shampoo')
//           ) {
//             cgtest = true;
//           } else if (
//             cgg == 'beauty' &&
//             (doc.data().category == 'facial' || doc.data().category == 'bag')
//           ) {
//             cgtest = true;
//           } else if (
//             cgg == 'kitchen' &&
//             (doc.data().category == 'scrubber' ||
//               doc.data().category == 'detergent')
//           ) {
//             cgtest = true;
//           }
//           // var wishbool = wished.includes('' + doc.id) ? true : false;

//           var ecovalid = !ecoonly || doc.data().eco > 0;
//           // console.log(doc.id, " => ", doc.data());

//           if (veganvalid && apvalid && harmvalid && ecovalid && cgtest){
//             name.push(doc.data().name)
//             imgg.push(doc.data().imgg)
//             price.push(doc.data().price)
//             a.push(doc.data().a)
//             ecoval.push(doc.data().ecoval)
//             id.push(doc.data().id)
//             setName(name)
//             setPrice(price)
//             setImgg(imgg)
//             setA(a)
//             setEcoval(ecoval)
//             setId(id)
//           }
//         });
//         var sum = 0;
//         var i;
//         console.log('wishlist', wishlist);
//         for (i = 0; i < id.length; i++) {
//           console.log(id[i]);
//           if (wishlist.includes('' + id[i])) {
//             wished.push(true)
//             setWished(wished)
//           } else{
//             wished.push(false)
//             setWished(wished)
//           }
//         }
//       });
//   }
  
//   return(
//     <header>
//         <div id="ccontainer">
//           {/* <div class="kkk"> {cgg}</div> */}
//           <div className="fixed_container">
//             <div className="checkbox1 kk">
//               <span class="checkin">
//                 <label for="ecoonly" className="f_name">Eco-friendly</label>
//                 <input
//                   className="checkboxes"
//                   type="checkbox"
//                   id="ecoonly"
//                   value="에코"
//                   onClick={datarefresh}
//                 ></input>
//                 <label className="labels" for="ecoonly"></label>
//               </span>
//               <span class="checkin">
//                 <label for="vegan" className="f_name">Save Environment</label>
//                 <input
//                   className="checkboxes"
//                   type="checkbox"
//                   id="vegan"
//                   value="비건"
//                   onClick={datarefresh}
//                 />
//                 <label className="labels" for="vegan"></label>
//               </span>
//               <span class="checkin">
//                 <label for="ap" className="f_name">Protect Animal</label>
//                 <input
//                   className="checkboxes"
//                   type="checkbox"
//                   id="ap"
//                   value="동물보호"
//                   onClick={datarefresh}
//                 ></input>
//                 <label className="labels" for="ap"></label>
//               </span>
//               <span class="checkin">
//                 <label for="harm" className="f_name">Stay healthy</label>
//                 <input
//                   className="checkboxes"
//                   type="checkbox"
//                   id="harm"
//                   value="유해물질x"
//                   onClick={datarefresh}
//                 ></input>
//                 <label className="labels" for="harm"></label>
//               </span>
//               <button
//                 id="onesight"
//                 className="inaglance"
//                 onClick={onesight}
//               >
//                 In a Glance
//               </button>
//             </div>
//           </div>
//           <div class="pcandimg">
//             <div id="pc">
//               <Productlist
//                 name={name}
//                 price={price}
//                 imgg={imgg}
//                 a={a}
//                 ecoval={ecoval}
//                 wished={wished}
//               ></Productlist>
//             </div>
//             <div>
//               <div className="c_companion" id="cprofile">
//                 <a href="/mypage">
//                   <img
//                     id="bukkuk"
//                     className="companion_gif"
//                     src={img_src[score]}
//                     alt="companion"
//                     key={score}
//                   ></img>
//                 </a>
//                 {/* <p>name : bukkuk</p>
//                 <p>state : {states[score]}</p> */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>
//   )
// }s