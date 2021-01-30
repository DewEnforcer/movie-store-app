import React from 'react';
import propTypes from "prop-types";

const Navigation = ({items, activeGenre, onGenreChange, textProperty, valueProperty}) => {
    return ( 
        <ul className="list-group">
            {items.map((section) => <li style={{cursor: "pointer"}} onClick={() => onGenreChange(section)} key={section[valueProperty]} className={activeGenre === section[valueProperty] ? "list-group-item active" : "list-group-item"}>{section[textProperty]}</li>)}
        </ul>
     );
}
 
Navigation.propTypes = {
    activeGenre: propTypes.string.isRequired,
    items: propTypes.array.isRequired,
    onGenreChange: propTypes.func.isRequired,
    textProperty: propTypes.string.isRequired,
    valueProperty: propTypes.string.isRequired,
}

Navigation.defaultProps = {
    textProperty: "name",
    valueProperty: "_id",
}

export default Navigation;