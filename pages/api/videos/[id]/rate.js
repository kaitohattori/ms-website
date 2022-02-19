import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0'
import { VideoApiClient } from '../../../../lib/VideoApiClient'

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
}

const post = async (req, res) => {
    const { id } = req.query
    try {
        const { value } = req.query

        const { accessToken } = await getAccessToken(req, res)
        const apiClient = new VideoApiClient(accessToken)
        const data = await apiClient.postVideosIdRate(id, value)
        res.status(200).json(data)
    } catch (error) {
        console.error(error)
        res.status(error.status || 500).end(error.message)
    }
}

export default async (req, res) => {
    if (req.method === 'POST') {
        withApiAuthRequired(post(req, res))
    }
}
