import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Rating} from '../model/rating';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private RATINGS_API = '/ratings';

  constructor(private http: HttpClient) {}

  saveRating(rating: Rating): Observable<Rating> {
    const url = `${environment.apiUrl}${this.RATINGS_API}`;

    return this.http.post<Rating>(url, rating);
  }

  getRatings(lastRatingId: number): Observable<Rating[]> {
    const url = `${environment.apiUrl}${this.RATINGS_API}/${lastRatingId}`;
    return this.http.get<Rating[]>(url);
  }
}
