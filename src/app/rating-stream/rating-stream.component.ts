import {Component, OnInit} from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {Rating} from '../model/rating';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-rating-stream',
  templateUrl: './rating-stream.component.html',
  styleUrls: ['./rating-stream.component.scss']
})
export class RatingStreamComponent implements OnInit {

  // todo - fix URL
  private serverUrl = 'http://localhost:8080/socket';
  private stompClient;

  ratings: Array<Rating> = [];

  constructor() {
  }

  ngOnInit() {
    this.initializeWebSocketConnection();
  }

  private initializeWebSocketConnection() {

    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, () => {
      that.stompClient.subscribe('/ratings', (message) => {
          if (message.body) {
            this.ratings.push(JSON.parse(message.body));
          }
        },
        () => {
          // todo, show unable to connect
           console.log('Unable to connect!');
        });
    },
      () => {
        // todo - show disconnected, reconnect
        console.log('Disconnected...');
      });
  }
}
