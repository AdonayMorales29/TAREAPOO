import mongoose = require("mongoose");
import {connectMongoDB} from "./helpers"

export interface IEpisodios extends mongoose.Document { 
    id:number;
    name: string;
    season:number;
    Duracion_Time:string;
    comentary:string;
    staf_Member:number;
}

const EpisodiosSchema = new mongoose.Schema({
    name: { type: String, required: true },
    season:{ type: Number, required: false },
    Duracion_Time:{ type: String, required: true },
    comentary:{ type: String, required: false},
    staf_Member:{ type: mongoose.Schema.Types.ObjectId, ref:"Staf" }
   
});

export const Episodios = mongoose.model<IEpisodios>("Episodios", EpisodiosSchema);

export const CreateEpisodios = async function(name: string, season: number, Duracion_Time: string, comentary:string, staf_Member:number){
    await connectMongoDB;

    const newOne = new Episodios();
    newOne.name = name;
    newOne.season = season;
    newOne.Duracion_Time = Duracion_Time;
    newOne.comentary=comentary;
    newOne.staf_Member=staf_Member;

    newOne.save( (err:any) =>{
        if(err){
            console.log(err.message);
        }else{
            console.log(newOne);
        }
    } );
}

export function getEpisodios(_name: string):Promise<any>{
    return new Promise<any>( resolve => {
        E.findOne({ name: _name}, (err:any,data:any) => {
            if(err){
                resolve({});
            }else{
                resolve(data);
            }
        } );
    });
}