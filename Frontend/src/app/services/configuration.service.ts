import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ConfigurationService {

    public static CONFIG: Config;

    constructor(private http: HttpClient) {
    }

    public loadConfig(): Promise<void> {
        const configLocation = './assets/app.config.json';

        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('X-Skip-Interceptor', '');

        return this.http.get(configLocation, {
            headers
        })
        .toPromise()
        .then(
            response => {
                ConfigurationService.CONFIG = response as Config;
            }
        );
    }

}

export function initConfig(configurationService: ConfigurationService) {
    return () => configurationService.loadConfig();
}

export interface Endpoint {
    name: string;
    url: string;
}

export interface Config {
    itemsPerPage: number;
    endpoints: Endpoint[];
}
