import { getSession } from '@auth0/nextjs-auth0';
import { createProxyMiddleware } from 'http-proxy-middleware';

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};

export default createProxyMiddleware({
    target: process.env.WEB_API_URL,
    changeOrigin: true,
    pathRewrite: { [`^/api/videos/upload`]: '/api/v1/videos/upload' },
    secure: false,
    onProxyReq: function onProxyReq(proxyReq, req, res) {
        const session = getSession(req, res);
        if (session !== null && session.accessToken !== null) {
            proxyReq.setHeader('Authorization', `Bearer ${session.accessToken}`);
        }
    },
});
