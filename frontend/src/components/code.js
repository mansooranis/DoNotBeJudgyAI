import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { updateData } from "../feature/codeData/codeDataSlice";
export default function Code({data, loading}) {
    const BACKEND_URL = "http://127.0.0.1:5000"
    const codeResponse = useSelector(state => state.codeResponse);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [waiting, setWaiting] = useState(false);

    const handleChange = (event) => {
        setInputMessage(event.target.value);
    }

    const sendMessage = async (message) => {
        setWaiting(true);
        const response = await axios.post(BACKEND_URL+'/chat', { message }, {"headers": {"Content-Type": "application/json"}})
        setWaiting(false);
        setMessages([...messages, ["system", response.data]]);
    }
    
    return (
        <div>
            {!data && <div className='flex m-10 justify-center items-center'><CircularProgress/></div>}
            {data && 
            <div className="flex flex-row">
                <div className="flex flex-col w-1/2">
                    {/**Display data on screen format is similar to daaataaa*/}
                    <div className="text-2xl font-bold m-2">Overall Score: {Math.round(data.score * 100)/100}/5</div>
                    <div className="m-2 font-semibold text-xl">Parameters:</div>
                    <div className='flex flex-col'>
                        {data.metrics.metrics.map((metric, index) => {
                            return(
                                <div className='flex flex-col m-3'>
                                    <div className='font-semibold text-lg'>{metric.label}</div>
                                    <div className='text-md'>{metric.reason}</div>
                                    <div className='text-md'>Score: {metric.score}/5</div>
                                </div> 
                            )
                        })}

                    </div>
                </div>
                <div className="flex flex-col w-1/2 border m-5 rounded-md">
                    <div className="flex flex-1 flex-col">
                        {messages.map((message, index) => {
                            return(
                                <div className="flex flex-col m-2 items-start">
                                    <div className="font-semibold text-xs items-start">{message[0]}:</div>
                                    {message[0] === "user" ? <div className="font-semibold text-lg items-start ml-4 bg-[#778DA9] pl-3 pr-3 pt-1 pb-1 rounded-md">{message[1]}</div>:
                                    <div className= "font-semibold text-lg items-start ml-4 bg-[#2a3d53] pl-3 pr-3 pt-1 pb-1 rounded-md" >{message[1]}</div>}
                                </div>
                            )
                        })}
                        {waiting && <div className="loader w-10 h-10"></div>}
                    </div>
                    <div className="flex flex-row space-x-4  items-center"> 
                        <input className="border w-[500px] rounded-md m-2 p-2 relative bottom-0 text-black" placeholder="Enter your message" onChange={handleChange}/>
                        <button className="border rounded-md m-2 p-2" onClick={() => {
                            setMessages([...messages, ["user", inputMessage]]);
                            sendMessage(inputMessage);
                            setInputMessage("");
                        }}>Send</button>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}