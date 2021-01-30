import React, { Component } from 'react';   

class Counter extends Component {
    /*tagHelper() {
        if (this.state.tags.length === 0) return <p>No tags found</p>
        return <ul>{this.state.tags.map((el, i) => <li key={i} >{el}</li>)}</ul>
    }*/
    componentDidUpdate(prevProps, prevState)  {
        console.log(prevProps, prevState);
    }
    render() { 
        return (
            <div className="row">
            <div className="col-1">
            <span className={this.getElClass()}>{this.formatNum()}</span>                
            </div>
            <div className="col">
            <button onClick={() => this.props.onIncrement(this.props.counter)} className="btn btn-secondary btn-sm m-2">+</button>
            <button onClick={() => this.props.onDecrement(this.props.counter)}  className="btn btn-secondary btn-sm m-2" disabled={this.props.counter.value <= 0}>-</button>            
            <button onClick={() => this.props.onDelete(this.props.counter.id)} className="btn btn-danger btn-sm m-2">X</button>
            </div>
            </div>
        )
    }

    getElClass() {
        let classes = "badge m-2 badge-";
        classes += this.props.counter.value === 0 ? "warning" : "primary";
        return classes;
    }
    formatNum() {
        const {value} = this.props.counter;
        return value === 0 ? "Zero" : value;
    }
}
 
export default Counter;