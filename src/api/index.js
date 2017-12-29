import fetch from 'node-fetch';
import {EventEmitter} from 'fbemitter';

const emitter = new EventEmitter();

export default {
    getData() {
        return fetch('http://old.relef.ru/v1/content/news/')
	       .then(res => {
               let result = res.json();
               emitter.emit('change', result);
               return result;
            })
           .catch(err => console.error(err));
    },
    addListener(eventType: string, fn: Function) {
        emitter.addListener(eventType, fn);
    }
}
