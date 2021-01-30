import React, { Component } from 'react';
                                                                                                                                                                                                                                                                                                            
const NavBar = ({counterCount}) => {
  return (
  <nav className="navbar navbar-light bg-light">
  <a className="navbar-brand" href="#">Navbar</a>
  <span className="badge badge-pill badge-secondary">You currently have {counterCount} items in your cart</span>
  </nav>
  );
}

export default NavBar;