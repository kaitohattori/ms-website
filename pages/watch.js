import { getSession, useUser } from '@auth0/nextjs-auth0';
import Layout from '../components/Layout';
import HlsPlayer from '../components/HlsPlayer';
import RatingStars from '../components/RatingStars';
import { VideoApiClient } from '../lib/VideoApiClient';

function Watch({ video, rateByUser }) {
    const { user, _, isLoading } = useUser();

    return (
        <Layout user={user} loading={isLoading}>
            {process.env.NODE_ENV === 'production' ? (
                <HlsPlayer url={`/api/v1/videos/${video.id}/stream`}></HlsPlayer>
            ) : (
                <HlsPlayer url={`/api/proxy/stream-api/${video.id}/stream`}></HlsPlayer>
            )}
            <br />
            <RatingStars
                rate={rateByUser}
                onChange={(rate) => handleRateChange(rate, video.id)}
                isEnabledChange={true}
            ></RatingStars>

            <style jsx global>{`
                * {
                    font-family: 'Arial';
                }
                body {
                    margin: 0px;
                    padding: 40px;
                }
            `}</style>
        </Layout>
    );

    function handleRateChange(rate, videoId) {
        fetch(`/api/videos/${videoId}/rate?value=${rate}`, { method: 'POST' });
    }
}

export async function getServerSideProps(context) {
    const { id } = context.query;
    let accessToken = null;
    const session = getSession(context.req, context.res);
    if (session !== null && session.accessToken !== null) {
        accessToken = session.accessToken;
    }
    const apiClient = new VideoApiClient(accessToken);
    // get video
    const video = await apiClient.getVideosId(id);
    // get rate
    const rate = await apiClient.getVideosIdRate(id);
    const rateValue = rate ? parseFloat(rate.value) : 0;
    // post analysis
    apiClient.postVideosIdAnalysis(id);
    return {
        props: {
            video: video,
            rateByUser: rateValue,
        },
    };
}

export default Watch;
