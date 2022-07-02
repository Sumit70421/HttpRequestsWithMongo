const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const port = process.env.PORT || 9000;
const app = express();
const connectDb = (url)=>{
    return mongoose.connect(url);
}
const start = async()=>{
    try{
        await connectDb(process.env.MONGO_URI);
        app.listen(port,console.log(`Connect to DB on port. Server at ${port}`));
    }catch(err){
        console.log(err);
    }
}
start();
app.use(express.json());
const Schema = mongoose.Schema;
const mongoSchma = new Schema(
    {
        IP: {
          type: String
        },
        lane_no: {
          type: Number
        },
        uid: {
          type: String
        },
        request_code: {
          type: String
        },
        loc_name: {
          type: String
        },
        camera_type: {
          type: String
        },
        use_model: {
          type: String
        },
        camera: {
          type: String
        },
        rtsp_feed_type: {
          type: String
        },
        record: {
          type: Boolean
        },
        early_exit: {
          type: Boolean
        },
        post_url: {
          type: String
        },
        alert_url: {
          type: String
        },
        vehicle_track_frame: {
          type: Number
        },
        vahan_with_plates_only: {
          type: Boolean
        },
        generate_csv: {
          type: Boolean
        },
        line_1: {
          type: [
            Number
          ]
        },
        line_2: {
          type: [
            Number
          ]
        },
        lane: {
          type: [
            Array
          ]
        }
      }
);

const FetchData = mongoose.model("Vehicledata",mongoSchma);  

app.get('/vehicledata',(req,res)=>{
    FetchData.find((err,resultdb)=>{
        if (err) console.log(err);
        else res.json(resultdb);
    })
})

app.post("/vehicledata", async (req,res)=>{
    const {_id} = req.body; 
    const check = await FetchData.findById(_id);
    if(!check){
        const {IP,lane_no,uid ,request_code,loc_name ,camera_type,use_model,camera ,early_exit ,post_url ,alert_url ,vehicle_track_frame,vahan_with_plates_only,generate_csv,line_1 ,line_2 ,lane} =  req.body;
        FetchData.create({IP,lane_no,uid ,request_code,loc_name ,camera_type,use_model,camera ,early_exit ,post_url ,alert_url ,vehicle_track_frame,vahan_with_plates_only,generate_csv,line_1 ,line_2 ,lane})
        .then(()=>{
            console.log('Created');
            res.status(200).send("OK");
        }).catch((err)=>{
            console.log(err);
        })
    }else{
        const {IP,lane_no,uid ,request_code,loc_name ,camera_type,use_model,camera ,early_exit ,post_url ,alert_url ,vehicle_track_frame,vahan_with_plates_only,generate_csv,line_1 ,line_2 ,lane} =  req.body;
        const updatedData = await FetchData.findByIdAndUpdate(_id,{IP,lane_no,uid ,request_code,loc_name ,camera_type,use_model,camera ,early_exit ,post_url ,alert_url ,vehicle_track_frame,vahan_with_plates_only,generate_csv,line_1 ,line_2 ,lane},{new:true});
        res.status(201).send('Updated');
    }

})
// let obj = {
//     IP: "rtsp://admin:Admin1234@192.168.1.143:554/Streaming/Channels/101?transportmode=unicast&profile=Profile_1",
//     lane_no: 14,
//     uid: "ANPR01_front",
//     request_code: "LANE14F",
//     loc_name: "58 EXIT",    
//     camera_type: "front",
//     use_model: "abc_model",
//     camera: "alpr",
//     rtsp_feed_type: "ffmpeg",
//     record: false,
//     early_exit: true,
//     post_url: "http://192.168.1.162:8000/apiv2/url1",
//     alert_url: "http://192.168.1.162:8000/apiv2/url2",
//     vehicle_track_frame: 15,
//     vahan_with_plates_only: false,
//     generate_csv: false,
//     line_1: [0.0, 0.5, 1.0, 0.056],
//     line_2: [0.0, 1.0, 1.0, 0.85],
//     lane:[[0.0, 0.0, 0.0, 1.0], [1.0, 0.0, 1.0, 1.0]]
// }
// FetchData.create(obj).then(()=>{
//     console.log('Data inserted')
// }).catch((err)=>{
//     console.log(err)
// })
