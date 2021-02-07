import React, { Component } from 'react';

class ToyCard extends Component {

  state = {
    likes: this.props.toy.likes
  }

  handleLike = () => {
    const newLikes = this.state.likes + 1;
    this.props.addLike(this.props.toy.id, newLikes)
    return this.setState({
      likes: newLikes
    })
  }

  render() {
    let toy = this.props.toy
    return (
      <div className="card">
        <h2>{toy.name}</h2>
        <img src={toy.image} alt={toy.name} className="toy-avatar" />
        <p>{this.state.likes} Likes </p>
        <button className="like-btn" onClick={() => this.handleLike()}>Like {'<3'}</button>
        <button className="del-btn" onClick={() => this.props.handleDelete(toy)}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
