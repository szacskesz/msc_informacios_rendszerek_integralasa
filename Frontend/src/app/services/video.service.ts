import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { cloneDeep } from 'lodash';

// Models
import { Video } from '@models/video';
import { VideoStatusEnum } from '@models/video';
import { Endpoint } from '@services/configuration.service';

// Services
import { ConfigurationService } from '@services/configuration.service';

@Injectable()
export class VideoService {
    private headers: HttpHeaders;

    constructor(
        protected http: HttpClient,
    ) {
        this.headers = new HttpHeaders();
        this.headers = this.headers.append('Content-Type', 'application/json; charset=utf-8');
    }

    public createVideo(videoObj: Video): Observable<Video> {
        const videoObjClone = cloneDeep(videoObj);
        const endpoint: Endpoint = this.getEndpointByName('create-video');
        const url: string = this.buildFullUrl([endpoint.url]);

        return this.http.post<Video>(url, videoObj, { headers: this.headers });
    }

    public updateVideo(videoObj: Video): Observable<Video> {
        const videoObjClone = cloneDeep(videoObj);
        const endpoint: Endpoint = this.getEndpointByName('update-video');
        const url: string = this.buildFullUrl([endpoint.url]);

        return this.http.post<void>(url, videoObj, { headers: this.headers }).pipe(
            map(() => {
                return videoObjClone;
            })
        );
    }

    public rentVideo(videoObj: Video): Observable<Video> {
        const videoObjClone = cloneDeep(videoObj);
        const endpoint: Endpoint = this.getEndpointByName('rent-video');
        const url: string = this.buildFullUrl([endpoint.url, videoObjClone.id]);

        return this.http.get<void>(url, { headers: this.headers }).pipe(
            map(() => {
                videoObjClone.status = VideoStatusEnum.RENTED;

                return videoObjClone;
            })
        );
    }

    public returnVideo(videoObj: Video): Observable<Video> {
        const videoObjClone = cloneDeep(videoObj);
        const endpoint: Endpoint = this.getEndpointByName('return-video');
        const url: string = this.buildFullUrl([endpoint.url, videoObjClone.id]);

        return this.http.get<void>(url, { headers: this.headers }).pipe(
            map(() => {
                videoObjClone.status = VideoStatusEnum.AVAILABLE;

                return videoObjClone;
            })
        );
    }

    public discardVideo(videoObj: Video): Observable<Video> {
        const videoObjClone = cloneDeep(videoObj);
        const endpoint: Endpoint = this.getEndpointByName('discard-video');
        const url: string = this.buildFullUrl([endpoint.url, videoObjClone.id]);

        return this.http.get<void>(url, { headers: this.headers }).pipe(
            map(() => {
                videoObjClone.status = VideoStatusEnum.DISCARDED;

                return videoObjClone;
            })
        );
    }

    public getVideoById(videoId: number): Observable<Video> {
        const endpoint: Endpoint = this.getEndpointByName('get-video');
        const url: string = this.buildFullUrl([endpoint.url, videoId]);

        return this.http.get<Video>(url, { headers: this.headers });
    }

    public getAllVideo(): Observable<Video[]> {
        const endpoint: Endpoint = this.getEndpointByName('get-all-video');
        const url: string = this.buildFullUrl([endpoint.url]);

        return this.http.get<Video[]>(url, { headers: this.headers });
    }

    public getAllAvailableVideo(): Observable<Video[]> {
        const endpoint: Endpoint = this.getEndpointByName('get-all-available-video');
        const url: string = this.buildFullUrl([endpoint.url]);

        return this.http.get<Video[]>(url, { headers: this.headers });
    }

    public getAllRentedVideo(): Observable<Video[]> {
        const endpoint: Endpoint = this.getEndpointByName('get-all-rented-video');
        const url: string = this.buildFullUrl([endpoint.url]);

        return this.http.get<Video[]>(url, { headers: this.headers });
    }

    public getAllDiscardedVideo(): Observable<Video[]> {
        const endpoint: Endpoint = this.getEndpointByName('get-all-discarded-video');
        const url: string = this.buildFullUrl([endpoint.url]);

        return this.http.get<Video[]>(url, { headers: this.headers });
    }

    private getEndpointByName(endpointName: string): Endpoint {
        for (const endpoint of ConfigurationService.CONFIG.endpoints) {
            if (endpoint.name === endpointName) {
                return endpoint;
            }
        }

        throw Error('Endpoint not found: ' + endpointName);
    }

    private buildFullUrl(urlList: any[]): string {
        let finalUrl = this.getEndpointByName('baseUrl').url;

        for (const url of urlList) {
            if (url != null && typeof url.toString === 'function' && url.toString() !== '') {
                finalUrl = Location.joinWithSlash(finalUrl, url.toString());
            }
        }

        return finalUrl;
    }
}
