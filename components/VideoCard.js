import Link from 'next/link';
import Image from 'next/image';
import RatingStars from './RatingStars';

function VideoCard({ video }) {
    const thumbnailUrl = `/api/videos/${video.id}/thumbnail`;

    return (
        <Link href={{ pathname: '/watch', query: { id: video.id } }}>
            <a>
                <div className='img-container'>
                    <Image src={thumbnailUrl} alt='image' layout='fill' objectFit='contain' />
                </div>
                <div className='info'>
                    <div className='title-rate-container'>
                        <div>
                            <b>{video.title}</b>
                        </div>
                        <RatingStars rate={video.averageRate} isEnabledChange={false}></RatingStars>
                    </div>
                    <div>{video.totalAnalysis} views</div>
                </div>

                <style jsx>{`
                    .img-container {
                        width: 100%;
                        height: 75%;
                        position: relative;
                    }

                    .info {
                        padding: 10px;
                        background-color: white;
                    }

                    .title-rate-container {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                    }
                `}</style>
            </a>
        </Link>
    );
}

export default VideoCard;
