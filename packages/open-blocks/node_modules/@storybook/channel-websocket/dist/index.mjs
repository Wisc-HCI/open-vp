import { global } from '@storybook/global';
import { Channel } from '@storybook/channels';
import { logger } from '@storybook/client-logger';
import { stringify, isJSON, parse } from 'telejson';

var {WebSocket}=global,WebsocketTransport=class{constructor({url,onError}){this.buffer=[];this.isReady=!1;this.connect(url,onError);}setHandler(handler){this.handler=handler;}send(event){this.isReady?this.sendNow(event):this.sendLater(event);}sendLater(event){this.buffer.push(event);}sendNow(event){let data=stringify(event,{maxDepth:15,allowFunction:!0});this.socket.send(data);}flush(){let{buffer}=this;this.buffer=[],buffer.forEach(event=>this.send(event));}connect(url,onError){this.socket=new WebSocket(url),this.socket.onopen=()=>{this.isReady=!0,this.flush();},this.socket.onmessage=({data})=>{let event=typeof data=="string"&&isJSON(data)?parse(data):data;this.handler(event);},this.socket.onerror=e=>{onError&&onError(e);};}};function createChannel({url,async=!1,onError=err=>logger.warn(err)}){let channelUrl=url;if(!channelUrl){let protocol=window.location.protocol==="http:"?"ws":"wss",{hostname,port}=window.location;channelUrl=`${protocol}://${hostname}:${port}/storybook-server-channel`;}let transport=new WebsocketTransport({url:channelUrl,onError});return new Channel({transport,async})}var src_default=createChannel;

export { WebsocketTransport, createChannel, src_default as default };
