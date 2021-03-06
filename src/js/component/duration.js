/**
 * @file duration.js
 * @author yuhui<yuhui06@baidu.com>
 * @date 2017/11/10
 */


import classnames from 'classnames';
import {Component, DOM, util} from 'larkplayer';

import timeFormat from '../util/time-format';

export default class Duration extends Component {
    constructor(player, options) {
        super(player, options);

        this.handleLoadedMetaData = this.handleLoadedMetaData.bind(this);

        this.player.on('durationchange', this.handleLoadedMetaData);
        this.player.on('loadedmetadata', this.handleLoadedMetaData);
    }

    handleLoadedMetaData(event) {
        DOM.textContent(this.el, timeFormat(Math.floor(this.player.duration())));
    }

    reset() {
        DOM.textContent(this.el, '');
    }

    dispose() {
        this.player.off('durationchange', this.handleLoadedMetaData);
        this.player.off('loadedmetadata', this.handleLoadedMetaData);

        super.dispose();
    }

    createEl() {
        // @todo 暂时将 duration 的值写在这，后面需要处理下对于已经发生的事件怎么办
        const durationContent = timeFormat(Math.floor(this.player.duration()));

        return (
            <div className={classnames('lark-duration', this.options.className)}>
                {durationContent}
            </div>
        );
    }
}

