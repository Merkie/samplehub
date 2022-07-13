import type { Accessor, Component } from 'solid-js';
import { Show, createSignal } from 'solid-js';

import styles from '../styles/Header.module.css';

import { discord_login_url } from '../secret';

import {UploadModal} from './UploadModal';

interface HeaderProps {
	authorized: Accessor<Boolean>;
	deauth_user: any;
}

const Header: Component<HeaderProps> = (props) => {

    const [userActionMenuVisible, setUserActionMenuVisible] = createSignal(false);
	const [uploadModalVisible, setUploadModalVisible] = createSignal(false);

	return (
		<div class={styles.Header}>
			<Show when={uploadModalVisible()}>
				<UploadModal />
			</Show>
			<div class={styles.branding}>
				<b>
					Sample<span>Hub</span>
				</b>
			</div>
			<div>
				<Show when={!props.authorized()}>
					<button onClick={() => window.location.assign(discord_login_url)} class={styles.discordBtn}>
						<i class="bi bi-discord"></i> Login with Discord
					</button>
				</Show>
				<Show when={props.authorized()}>
					<div class={styles.menuItems}>
                        <div onClick={() => setUserActionMenuVisible(!userActionMenuVisible())} class={styles.userIcon}>
						    <i class="bi bi-person-fill"></i>
                            <Show when={userActionMenuVisible()}>
                                <div class={styles.userActions}>
                                    <p><span>Settings</span><i class="bi bi-gear"></i></p>
                                    <p onClick={() => props.deauth_user()}><span>Logout</span><i class="bi bi-box-arrow-right"></i></p>
                                </div>
                                <div class={styles.invisibleOverlay}>
                                </div>
                            </Show>
                        </div>
						<button onClick={() => setUploadModalVisible(!uploadModalVisible())} class={styles.upload_btn}>Upload <i class="bi bi-plus"></i></button>
					</div>
				</Show>
			</div>
		</div>
	);
};

export default Header;
