import mongoose from "mongoose";
import cron from 'node-cron';
const Schema = mongoose.Schema;





const urlSchema = new Schema ({

originalUrl :{
    type:String,
    required:true
},
shortId :{
    type:String,
    required:true,
    unique:true,
},
 shortUrl: {
    type: String,
    required: true,  
  },
clicks:{
    type:Number,
     default: 0
},
isActive:
 { type: Boolean, 
    default: false
},
createdAt:{
    type:Date ,
    default: Date.now ,
},
 expiredAt:
  { type: Date,
    default: () => new Date(Date.now() +  1* 60 * 1000),
     },
dailyClicks: {
    type: Map,
    of: Number,
    default: {},
  },
  referrers: {
  type: Map,
  of: Number,
  default: new Map()
},

browsers: {
  type: Map,
  of: Number,
  default: {},
},
countries: { type: Map, of: Number, default: {} },

});

const UrlSchema = mongoose.model("urldata" ,urlSchema);

export default UrlSchema;