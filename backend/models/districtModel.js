import mongoose from "mongoose";
const districtSchema = mongoose.Schema(
    {
      
      state_code:{
        type:Number,
        required:true,
    },
      district_code:{
        type:Number,
        required:true,
    },
    district_name:{
        type:String,
        default:null,
    },
    district_name_local:{
        type:String,
        required:true,
    },

  },
    {
      timestamps: true,
    }
  );
  
  export const District = mongoose.model('District', districtSchema);
  