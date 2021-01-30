import React from 'react';

const Like = ({Liked, onClick}) => {
    let name = "fa fa-heart";
    if (!Liked) name += "-o"
    return (  
        <i style={{cursor: "pointer"}} onClick={onClick} className={name}></i>
    );
}
 
export default Like;