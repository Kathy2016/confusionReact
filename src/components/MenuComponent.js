import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


class Menu extends Component{

    constructor(props){
        super(props);  //required whenever you define a class component
        
    }


    //return corresponding view for this component
    render(){

        const menu = this.props.dishes.map((dish) => {
            //whenever you construct a list of items in React, every item requires a key attribute to be specified for it
            return (
                <div className="col-12 col-md-5 m-1">
                    <Card key={dish.id} onClick={() => this.props.onClick(dish.id)}> 
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
            </div>
        );
    }
}

export default Menu;