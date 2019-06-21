import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import DishDetail from './DishdetailComponent';

class Menu extends Component{

    constructor(props){
        super(props);  //required whenever you define a class component
        
        // state store in properties related to this component
        // that we can make use of
        this.state = {  
            selectedDish: null      
        }
    }

    onDishSelect(dish){
        this.setState({
            selectedDish: dish
        });
    }

    //return corresponding view for this component
    render(){

        const menu = this.props.dishes.map((dish) => {
            //whenever you construct a list of items in React, every item requires a key attribute to be specified for it
            return (
                <div className="col-12 col-md-5 m-1">
                    <Card key={dish.id} onClick={() => this.onDishSelect(dish)}> 
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>                
                    </Card>          
                </div>
            );
        }); 

        return (
            <div className="container">
                <div className="row"> 
                    {menu} 
                </div>
                <DishDetail dish={ this.state.selectedDish } />
            </div>
        );
    }
}

export default Menu;