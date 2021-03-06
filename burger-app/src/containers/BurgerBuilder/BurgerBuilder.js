import React, {Component} from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as action from '../../store/actions/index'
import axios from '../../axios-orders';

class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state ={...}
    // }
    
    state ={
        purchaseable: false,
        purchasing: false
    }

    //componentDidMount is a good component to fetch data
    componentDidMount(){
        this.props.onInitIngredients();
       
    }

    updatePurchaseState (ingredients) {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            } )
            .reduce((sum, el) => {
                return sum + el;
            }, 0)
            return sum>0;
    }


    purchaseHandler = () =>{
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    
    render (){
       
        const disabledInfo ={
            ...this.props.ing
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingrendients can't be loaded </p>:<Spinner/>
        
        if (this.props.ing){
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ing} />
    
                    <BuildControls 
                        ingredientAdded = {this.props.onIngredientAdded}
                        ingredientRemoved = {this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchaseable = {this.updatePurchaseState(this.props.ing)}
                        ordered = {this.purchaseHandler}
                    />
                </Auxiliary>
            );

            orderSummary =  <OrderSummary 
                purchaseCancelled = {this.purchaseCancelHandler}
                purchaseContinued = {this.purchaseContinueHandler}
                ingredients={this.props.ing}
                price = {this.props.price.toFixed(2)}/>
        }

        return (
            
            <Auxiliary>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed = {this.purchaseCancelHandler}
                >
                  {orderSummary}
                </Modal>
                {burger}

            </Auxiliary>

        );


    }
}
const mapStateToProps = state =>{
    return {
        ing: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdded: (ingName) => dispatch(action.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(action.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(action.initIngredients()),
        onInitPurchase: () => dispatch(action.purchaseInit())

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));