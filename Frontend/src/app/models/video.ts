export class Video {
    id: number;
    serial: string;
    title: string;
    acquisitionDate: Date;
    status: VideoStatusEnum;
}

export enum VideoStatusEnum {
    'AVAILABLE' = 'AVAILABLE',
    'RENTED' = 'RENTED',
    'DISCARDED' = 'DISCARDED'
}
