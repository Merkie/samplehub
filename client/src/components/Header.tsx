import type { Accessor, Component } from 'solid-js';
import { Show } from 'solid-js';

import styles from '../styles/Header.module.css';

import { discord_login_url } from '../secret';

interface HeaderProps {
    authorized: Accessor<Boolean>;
    deauth_user: any;
}

const Header: Component<HeaderProps> = props => {
    return(
        <div class={styles.Header}>
            <div class={styles.branding}>
                <b>Sample<span>Hub</span></b>
            </div>
            <div>
                <Show when={!props.authorized()}>
                    <button onClick={() => window.location.assign(discord_login_url)} class={styles.discordBtn}><i class="bi bi-discord"></i> Login with Discord</button>
                </Show>
                <Show when={props.authorized()}>
                    <button onClick={() => props.deauth_user()} class={styles.discordBtn}><i class="bi bi-exit"></i> Logout</button>
                </Show>
            </div>
        </div>
    );
} 

export default Header;