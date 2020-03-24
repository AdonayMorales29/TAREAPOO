import mongoose = require("mongoose");
import {IStaf, getStaf} from "./Staf";
import {connectMongoDB} from "./helpers"

interface IEpisodios extends mongoose.Document { 
    id:number;
    name: string;
    season:number;
    Duracion_Time:string;
    comentary:string;
    staf:IStaf;
}
const EpisodiosSchema = new mongoose.Schema({
    name: { type: String, required: true },
    season:{ type: Number, required: false },
    Duracion_Time:{ type: String, required: true },
    comentary:{ type: String, required: false},
    staf:{ type: mongoose.Schema.Types.ObjectId, ref:"Staf" }
   
});


export const Episodios = mongoose.model<IEpisodios>("Episodios", EpisodiosSchema);

export const CreateEpisodios = async function( nameStaf:string,name: string, season: number, Duracion_Time: string, comentary:string,staf_Member:string){

    await connectMongoDB;
    //Obtener el staf en funcion del nombre
    const Staf:any = await getStaf(nameStaf);

    //persistencia 
    const S = new Episodios();
    S.name = name;
    S.season=season;
    S.Duracion_Time=Duracion_Time;
    S.comentary=comentary;
    S.staf=Staf;
    
    
     S.save((err:any)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log(S);
        }
    });
}