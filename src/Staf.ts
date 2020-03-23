import mongoose = require("mongoose");
import {IEpisodios, getEpisodios} from "./Episodios"
import {connectMongoDB} from "./helpers"

export interface IStaf extends mongoose.Document { 
    id:number;
    name: string;
    roll_type:string;
    password:string,
    Episodios: IEpisodios;
}

const StafSchema = new mongoose.Schema({
    name: { type: String, required: true},
    roll_type:{ type: String, required: true},
    password:{ type: String, required: true},
    Episodios: { type: mongoose.Schema.Types.ObjectId, ref: "Episodios" }
});


export const Staf = mongoose.model<IStaf>("Staf",StafSchema);

export const CreateStaf = async function(nameEpisodios:string,name: string,roll_type:string,password:string){
    await connectMongoDB;
    //Obtener el staf en funcion del nombre
    const Episodios:any = await getEpisodios(nameEpisodios);

    //persistencia 
    const S = new Staf();
    S.name = name;
    S.roll_type=roll_type;
    S.password=password;
    S.Episodios=Episodios._id;
    
    
     S.save((err:any)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log(S);
        }
    });
}