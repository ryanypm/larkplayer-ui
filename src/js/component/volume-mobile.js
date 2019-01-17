/**
 * @file 音量 UI 组件
 * @author yuhui06
 * @date 2018/3/9
 * @date 2018/4/25 现在通过 js 修改音量也会触发 UI 改变（yuhui06）
 */


import classnames from 'classnames';
/* eslint-disable no-unused-vars */
import {Component, Events, DOM} from 'larkplayer';
/* eslint-enable no-unused-vars */

import tooltip from './tooltip';


export default class Volume extends Component{
    constructor(player, options) {
        super(player, options);

        this.volumeRecord = {
            last: this.player.volume(),
            current: this.player.volume()
        };

        this.iconClick = this.iconClick.bind(this);
        this.icon = DOM.$('.lark-volume-icon', this.el);

        Events.on(this.icon, 'click', this.iconClick);
        this.player.on('volumechange', this.handleVolumeChange);
    }

    iconClick(event) {
        if (this.player.volume() && !this.player.muted()) {
            this.player.volume(0);
        } else {
            this.player.volume(this.volumeRecord.last);
            this.player.muted(false);
        }
		
		DOM.toggleClass(this.icon, 'lark-icon-sound-large');
		DOM.toggleClass(this.icon, 'lark-icon-sound-small');
    }

    dispose() {
        Events.off(this.icon, 'click', this.iconClick);
        this.player.off('volumechange', this.handleVolumeChange);

        super.dispose();
    }

    createEl() {
        return (
            <div className={classnames('lark-volume-mobile', this.options.className)}>
                <div className="lark-volume-icon lark-icon-sound-large"></div>
            </div>
        );
    }
}



