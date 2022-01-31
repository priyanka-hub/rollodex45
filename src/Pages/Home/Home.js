//import React, { useEffect } from 'react'
import CardList from '../../components/Card-List/Card-List.component';
import Search from '../../components/Search/Search.component';
import './Home.styles.css'
import {connect} from 'react-redux'
import { searchMonster } from '../../redux/monster/monster.action';
import { useState,useEffect } from 'react';
import axios from 'axios'//updated version of fetch API like promise
import {Container,Row} from 'react-bootstrap'
import { Form } from 'react-bootstrap';

const Home =(props)=>{
const[data,setData]=useState([])
const {searchName}=props
console.log(data)
useEffect(async()=>{
    const result=await axios('https://jsonplaceholder.typicode.com/users')
    setData(result.data)
},[])
const filteredMonsters = data.filter((monster) => monster.name.toLowerCase().includes(searchName.toLowerCase()))
const handleSearch = (event)=>{
    const{searchField}=props
    searchField(event.target.value)
    //this.setState({searchField:event.target.value})
}
    return (
    <>
    <Container>
    <div className='App'>
                <Row><h1>Monsters Rollodex</h1></Row>
               
              <Row>  <Search handleSearch={handleSearch} /></Row>
                <Row><CardList monsters={filteredMonsters} /></Row>
                
            </div>
            </Container>
    </>
)}
//class Home extends React.Component{
  //  constructor(){
    //    super();
      //  this.state = {
        //    monsters: [],
            //searchField: ''
        //}
    //}
    //componentDidMount(){
      //  fetch('https://jsonplaceholder.typicode.com/users')
        //    .then(response => response.json())
          //  .then(users => this.setState({ monsters: users }));
    //}

   
   
   //Through Dispatch =>action creator =>searchMonster(payload)//Function Call
//searchField:=> It runs as a prop in Component
   const mapDispatchToProps=dispatch=>({ searchField:username => dispatch(searchMonster(username))
})
//state=>Store,State=>root reducer,Search Fields=>Monster Reducer
   const mapStateToProps=state=>(
       {
           searchName:state.search.searchField
       }
   )
export default connect(mapStateToProps,mapDispatchToProps)(Home)//Higher order components