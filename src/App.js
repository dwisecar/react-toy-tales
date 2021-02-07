import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  componentDidMount(){
    this.fetchToys()
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  addToToys = (toy) => {
    this.setState((prevState) => ({
      toys: [...prevState.toys, toy]
    }))
  }


  handleLike = (id, likes) => {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({likes: likes}) 
    })
  }

  handleDelete = toy => {
    const index = this.state.toys.indexOf(toy)
    let arr = [...this.state.toys]
    arr.splice(index, 1)    
    this.setState({toys: arr})
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json'
      }})
  }

  fetchToys = () => {
    fetch('http://localhost:3000/toys').then(res => res.json()).then(data => this.setState({toys: data}))
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm addToToys={this.addToToys}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} handleLike={this.handleLike} handleDelete={this.handleDelete}/>
      </>
    );
  }

}

export default App;
