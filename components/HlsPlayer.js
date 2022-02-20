import React from 'react';
import Hls from 'hls.js';

class HlsPlayer extends React.Component {
    componentDidMount() {
        var video = document.getElementById('video');
        video.volume = 0;
        const { url } = this.props;
        if (Hls.isSupported()) {
            var hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                console.log('play');
                video.play();
            });
        }
    }

    render() {
        return (
            <div>
                <video id='video' controls autoPlay></video>

                <style jsx>{`
                    #video {
                        height: 50vh;
                    }
                `}</style>
            </div>
        );
    }
}

export default HlsPlayer;
