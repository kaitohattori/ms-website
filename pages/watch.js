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
                <HlsPlayer url={`/api/v1/stream/${video.id}/playlist`}></HlsPlayer>
            ) : (
                <HlsPlayer url={`/api/proxy/stream/${video.id}/playlist`}></HlsPlayer>
            )}
            <br />
            {!isLoading &&
                (user ? (
                    <RatingStars
                        rate={rateByUser}
                        onChange={(rate) => handleRateChange(rate, video.id)}
                        isEnabledChange={true}
                    ></RatingStars>
                ) : (
                    <></>
                ))}

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
        fetch(`/api/videos/${videoId}/rate`, {
            method: 'PATCH',
            body: JSON.stringify({
                value: rate,
            }),
        });
    }
}

export async function getServerSideProps(context) {
    const { id } = context.query;
    let props = {};
    let accessToken = null;
    const session = getSession(context.req, context.res);
    if (session !== null && session.accessToken !== null) {
        accessToken = session.accessToken;
    }

    const apiClient = new VideoApiClient(accessToken);
    try {
        // get video
        props.video = await apiClient.getVideo(id);
        // gate rate
        const rate = await apiClient.getVideoRate(id);
        props.rateByUser = rate ? parseFloat(rate.value) : 0;
        // post analysis
        apiClient.postVideoAnalysis(id);
    } catch (err) {
        console.error(err.message);
    }

    return {
        props: props,
    };
}

export default Watch;
