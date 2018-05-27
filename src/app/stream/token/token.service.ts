import { Injectable, Component, OnInit } from '@angular/core';
import { NgForage, NgForageCache, NgForageConfig, CachedItem } from 'ngforage';

@Injectable()
export class TokenService implements OnInit {

  constructor(private readonly ngf: NgForage, private readonly cache: NgForageCache) {}

  public getItem<T = any>(key: string): any {
    return this.ngf.getItem<T>(key);
  }
  
  public async getToken<T = any>(url: string, room: string): Promise<T> {
    var object = await this.ngf.getItem<T>("rooms");

    //return item == null ? null : item[url][room];
    return ( (object && object[url] && object[url][room]) || undefined );
  }

  public async setToken<T = any>(url: string, room: string, token: string): Promise<Object> {
    let object = await this.ngf.getItem("rooms");
    object = object || { };
    object[url] = object[url] ||  { };
    object[url][room] = token;
    
    object[url][room] = token;

    return this.ngf.setItem("rooms", object);
  }
  
  public ngOnInit() {
    this.ngf.name = 'TokenStore';
    this.cache.driver = NgForageConfig.DRIVER_INDEXEDDB;
    
  }
}