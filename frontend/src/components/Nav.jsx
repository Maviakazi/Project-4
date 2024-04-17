import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="bg-body-tertiary mb-2 py-2 px-4">
      <Link to={'/'}>
        <h2>
          <img src='/main-logo.png' width={48} height={48} alt="Logo" />
        </h2>
      </Link>
    </nav>
  );
}

export default Nav;
