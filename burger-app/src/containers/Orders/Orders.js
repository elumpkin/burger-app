import React, {Component} from 'react';
import Order from '../../components/Order/CheckoutSummary/Order'
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as action from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component {
    
    componentDidMount(){
       this.props.onFetchOrders();
    }

    render(){
        let orders =<Spinner />;
        if (!this.props.loading) {
            orders = this.props.order.map(odr=>(

                    <Order 
                        key={odr.id}
                        ingredients={odr.ingredients}
                        price={+odr.price}/>
                ))
        }

        return(
            <div>
                {orders}
            </div>
        );
    }
}

const mapStatToProps = state =>{
    return{
        order: state.order.order,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchOrders: () => dispatch(action.fetchOrders())
    }
}

export default connect(mapStatToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))