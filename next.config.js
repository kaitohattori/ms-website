const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            env: {
                WEB_API_URL: "http://localhost:8080",
                STREAM_API_URL: "http://localhost:8081",
            }
        }
    }

    return {
        env: {
            WEB_API_URL: "http://host.docker.internal:8080",
            STREAM_API_URL: "http://host.docker.internal:8081",
        }
    }
}
