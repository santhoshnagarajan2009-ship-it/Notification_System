abstract class Notifications{
    protected message:string;
    private sent:boolean=false;
    constructor(message:string){
        this.message=message;
    }

    public send(){
        this.sent=true;
    }

    protected isSent():boolean{
        return this.sent;
    }

    abstract getChannel():string;
}


//Email
class EmailNotification extends Notifications{
    private email:string;
    constructor(message:string,email:string){
        super(message);
        this.email=email;
    }

    public schedule(newMessage:string,isAdmin:boolean){
        if(!this.isSent() && isAdmin){
            this.message=newMessage;
        }
        else{
            throw new Error("Cannot schedule mail beacuse Already sent or not an admin");
        }
    }

    getChannel(): string {
        return "Email";
    }
}

class SMSNotifications extends Notifications{
    private readonly phone:number;
    constructor(message:string,phone:number){
        super(message);
        this.phone=phone;
    }


    public editmessage(newMessage:string,isAdmin:boolean){
        if(!this.isSent() && isAdmin){
            this.message=newMessage;
        }else{
            throw new Error("Cannot edit  message sorry!");
        }
    }

    getChannel(): string {
        return "SMS";
    }

}


class PushNotification extends Notifications{
    protected deviceID:string;
    constructor(message:string,deviceID:string){
        super(message);
        this.deviceID=deviceID;
    }

    public resend(isAdmin:boolean){
        if(this.isSent() && isAdmin){
            this.send();
        }else{
            throw new Error("Cannot resend , not an Admin");
        }
    }

    getChannel(): string {
        return "PUSH";
    }
}

const email = new EmailNotification("Hello", "test@gmail.com");
email.schedule("Updated message", true);
console.log(email.getChannel());
const sms = new SMSNotifications("Hi", 9876543210);
sms.editmessage("New SMS", true);
console.log(sms.getChannel());

const push = new PushNotification("Hey", "device123");
push.send();
push.resend(true);
console.log(push.getChannel());
