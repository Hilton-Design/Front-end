import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
  return (  
    <div class="top-nav">
      <div>
        <Link to='/'>Home</Link>
        <Link to='/commute'>Commute</Link>
        <Link to='/error'>For check error</Link>
      </div>
      <div>
        <Link to='/login'>Login</Link>
        <Link to='/signUp'>Sign up</Link>
        <Link onClick to='/'>Log out</Link>
      </div>
    </div>
  );
}
 
export default Header;