import type { Component } from 'solid-js';
import styles from '../styles/Header.module.css';

const Header: Component = () => {

    return(
        <div class={styles.Header}>
            <div class={styles.branding}>
                <b>Sample<span>Hub</span></b>
            </div>
            <div>
                <button class={styles.discordBtn}><i class="bi bi-discord"></i> Login with Discord</button>
            </div>
        </div>
    );
} 

export default Header;