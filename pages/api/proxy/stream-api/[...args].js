import { createProxyMiddleware } from 'http-proxy-middleware'

export const config = {
    api: {
        externalResolver: true,
    },
}

const apiProxy = createProxyMiddleware({
    target: process.env.STREAM_API_URL,
    changeOrigin: true,
    pathRewrite: { [`^/api/proxy/stream-api`]: '/api/v1/videos' },
    secure: false,
})

export default apiProxy
