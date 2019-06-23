import React, { Component }from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';

class Main extends Component {

  constructor(props){
    super(props);

    // state store in properties related to this component
    // that we can make use of
    this.state = {
      dishes: DISHES,
      selectedDish: null
    };
  }

  onDishSelect(dishId){
    this.setState({
        selectedDish: dishId
    });
  }

  //return corresponding view for this component
  render() {
    return (
      <div>
        <Header />
        <Menu dishes={this.state.dishes}
            onClick={(dishId) => this.onDishSelect(dishId)} />
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish )[0]} />
        <Footer />
      </div>
    );
  }
}

export default Main;
