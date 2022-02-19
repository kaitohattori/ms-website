import { getSession } from '@auth0/nextjs-auth0'
import { useUser } from '@auth0/nextjs-auth0'
import Layout from '../components/Layout'
import VideoCard from '../components/VideoCard'
import { VideoApiClient } from '../lib/VideoApiClient'

function Home({ videos }) {
  const { user, _, isLoading } = useUser()

  return (
    <Layout user={user} loading={isLoading}>
      <div>
        <ul id="video-grid">
          {videos.map((video, _) => {
            return (
              <li key={video.id} className="video">
                <VideoCard video={video}></VideoCard>
              </li>
            )
          })}
        </ul>
      </div>

      <style jsx global>{`
      * { font-family: 'Arial'; }
      body{
          margin: 0px;
          padding: 40px;
      }
      #video-grid {
          margin: 0px;
          padding: 0px;
          display: flex;
          flex-wrap: wrap;
          width: 100%;
      }
      .video {
          width: 300px;
          height: 250px;
          margin-top: 10px;
          margin-right: 10px;
          float: left;
          list-style: none;
      }
      `}</style>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { ref } = context.query
  let accessToken = null
  const session = getSession(context.req, context.res)
  if (session !== null && session.accessToken !== null) {
    accessToken = session.accessToken
  }
  const apiClient = new VideoApiClient(accessToken)
  const videos = await apiClient.getFormattedVideos(ref)
  return {
    props: {
      videos: videos,
    },
  }
}

export default Home
