import { withApiAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import { VideoApiClient } from '../../../../lib/VideoApiClient';

const patch = async (req, res) => {
    const { id } = req.query;
    try {
        const { accessToken } = await getAccessToken(req, res);
        const apiClient = new VideoApiClient(accessToken);
        await apiClient.patchVideoRate(id, req.body);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).end(error.message);
    }
};

const api = async (req, res) => {
    if (req.method === 'PATCH') {
        withApiAuthRequired(patch(req, res));
    }
};

export default api;
