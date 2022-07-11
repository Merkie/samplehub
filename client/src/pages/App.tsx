import type { Component } from 'solid-js';

import styles from '../styles/App.module.css';

// Components
import Header from '../components/Header';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <Header />
    </div>
  );
};

export default App;
