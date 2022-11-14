import axios from 'axios';
import React, {useState} from "react";

const Report = ({reportType, start, end}) => {
    const [loading, setLoading] = useState(false);
    var report = [];
    var reportString = 'http://127.0.0.1:8000/manager/'+reportType+'?start='+'"'+start+'"'+'&end='+'"'+end+'"';

    const getReport = async () => {
        setLoading(true);
        try {
        const {data} = await axios.get(reportString);

        console.log('data is: ', data);

        report = data;
        } catch (err) {
        console.log(err.message);
        } finally {
            setLoading(false);
        }
    };

    if(reportType == "salesreport"){
        console.log("asdfasd");
        return (<h1>Sales</h1>)
    }else if(reportType == "restockreport"){
        return (<h1>Restock</h1>)
    }else if(reportType == "excessreport"){
        return (<h1>Excess</h1>)
    }else if(reportType == "comboreport"){
        //mutexReport();
        // axios.get(reportString).then((res) => {
        // console.log(res.data);
        // });
        // console.log("request made");
        getReport();
        if(loading){
            return (<h1>Loading...</h1>)
        }
        return (<h1>Combo</h1>)
    }
}

export default Report;

