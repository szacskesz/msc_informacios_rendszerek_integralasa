import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { merge } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { formatDate } from '@angular/common';
import { NotificationsService } from 'angular2-notifications';

// Helpers
import { APP_LOCALE_ID } from '@helpers/locale';

// Models
import { Video } from '@models/video';

// Services
import { VideoService } from '@services/video.service';


export class VideoListDataSource extends DataSource<Video> {

  paginator: MatPaginator;
  sort: MatSort;
  data: Video[] = [];
  dataChanged: EventEmitter<Video[]> = new EventEmitter();
  generalFilter: string = '';
  generalFilterChanged: EventEmitter<string> = new EventEmitter();
  statusFilter: string = '';
  setGeneralFilterChnaged: EventEmitter<string> = new EventEmitter();
  isLoading: boolean = true;

  constructor(
    private videoService: VideoService,
    private notificationsService: NotificationsService
  ) {
    super();
  }

  connect(): Observable<Video[]> {
    this.init();

    const dataMutations = [
      this.dataChanged,
      this.paginator.page,
      this.sort.sortChange,
      this.generalFilterChanged,
      this.setGeneralFilterChnaged
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData(this.getFilteredData([...this.data])));
    }));
  }

  private init() {
    this.videoService.getAllVideo().subscribe(
      (result: Video[]) => {
        this.data = result;
        this.isLoading = false;
        this.dataChanged.emit(result);
      },
      (error) => {
        console.error(error);
        this.data = [];
        this.isLoading = false;
        this.dataChanged.emit([]);

        const title = 'Error';
        const content = 'Could not fetch videos.';
        const options = {
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
          animate: 'rotate'
        };

        this.notificationsService.error(title, content, options);
      }
    );
  }

  disconnect() { }

  public setGeneralFilter(newFilter: string) {
    this.generalFilter = newFilter;
    this.generalFilterChanged.emit(newFilter);
  }

  public setStatusFilter(newFilter: string) {
    this.statusFilter = newFilter;
    this.setGeneralFilterChnaged.emit(newFilter);
  }

  private getFilteredData(data: Video[]) {
    return data
      .filter((v: Video) => {
        return v != null && (
          (
            v.id != null
            && v.id.toString().toLowerCase().includes(this.generalFilter.toLowerCase())
          ) || (
            v.serial != null
            && v.serial.toString().toLowerCase().includes(this.generalFilter.toLowerCase())
          ) || (
            v.title != null
            && v.title.toString().toLowerCase().includes(this.generalFilter.toLowerCase())
          ) || (
            v.status != null
            && v.status.toString().toLowerCase().includes(this.generalFilter.toLowerCase())
          ) || (
            v.acquisitionDate != null
            && formatDate(v.acquisitionDate, 'shortDate', APP_LOCALE_ID).toString().toLowerCase().includes(this.generalFilter.toLowerCase())
          )
        ) && (
            v.status != null
            && v.status.toString().toLowerCase().includes(this.statusFilter.toLowerCase())
          );
      });
  }

  private getPagedData(data: Video[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: Video[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'serial': return compare(a.serial, b.serial, isAsc);
        case 'title': return compare(a.title, b.title, isAsc);
        case 'acquisitionDate': return compare(a.acquisitionDate, b.acquisitionDate, isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: string | number | Date, b: string | number | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
