import Link from 'next/link'
import RatingStars from './RatingStars'

function VideoCard({ video }) {
    const thumbnailUrl = `/api/videos/${video.id}/thumbnail`

    return (
        <Link href={{ pathname: '/watch', query: { id: video.id } }}>
            <a>
                <div className="img-container">
                    <img className="img" src={thumbnailUrl} alt="image"></img>
                </div>
                <div className="info">
                    <div className="title-rate-container">
                        <div><b>{video.title}</b></div>
                        <RatingStars rate={video.averageRate} isEnabledChange={false}></RatingStars>
                    </div>
                    <div>{video.totalAnalysis} views</div>
                </div>

                <style jsx>{`
                .vertical-flex {
                    display: flex;
                    flex-direction: column;
                }

                .img-container {
                    height: 75%;
                }

                .img {
                    height: 100%;
                    width: 100%;
                    vertical-align: bottom;
                    object-fit: cover;
                    pointer-events: none;
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
    )
}

export default VideoCard
