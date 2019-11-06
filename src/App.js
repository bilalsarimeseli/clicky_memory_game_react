import React, { Component } from "react";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import cards from "./cards.json";
import './App.css';
import Card from './components/Card/Card';

class App extends Component {
  // Setting this.state.cards to the cards json array
  state = {
    cards,
    score: 0,
    highscore: 0
  };

  gameOver = () => {
    if (this.state.score > this.state.highscore) {
      this.setState({highscore: this.state.score}, function() {
        console.log(this.state.highscore);
      });
    }
    this.state.cards.forEach(card => {
      card.count = 0;
    });
    alert(`Game Over :( \nscore: ${this.state.score}`);
    this.setState({score: 0});

    return true;
  }

  
  
    

  clickCount = id => {
    this.state.cards.find((o, i) => {
      if (o.id === id) {
        if(o.count === 0){
          let cardsCopy = [...this.state.cards]

           cardsCopy[i].count = 1;
          cardsCopy.sort(() => Math.random() - 0.5)

          if (this.state.score + 1 > this.state.highscore) {
            this.setState({highscore: this.state.score + 1, cards : cardsCopy}, function() {
              console.log(this.state.highscore);
            });
          } else {
            this.setState({score : this.state.score + 1, cards : cardsCopy}, function(){
              console.log(this.state.score);
            });
          } 
          

          return true; 
        } 
        else {
          let updateCards = this.state.cards.map(card => {
            card.count = 0;
            return card;
          });
          this.setState({
            cards: updateCards,
            score: 0
          })

        }
      }
    });
  }
  // Map over this.state.cards and render a cardCard component for each card object
  render() {
    return (
      <Wrapper>
        <Header score={this.state.score} highscore={this.state.highscore}>Clicky Game</Header>
        {this.state.cards.map(card => (
          <Card
            clickCount={this.clickCount}
            id={card.id}
            key={card.id}
            image={card.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;

  



