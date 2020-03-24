import mongoose = require("mongoose");
import {connectMongoDB} from "./helpers"

export interface IStaf extends mongoose.Document { 
    id:number;
    name: string;
    roll_type:string;
    password:string,
}

const StafSchema = new mongoose.Schema({
    name: { type: String, required: true},
    roll_type:{ type: String, required: true},
    password:{ type: String, required: true},
});

export const Staf = mongoose.model<IStaf>("Staf", StafSchema);

export const CreateStaf = async function(name: string,roll_type:string,password:string){
    await connectMongoDB;

    const newOne = new Staf();
    newOne.name = name;
    newOne.roll_type= roll_type;
    newOne.password=password;

    

    newOne.save( (err:any) =>{
        if(err){
            console.log(err.message);
        }else{
            console.log(newOne);
        }
    } );
}

export function getStaf(_name: string):Promise<any>{
    return new Promise<any>( resolve => {
        Staf.findOne({ name: _name}, (err:any,data:any) => {
            if(err){
                resolve({});
            }else{
                resolve(data);
            }
        } );
    });
}