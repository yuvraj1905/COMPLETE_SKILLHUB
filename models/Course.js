import mongoose from "mongoose";

const schema = mongoose.Schema({
// Title type, required, minLength, maxLength
title:{
    type:String,
    required:[true,"Please Enter Title"],
    minLength:[4,"Title must be atleast 4 chars.."],
    maxLength:[80,"Title should be less than 80 chars.."]
},
// Description type, required, minLength
description:{
    type:String,
    required:[true,"Please Enter Description"],
    minLength:[20,"Description must be atleast 20 chars.."],
},
// Lectures title,description,videos { public_id,url }
lectures:[
    {
        title:{
            type:String,
            required:[true,"Please Enter Title"],
        },
        description:{
            type:String,
            required:[true,"Please Enter Description"],
        },
        video:{
            public_id:{
                 type:String,
                 required:true
             },
             url:{
                type:String,
                required:true
            },
        },
    }
],
// Poster public_id, url
poster:{
    public_id:{
         type:String,
         required:true
     },
     url:{
        type:String,
        required:true
    },
},
// Views type, default
views:{
    type:Number,
    default:0
},
// NumOfVideos type, default
numOfVideos:{
    type:Number,
    default:0
},
// Category type, required
category:{
    type:String,
    required:true
},
// CreatedBy type, required
createdBy:{
    type:String,
    required:[true,"Enter Creator Name"]
},
// CreatedAt type, default
createdAt:{
    type:Date,
    default:Date.now
}
});

export const Course = mongoose.model("Course",schema);