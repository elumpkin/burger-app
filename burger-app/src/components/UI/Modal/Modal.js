import React, { Component } from 'react';
import classes from './Modal.css';
import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop'
import { relative } from 'path';

class Modal extends Component{

    //checking to see if anything changed before calling this method
    shouldComponentUpdate(nextProps, nextState){
        //only returns true if show changes
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate(){
        console.log('[Modal] WillUpdate')
    }
    render(){
        return(
            <Auxiliary>
                <Backdrop show={this.props.show}
                clicked ={this.props.modalClosed}/>

                <div 
                    className ={classes.Modal}
                    style = {{
                        transform: this.props.show ? 'translateY(0)': 'translateY(-100vh)',
                        opacity: this.props.show ? '1': '0' }}>
                    {this.props.children}
                </div>
            </Auxiliary>

        )
    }
} 
export default Modal;