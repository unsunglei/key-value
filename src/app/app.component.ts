import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'webapp';

  public keyOptions = ['A', 'B', 'C', 'D'];

  public values:Array<KeyValue> = [
    new KeyValue('A', 'Yea well')
  ];

  public add(): void {
    if (this.getAvailableKeys().length === 0) {
      alert("No available keys!");
      return;
    }

    const nextOption = this.getAvailableKeys()[0];

    this.values.push(new KeyValue(nextOption, undefined));
    console.log(this.values);
  }

  public delete(value: KeyValue): void {
    this.values = this.values.filter(v => v !== value);
  }

  public getUsedKeys(): Array<string> {
    return this.values.map(v => v.key);
  }

  public getAvailableKeys(): Array<string> {
    const usedKeys = this.getUsedKeys();

    return this.keyOptions.filter(o => !usedKeys.includes(o));
  }

  public toObject(): Object {
    const map: Map<string, any> = new Map<string, any>();

    this.values.forEach(value => {
      map.set(value.key, value.value);
    });

    const obj = Object.fromEntries(map.entries());
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      obj[key] = value === undefined ? null : value;
    });

    return obj;
  }
}

export class KeyValue {
  key: string;
  value: any;

  constructor(key: string, value: any) {
    this.key = key;
    this.value = value;
  }
}
