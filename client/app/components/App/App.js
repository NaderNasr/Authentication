import React, { Component } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import profilePage from '../Home/Profile';


const App = ({ children }) => (
  <>
    <Header />

    <main>
      {children}
    </main>

    <Footer />
  </>
);

export default App;
