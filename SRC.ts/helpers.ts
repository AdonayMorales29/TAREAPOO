import mongoose = require("mongoose");
import { resolve } from "dns";

const uri: string = "mongodb+srv://Admin:morales29@cluster0-3jqnl.azure.mongodb.net/Anime?retryWrites=true&w=majority";

export const connectMongoDB  = new Promise<any>(resolve => {
    mongoose.connect(uri,{ useNewUrlParser:true, useUnifiedTopology: true }, (err: any) => {
        if(err){
            console.log(err.message);
        }else{
            console.log("Conexion exitosa");
        }
        resolve();
    });
});