import React, {Component} from 'react';
import classes from './BurgerIngredient.css';
import PropTypes from 'prop-types'; 
import BurgerBuilder from '../../../containers/BurgerBuilder/BurgerBuilder';

class BurgerIngredient extends Component {

    render () {
        let ingredient = null;

    switch(this.props.type){
        case('bread-bottom'):
            ingredient = <div className={classes.BreadBottom}></div>;
            break;
        case ('bread-top'):
            ingredient=
                (
                <div className={classes.BreadTop}>
                    <div className ={classes.Seeds1}></div>
                    <div className ={classes.Seeds2}></div>
                </div>
                );
                break;
        case ('meat'):
            ingredient = <div className ={classes.Meat}></div>;
            break;
        case ('salad'):
            ingredient =<div className ={classes.Salad}></div>;
            break;
        case ('bacon'):
            ingredient = <div className ={classes.Bacon}></div>;
            break;
        case ('cheese'):
            ingredient = <div className ={classes.Cheese}></div>;
            break;
        default:
            ingredient = null;
    }

    return ingredient;

    }
}

//useful when working on projects with other people
//proptype validation is useful so the wrong type won't be used
//not really necessary on a single developer app, but it's good to 
//keep in practice for larger projects.
//to use prop validation, you will have to convert the stateless components to 
//classes.
BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredient;