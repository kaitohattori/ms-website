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
            return null;
        }
        const data = await response.json();
        return data;
    }

    async getFormattedVideos(ref) {
        const videos = await this.getVideos(ref);
        if (videos === null) {
            return [];
        }
        const formattedVideos = [];
        for (const video of videos) {
            // get total analysis
            const totalAnalysisRes = await this.getVideosIdAnalysisTotal(video.id);
            video.totalAnalysis = totalAnalysisRes ? totalAnalysisRes.value : 0;
            // get average rate
            const averageRateRes = await this.getVideosIdRateAverage(video.id);
            video.averageRate = averageRateRes ? averageRateRes.value : 0;
            // add to array
            formattedVideos.push(video);
        }
        return formattedVideos;
    }

    async getVideosId(id) {
        const url = `${this.apiBase}/videos/${id}`;
        const response = await fetch(url, {
            method: 'GET',
        });
        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        return data;
    }

    async getVideosIdThumbnail(id) {
        const url = `${this.apiBase}/videos/${id}/thumbnail`;
        const response = await fetch(url, {
            method: 'GET',
        });
        return response.body;
    }

    async postVideosIdRate(id, value) {
        const url = `${this.apiBase}/videos/${id}/rate?value=${value}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: this.basicAuth,
        });
        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        return data;
    }

    async getVideosIdRate(id) {
        const url = `${this.apiBase}/videos/${id}/rate`;
        const response = await fetch(url, {
            method: 'GET',
            headers: this.basicAuth,
        });
        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        return data;
    }

    async getVideosIdRateAverage(id) {
        const url = `${this.apiBase}/videos/${id}/rate/average`;
        const response = await fetch(url, {
            method: 'GET',
        });
        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        return data;
    }

    async postVideosIdAnalysis(id) {
        const url = `${this.apiBase}/videos/${id}/analysis`;
        const response = await fetch(url, {
            method: 'POST',
            headers: this.basicAuth,
        });
        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        return data;
    }

    async getVideosIdAnalysisTotal(id) {
        const url = `${this.apiBase}/videos/${id}/analysis/total`;
        const response = await fetch(url, {
            method: 'GET',
        });
        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        return data;
    }
}
