/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react';
import './style.css';
import { db, firebaseApp, firebase } from '../../firebase';
var email='1';
class RecProduct extends Component {
  constructor(props) {
    super(props);
    // console.log('props', this.props);

    this.state = {
      name: '',
      price: '',
      imgg: '',
      a: '',
      wished: this.props.wished,
      ecoval: 1,
    };
    // this.recommend = this.recommend.bind(this);
  }
  heartOn =function(e, id){

    e.preventDefault();
    this.setState(()=>({
        wished : true
    }))
   var wishedfixed=[];
   alert('hearton');
   email=this.props.email;
   db.collection('users')
   .doc(email)
   .get().then((doc)=>{
      let docs=doc.data();
      console.log(email);
      
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
      ).then(this.props.fakefunc)
      
        
   })
   
  }


  heartOff =function(e, id){
  
    e.preventDefault();
    this.setState(()=>({
        wished : false
    }))
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
       ).then( this.props.fakefunc)
       

     
    })
    

   }
  // recommend() {
  //   if (this.props.ecoval > 0) console.log('bukkuk loved this product');
  //   else console.log("bukkuk's recommendation!");
  // }

  render() {
    var { name, price, imgg, a, ecoval, idx , wished,email, id} = this.props;
    console.log('Recprops', this.props);
    return (
      <header>
        <div className="recBox"></div>
        <div
          id={'rdb' + idx}
          className="recommendbox"
          valuee={this.props.eco}
          // onMouseEnter={this.recommend}
        >
          <div className="rimage">
            <a href={this.props.a}>
              <img
                className="imagee"
                src={this.props.imgg}
                alt="Recommend image"
              ></img>
            </a>
          </div>
          <div>
            <p className="rdes1">{this.props.name}</p>
            <p className="rdes2">{this.props.price}won</p>
            
          </div>
          {(this.state.wished===true) ? (
              <img
                className="myheart__2"
                src="https://ifh.cc/g/d7BZO6.png"
                width="30px"
                onClick={(e) => this.heartOff(e, this.props.id)}
              />
            ) : (
              <img
                className="myheart__2"
                src="https://ifh.cc/g/IuZase.png"
                width="30px"
                onClick={(e) => this.heartOn(e, this.props.id)}
              />
            )}
        </div>
      </header>
    );
  }
}

export default RecProduct;
