const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 9000;
const app = express();

const start = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(port,console.log(`Connect to DB on port. Server at ${port}`));
    }catch(err){
        console.log(err);
    }
}
start();
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
let obj = {
    IP: "rtsp://admin:Admin1234@192.168.1.143:554/Streaming/Channels/101?transportmode=unicast&profile=Profile_1",
    lane_no: 14,
    uid: "ANPR01_front",
    request_code: "LANE14F",
    loc_name: "58 EXIT",    
    camera_type: "front",
    use_model: "abc_model",
    camera: "alpr",
    rtsp_feed_type: "ffmpeg",
    record: false,
    early_exit: true,
    post_url: "http://192.168.1.162:8000/apiv2/url1",
    alert_url: "http://192.168.1.162:8000/apiv2/url2",
    vehicle_track_frame: 15,
    vahan_with_plates_only: false,
    generate_csv: false,
    line_1: [0.0, 0.5, 1.0, 0.056],
    line_2: [0.0, 1.0, 1.0, 0.85],
    lane:[[0.0, 0.0, 0.0, 1.0], [1.0, 0.0, 1.0, 1.0]]
}
FetchData.create(obj).then(()=>{
    console.log('Data inserted')
}).catch((err)=>{
    console.log(err)
})
