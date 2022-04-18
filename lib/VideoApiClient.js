export class VideoApiClient {
    constructor(accessToken = null) {
        this.apiBase = `${process.env.WEB_API_URL}/api/v1`;
        this.accessToken = accessToken;
        this.basicAuth = { Authorization: `Bearer ${this.accessToken}` };
    }

    async getVideos(ref) {
        const url = `${this.apiBase}/videos?sortType=${ref ?? 'popular'}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: this.basicAuth,
        });
        if (!response.ok) {
            throw new Error('Video API Client Error: failed to get videos');
        }
        const data = await response.json();
        return data;
    }

    async getVideoObjects(ref) {
        const videos = await this.getVideos(ref);
        const videoObjects = [];
        for (const video of videos) {
            // get total analysis
            const totalAnalysisRes = await this.getVideoAnalysisTotal(video.id);
            video.totalAnalysis = totalAnalysisRes.value;
            // get average rate
            const averageRateRes = await this.getVideoRateAverage(video.id);
            video.averageRate = averageRateRes.value;
            // add to array
            videoObjects.push(video);
        }
        return videoObjects;
    }

    async getVideo(id) {
        const url = `${this.apiBase}/videos/${id}`;
        const response = await fetch(url, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`Video API Client Error: failed to get video by ${id}`);
        }
        const data = await response.json();
        return data;
    }

    async getVideoThumbnail(id) {
        const url = `${this.apiBase}/videos/${id}/thumbnail`;
        const response = await fetch(url, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`Video API Client Error: failed to get video thumbnail by ${id}`);
        }
        return response.body;
    }

    async patchVideoRate(id, body) {
        const url = `${this.apiBase}/videos/${id}/rate`;
        const response = await fetch(url, {
            method: 'PATCH',
            headers: this.basicAuth,
            body: body,
        });
        if (!response.ok) {
            throw new Error(`Video API Client Error: failed to update rate by ${id}`);
        }
    }

    async getVideoRate(id) {
        const url = `${this.apiBase}/videos/${id}/rate`;
        const response = await fetch(url, {
            method: 'GET',
            headers: this.basicAuth,
        });
        if (!response.ok) {
            throw new Error(`Video API Client Error: failed to get rate by ${id}`);
        }
        const data = await response.json();
        return data;
    }

    async getVideoRateAverage(id) {
        const url = `${this.apiBase}/videos/${id}/rate/average`;
        const response = await fetch(url, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`Video API Client Error: failed to get average rate by ${id}`);
        }
        const data = await response.json();
        return data;
    }

    async postVideoAnalysis(id) {
        const url = `${this.apiBase}/videos/${id}/analysis`;
        const response = await fetch(url, {
            method: 'POST',
            headers: this.basicAuth,
        });
        if (!response.ok) {
            throw new Error(`Video API Client Error: failed to post analysis by ${id}`);
        }
        const data = await response.json();
        return data;
    }

    async getVideoAnalysisTotal(id) {
        const url = `${this.apiBase}/videos/${id}/analysis/total`;
        const response = await fetch(url, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`Video API Client Error: failed to get total analysis by ${id}`);
        }
        const data = await response.json();
        return data;
    }
}
