/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react';
import { db, firebaseApp, firebase } from '../../firebase';
import './style.css';
//import $ from 'jquery';
import DetailPage from '../DetailPage';
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom';
import { SettingsInputAntennaTwoTone, TrendingUpOutlined } from '@material-ui/icons';
var email='1';

class Product extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      name: '',
      price: '',
      imgg: '',
      a: '',
      ecoval: 1,
      wished: this.props.wished,
      idx: this.props.idx,
        
    };
    
    this.me = this.me.bind(this);
    this.ml = this.ml.bind(this);
    this.heartOff=this.heartOff.bind(this);
    this.heartOn=this.heartOn.bind(this);
  
  }
  

  heartOn =function(e, id){

    e.preventDefault();
    this.setState(()=>({
      colored : true
    }));
   var wishedfixed=[];
   alert('hearton');
   email=this.props.email;
   db.collection('users')
   .doc(email)
   .get().then((doc)=>{
      let docs=doc.data();
      console.log(docs['wished']);
      console.log('beforfixed',docs['wished']);
      wishedfixed=docs['wished'];
      wishedfixed.push(String(id));
      console.log('afterfixed',wishedfixed);
      db.collection('users').doc(email).set({
        wished : wishedfixed,
        score : docs['score'],
        experience: docs['experience'],
        name : docs['name'],
        comp: docs['comp']
        }
      ).then(this.props.jebal)
        
   })
   
  }


  heartOff =function(e, id){
    this.setState(()=>({
      colored : false
    }));
    e.preventDefault();
    var wishedfixed
    alert('heartoff');
    email=this.props.email;
    db.collection('users')
    .doc(email)
    .get().then((doc)=>{
       let docs=doc.data();
    
       console.log('beforfixed',docs['wished']);
      wishedfixed=docs['wished'];
      wishedfixed.splice(docs['wished'].indexOf(id),1);
      console.log('afterfixed',wishedfixed);
       db.collection('users').doc(email).set({
         wished : wishedfixed,
         score : docs['score'],
         experience: docs['experience'],
         name : docs['name'],
         comp: docs['comp']
         }
       ).then(this.props.jebal())
       

     
    })
    console.log(this.props.jebal);

   }
  componentWillMount(){
    if(this.props)
    this.setState(()=>({
      colored : this.props.wished[this.props.idx]

    }));
  }
  componentDidMount(){
    if(this.props)
    this.setState(()=>({
      colored : this.props.wished[this.props.idx]

    }));
  }

  

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
    var { name, price, imgg, a, ecoval, wished, idx ,id, email} = this.props;
    return (
      <header>
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
          <div
            id={'pdb' + idx}
            className="productbox"
            value={this.props.eco}
            onMouseEnter={this.me}
            onMouseLeave={this.ml}
          >
            <div className="pimage">
              <img
                classname="imgg"
                src={this.props.imgg}
                alt="Product image"
                width="175px"
                height="175px"
              ></img>
            </div>
            {(this.props.wished[idx]===true) ? (
              <img
                className="heart"
                src="https://ifh.cc/g/d7BZO6.png"
                width="30px"
                onClick={(e) => this.heartOff(e, this.props.id)}
              />
            ) : (
              <img
                className="heart"
                src="https://ifh.cc/g/IuZase.png"
                width="30px"
                onClick={(e) => this.heartOn(e, this.props.id)}
              />
            )}
            <div>
              <p className="des">{this.props.name}</p>
              <p className="des">{this.props.price} won</p>
            </div>
          </div>
        </Link>
      </header>
    );
  }
}

export default Product;
