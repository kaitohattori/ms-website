import { VideoApiClient } from '../../../../lib/VideoApiClient';

const get = async (req, res) => {
    const { id } = req.query;
    try {
        const apiClient = new VideoApiClient();
        const data = await apiClient.getVideoThumbnail(id);
        data.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).end(error.message);
    }
};

const api = async (req, res) => {
    if (req.method === 'GET') {
        get(req, res);
    }
};

export default api;
