import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';


    function RenderMenuItem({ dish}){
        return (
            <Card> 
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>                
            </Card>  
        );
    }

    
    const Menu = (props) => {
        const menu = props.dishes.map((dish) => {
            //whenever you construct a list of items in React, every item requires a key attribute to be specified for it
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                     <RenderMenuItem dish={dish} />      
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
        

export default Menu;