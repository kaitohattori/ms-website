import { VideoApiClient } from '../../../../lib/VideoApiClient'

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
}

const get = async (req, res) => {
    const { id } = req.query
    try {
        const apiClient = new VideoApiClient()
        const data = await apiClient.getVideosIdThumbnail(id)
        data.pipe(res)
    } catch (error) {
        console.error(error)
        res.status(error.status || 500).end(error.message)
    }
}

const api = async (req, res) => {
    if (req.method === 'GET') {
        get(req, res)
    }
}

export default api
