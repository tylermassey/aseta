import * as React from 'react';

import {
    mediaQueries,
    mediaQueryEvent,
    MediaSizes,
} from '../utils/mediaWatcher';

interface OwnState {
    mediaSize: MediaSizes;
}

class MediaWatcher extends React.Component<{}, OwnState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            mediaSize: MediaSizes.xs,
        };
    }

    componentDidMount() {
        mediaQueryEvent(this.setMediaSize);
        for (const mq in mediaQueries) {
            mediaQueries[mq].addListener(() =>
                mediaQueryEvent(this.setMediaSize)
            );
        }
    }

    componentWillUnmount() {
        for (const mq in mediaQueries) {
            mediaQueries[mq].removeListener(() =>
                mediaQueryEvent(this.setMediaSize)
            );
        }
    }

    setMediaSize = (mediaSize: MediaSizes) => this.setState({ mediaSize });

    render() {
        return React.cloneElement(
            this.props.children as React.ReactElement<any>,
            {
                mediaSize: this.state.mediaSize,
            }
        );
    }
}

export default MediaWatcher;
