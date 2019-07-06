import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, 
        Row, Col, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponrnt';
import { baseUrl } from '../shared/baseUrl';


    // const required = (val) => val && val.length;
    const minLength = (len) => (val) => val && (val.length >= len);
    const maxLength = (len) => (val) => !(val) || (val.length <= len);

    class CommentForm extends Component{
        
        constructor(props){
            super(props);

            this.state={
                isModalOpen: false
            }

            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }

        handleSubmit(values){
            this.toggleModal();
            // console.log(`Cuurent state is: ${JSON.stringify(values)}`);
            this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        }

        render(){
            return(
                <> 
                    <Button outline className="sencondary" type="submit" onClick={this.toggleModal} ><span className="fa fa-pencil"></span> Submit Comment</Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal} >Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group" >
                                    <Col>
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                    </Col> 
                                </Row>
                                <Row className="form-group" >
                                    <Col>
                                        <Label htmlFor="author">Your Name</Label>
                                        <Control.text model=".author" id="author" name="author" placeholder="Your Name" 
                                        className="form-control"
                                        validators={{
                                        minLength: minLength(3), maxLength: maxLength(15)
                                        }} 
                                        />
                                    </Col>
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages ={{
                                            minLength: "Must be greater than 2 characters",
                                            maxLength: "Must be 15 characters or less"
                                        }} 
                                    />
                                </Row>
                                <Row className="form-group" >
                                    <Col>
                                        <Label htmlFor="comment">Comment</Label>
                                        <Control.textarea model=".comment" rows="6" id="comment" name="comment" className="form-control" />
                                    </Col>
                                </Row>      
                                <Button type="submit" className="bg-primary">Submit</Button> 
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </>                
            );
        }
    }   
    
    function RenderDish({dish}){
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top width="100%" src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    function RenderComments({comments, addComment, dishId}){
        if(comments != null){
            const Comments = comments.map((comment) =>{
                return (
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </li>
                );
            });

            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {Comments}
                    </ul>
                    <CommentForm dishId={dishId} addComment={addComment} />
                </div>
            );
        }
        else{
            return (
                <div></div>
            );
        }
    }

    const DishDetail = (props) => {
        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if(props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if(props.dish != null){ 
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderDish dish={props.dish} />
                        <RenderComments comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.dish.id} />
                    </div>
                </div>         
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }

export default DishDetail;
