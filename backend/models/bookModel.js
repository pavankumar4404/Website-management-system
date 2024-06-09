import mongoose from 'mongoose';

const bookSchema = mongoose.Schema(
  {
    //website details
    name:{
      type:String,
      required:true,
  },
    url:{
      type:String,
      required:true,
  },
  description:{
      type:String,
      default:null,
  },
  department:{
      type:String,
      required:true,
  },
  websiteType:{
      type:String,
      default:null,
  },


  //technical details
  frontend:{
      type:String,
      required:true,
  },
  backend:{
      type:String,
      required:true,
  },
  database:{
      type:String,
      default:null,
  },
  webServer: {
      type: String, 
      default: null,
  },


  //server details
  serverType:{
      type:String,
      required:true,
  },
   serverOs: {
      type: String, 
      default:null,
  },
  serverVersion:{
      type:String,
      required:true,
  },
  ipv4Local:{
    type:String,
    required:true,
},
 ipv4Public: {
    type: String, 
    default:null,
},
ipv6Local:{
    type:String,
    default:null,
},
ipv6Public:{
    type:String,
    default:null,
},
 location: {
    type: String, 
    required:true,
},
serverState:{
    type:String,
    default:null,
},
serverDistrict:{
    type:String,
    default:null,
},



//Team and Role Details
teamMember:{
    type:String,
    default:null,
},
role:{
    type:String,
    default:null,
},
personalEmail:{
    type:String,
    default:null,
},
desigEmail:{
    type:String,
    default:null,
},



//Security Details
sslCertificate:{
    type:String,
    default:null,
},
sslValidDate:{
    type:Date,
    default:null,
},
sslIssuer:{
    type:Buffer,
    default:null,
},
securityAudit:{
    type:String,
    default:null,
},
auditValidDate:{
    type:Date,
    default:null,
},
auditVendor:{
    type:Buffer,
    default:null,
},



//PAC details
pacApproved:{
    type:String,
    default:null,
},
pacType:{
    type:String,
    default:null,
},
pacNo:{
    type:String,
    default:null,
},
pacDate:{
    type:Date,
    default:null,
},
pacDocument:{
    type:Buffer,
    default:null,
},
},
  {
    timestamps: true,
  }
);

export const Book = mongoose.model('Book', bookSchema);
