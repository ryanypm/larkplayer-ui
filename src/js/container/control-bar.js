/**
 * @file ControlsBar 播放器控制条
 * @author yuhui<yuhui06@baidu.com>
 * @date 2017/11/9
 */

import classnames from 'classnames';
import {Component} from 'larkplayer';

import CurrentTime from '../component/current-time';
import Duration from '../component/duration';
import FullscreenButton from '../component/fullscreen-button';
import ProgressBar from './progress-bar';
import Volume from '../component/volume-mobile';

export default class ControlBar extends Component {
    reset() {
        this.children.forEach(child => {
            child && child.reset && child.reset();
        });
    }

	isShowComponent(name) {
		const controls = this.player.options.controls || [
			'currenttime',
			'progressbar',
			'duration',
			'volume',
			'fullscreenbutton',
		];

		if (controls.includes('all')) return '';
		return controls.includes(name) ? '' : 'hidden-control-item';
	}

    createEl() {
        return (
            <div className={classnames('lark-control-bar', this.options.className)}>
                <CurrentTime className={this.isShowComponent('currenttime')} />
                <ProgressBar className={this.isShowComponent('progressbar')} />
                <Duration className={this.isShowComponent('duration')} />
				<Volume className={this.isShowComponent('volume')} />
                <FullscreenButton className={this.isShowComponent('fullscreenbutton')} />
            </div>
        );
    }
}