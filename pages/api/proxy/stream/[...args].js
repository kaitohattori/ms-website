import { createProxyMiddleware } from 'http-proxy-middleware';

export const config = {
    api: {
        externalResolver: true,
    },
};

const apiProxy = createProxyMiddleware({
    target: process.env.STREAM_API_URL,
    changeOrigin: true,
    pathRewrite: { [`^/api/proxy/stream`]: '/api/v1/stream' },
    secure: false,
});

export default apiProxy;
