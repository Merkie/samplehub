import crypto from 'crypto-js';

const secret = process.env.SITE_SECRET || "#";

export const auth = (token: string) => {
    let result = crypto.AES.decrypt(token, secret).toString(crypto.enc.Utf8);
    var date = new Date(Number(result));
    if(date.toString() == "Invalid Date") {
       return false; 
    } else {
        if((Date.now()-Number(result)) < 200) {
            return true;
        }
    }
};