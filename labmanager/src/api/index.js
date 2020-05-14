
import axios from "axios";
axios.defaults.crossDomain = true;

class api {
    constructor(config, authService) {
        this.baseURL = config.baseAPIURL;
        this.authService = authService;
    }

    async getProfile() {
        return await this._callGET('profile');
    }

    async _callGET(url) {

        var accessToken = await this.authService.getToken(["api://1a093e4f-b2f0-4e51-bcbc-1d191a7c7452/LabRegistrations"]);
        var requestConfig = {
            headers: {'Authorization' : `Bearer ${accessToken.accessToken}`}
        }
        try {
            return await axios.get(`${this.baseURL}${url}`, requestConfig);

        } catch (error) {
            console.error(error);
        }
        
    }
}

export default api;