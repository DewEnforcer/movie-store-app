import React, { Component } from 'react';
import Counter from "./counter"
class Counters extends Component {
    style = {
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "flex-start"
    }
    render() {
        const {counters, onDelete, onIncrement, onDecrement, onReset} = this.props; 
        return (
            <div>
                <button onClick={onReset} className="btn btn-primary btn-sm m-2">Reset</button>
                {counters.map((countr) => <Counter key={countr.id} counter={countr} onDecrement={onDecrement} onIncrement={onIncrement} onDelete={onDelete}/>)}
            </div>  
        );
    }
}
 
export default Counters;