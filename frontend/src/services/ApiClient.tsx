const api_url = "http://127.0.0.1:8000"

class ApiClient {
    apiUrl: string

    constructor(apiUrl: string){
        this.apiUrl = apiUrl
    }

    async request(url: string, options: any) {
        return await fetch(`${this.apiUrl}${url}`, options);
    }

    get(url){
        return this.request(url, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON
            },
        })
    }

    post(url, data){
        return this.request(url, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON
            },
            body: JSON.stringify(data)
        })
    }
}

export const apiClient = new ApiClient(api_url);