import { Device } from '@twilio/voice-sdk';

export class Twilio{
    token: string;
    device: Device | null;

    constructor(token:string){
        this.token = token;
        this.device = null;
        this.startDevice();
    }

    startDevice(){
        this.device = new Device(this.token);
    }

    public makeCall(toNumber:string){
        if(this.device){
            const params = { To: toNumber };
            this.device.connect({params});
        }else{
            console.log('Device not started');

        }
    }

    public hangUp(){
        if(this.device){
            this.device.disconnectAll();
        }
    }
}