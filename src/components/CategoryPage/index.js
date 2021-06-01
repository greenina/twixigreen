import './style.css';
import React from 'react';
import Productlist from './productlist';
import { db, firebaseApp } from './../../firebase';
import {useState, useEffect} from 'react'

var count = 0;
var cgg = '';
var email = '1';
var signIn = true
var wished=[]
var score = 0

class CategoryPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.match.params.cg);
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
      email:email,
      signIn:signIn
    };
    console.log("this.state.wished",wished)
    this.datarefresh = this.datarefresh.bind(this);
    this.onesight = this.onesight.bind(this);
    this.bukkuk = this.bukkuk.bind(this);
    this.bukkukthen = this.bukkukthen.bind(this);
    this.wishthen = this.wishthen.bind(this);
    this.scorethen = this.scorethen.bind(this);
    this.afteremaildownload=this.afteremaildownload.bind(this);
  }
  

  bukkuk() {
    db.collection('companion').doc('bukkuk').get().then(this.bukkukthen);
    firebaseApp.auth().onAuthStateChanged(this.afteremaildownload);
    
  }
  afteremaildownload(user){
   
        if (user) {
          email = user.email;
          signIn = true;
        } 
        else{
          email = '1';
          signIn = false;
        }
        console.log("now Email",this.state.email);
        console.log("change Email",email);
        this.setState(() => ({
            email : email,
        }));
        console.log("user Email",this.state.email);
        db.collection('users').doc(this.state.email).get().then(this.scorethen);
        db.collection('users').doc(this.state.email).get().then(this.wishthen);
        this.setState(() => ({
                score: score,
                wishlist: wished,
        },
        ()=>{alert("callback")}
        
        ));
        this.datarefresh(this.props.cg);
       
    
  }
  scorethen(doc) {
    {
      let docs = doc.data();
      this.setState(() => ({
        score: docs['score'],
      }));
      console.log('::::::::::', this.state.score);
    }
  }
  wishthen(doc) {
    // eslint-disable-next-line no-lone-blocks
    {
      let docs = doc.data();
      this.setState(() => ({
        wishlist: docs['wished'],
      }));
    }
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
    console.log('companion img source list', this.state.img_src);
  }
  onesight() {
    var elements = document.getElementsByClassName('productbox');
    console.log(elements, count);
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
          //wished: [],
          id: [],
        }));
        //snapshot.forEach(datacheck);
        //alert(document.getElementById('pc'))
        snapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots

          var vegan = document.getElementById('vegan').checked;
          var ap = document.getElementById('ap').checked;
          var harm = document.getElementById('harm').checked;
          var ecoonly = document.getElementById('ecoonly').checked;
          var veganvalid = !vegan || doc.data().vegan === vegan;
          var apvalid = !ap || doc.data().ap === ap;
          var harmvalid = !harm || doc.data().harm === harm;
          var cgtest = false;

          if (
            cgg == 'living' &&
            (doc.data().category == 'tissue' ||
              doc.data().category == 'cushion')
          ) {
            cgtest = true;
          } else if (
            cgg == 'bath' &&
            (doc.data().category == 'toothpaste' ||
              doc.data().category == 'shampoo')
          ) {
            cgtest = true;
          } else if (
            cgg == 'beauty' &&
            (doc.data().category == 'facial' || doc.data().category == 'bag')
          ) {
            cgtest = true;
          } else if (
            cgg == 'kitchen' &&
            (doc.data().category == 'scrubber' ||
              doc.data().category == 'detergent')
          ) {
            cgtest = true;
          }
          // var wishbool = wished.includes('' + doc.id) ? true : false;

          var ecovalid = !ecoonly || doc.data().eco > 0;
          // console.log(doc.id, " => ", doc.data());

          if (veganvalid && apvalid && harmvalid && ecovalid && cgtest)
            this.setState((prevState) => ({
              name: [...prevState.name, doc.data().name],
              price: [...prevState.price, doc.data().price],
              imgg: [...prevState.imgg, doc.data().imgg],
              a: [...prevState.a, doc.data().a],
              ecoval: [...prevState.ecoval, doc.data().eco],
              id: [...prevState.id, doc.id],
            }));
        });
        console.log(this.state);
        var sum = 0;
        var i;
        //console.log('wishlist!!!!!!!!!', this.state.id);
        for (i = 0; i < this.state.id.length; i++) {
          console.log(this.state.id[i]);
          if (this.state.wishlist.includes('' + this.state.id[i])) {
            this.setState((prevState) => ({
              wished: [...prevState.wished, true],
            }));
          } else
            this.setState((prevState) => ({
              wished: [...prevState.wished, false],
            }));
        }
      });
  }
  // componentDidMount(){
  //   firebaseApp.auth().onAuthStateChanged(function(user) {
  //     if (user) {
  //       this.setState(() => ({
  //         email: user.email,
  //         signIn:true
  //       }));
  //     } 
  //     this.setState(() => ({
  //         email: '1',
  //         signIn:false
  //     }));
  //   });

  // }
  componentWillMount() {
    this.bukkuk();

    
    
    //alert(this);
    // console.log(this.state.img_src);
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
      signIn
    } = this.state;

    return (
      <header>
        <div id="ccontainer">
          {/* <div class="kkk"> {cgg}</div> */}
          <div className="fixed_container">
            <div className="checkbox1 kk">
              <span class="checkin">
                <label for="ecoonly" className="f_name">Eco-friendly</label>
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
                <label for="vegan" className="f_name">Save Environment</label>
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
                <label for="ap" className="f_name">Protect Animal</label>
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
                <label for="harm" className="f_name">Stay healthy</label>
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
          <div class="pcandimg">
            <div id="pc">
              <Productlist
                name={name}
                price={price}
                imgg={imgg}
                a={a}
                ecoval={ecoval}
                wished={wished}
              ></Productlist>
            </div>
            <div>
              <div className="c_companion" id="cprofile">
                <a href="/mypage">
                  <img
                    id="bukkuk"
                    className="companion_gif"
                    src={this.state.img_src[score]}
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
