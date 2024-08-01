import { Injectable } from '@angular/core';
import {response} from "express";
import {IOrder} from "../../interface/iorder";

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor() { }

  secureFetch(url: string, method?: string, data?: string) : Promise<any> {
    const authId = 'admin';
    const authPassword = 'password';
    const authToken = btoa(`${authId}:${authPassword}`);

    const retryAttempts = 5;
    const retryDelay = 1000;

    const makeRequest = (attempt: number): Promise<any> => {
      return fetch(url, {
        method: method || "GET",
        body: JSON.stringify(data),
        mode: 'cors',
        headers: {
          'Authorization': `Basic ${authToken}`
        }
      })
        .then(response => {
          if (!response.ok) {
            return Promise.reject(`Server-side error: ${response.status} - ${response.statusText}`);
          }
          return response;
        })
        .catch(error => {
          console.error(error);
          if (attempt <= retryAttempts) {
            return new Promise<any>((resolve) => setTimeout(() => resolve(makeRequest(attempt + 1)), retryDelay * attempt)
            );
          } else {
            return Promise.reject(error);
          }
        });
    };

    return makeRequest(1);
  }
}
