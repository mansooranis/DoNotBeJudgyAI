import React, {useState, useEffect} from 'react';
import axios from "axios";
import List from './list';
import CircularProgress from '@mui/material/CircularProgress';
export default function Intro(){
    const BACKEND_URL = "http://127.0.0.1:5000"
    const [showBoxes, setShowboxes] = useState(true);
    const [project, setProject] = useState(false);
    const [hackathon, setHackathon] = useState(false);
    const [message, setMessage] = useState("");
    const [showIntro, setShowIntro] = useState(true);
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [doFetch, setDoFetch] = useState(true);

    const handleChange = (event) => {
        // 👇 Get input value from "event"
        setMessage(event.target.value);
      };
    const submit = async () => {
        setShowIntro(false);
        setLoading(true);
        if (project){
            setResponse(await axios.post(`${BACKEND_URL}/project_info`, {"url": message}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }))
            setLoading(false);
        } else {
            try {
                const incResponse = await axios.post(`${BACKEND_URL}/get_all_projects`, {
                    "url": message
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                setResponse(incResponse);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
            
        }
    }
    return(
        <>
            {showIntro && <div className='h-screen w-screen flex flex-col justify-center items-center'>
                <div className=' text-5xl font-bold'>DoNotBeJudgyAI</div>
                <div className=' italic mt-2 '>Judging Projects Made Easy</div>
                {showBoxes && <div className=' flex flex-row justify-center items-center gap-x-12 mt-10'>
                    <div className='w-[200px] h-[200px] rounded-lg border hover:cursor-pointer  hover:bg-[#778DA9] flex flex-col justify-center items-center'
                        onClick={() => {
                            setShowboxes(false)
                            setHackathon(true)    
                        }}>
                        <div className=' font-semibold'>Judge a Hackathon</div>
                    </div>
                    <div className='w-[200px] h-[200px] rounded-lg border hover:cursor-pointer hover:bg-[#778DA9] flex flex-col justify-center items-center'
                        onClick={() => {
                            setShowboxes(false)
                            setProject(true)    
                        }}>
                        <div className=' font-semibold'>Judge a Project</div>
                    </div>
                </div>}
                {!showBoxes && <div className='w-[448px] h-[200px] border rounded-lg mt-10 flex flex-col justify-center items-center'>
                    {project && <>
                        <div>Enter a project link:</div>
                        <input className='w-[300px] h-[30px] border rounded-lg mt-2 text-zinc-950 pl-2 text-xs' onChange={handleChange}/>
                        <div className=' mt-3 border p-2 rounded-md text-sm hover:cursor-pointer hover:bg-[#778DA9]' onClick={() => submit()}>Judge!!!</div>
                    </>}
                    {hackathon && <>
                        <div>Enter a hackathon link:</div>
                        <input className='w-[300px] h-[30px] border rounded-lg mt-2 text-zinc-950 pl-2 text-xs' onChange={handleChange}/>
                        <div className=' mt-3 border p-2 rounded-md text-sm hover:cursor-pointer hover:bg-[#778DA9]' onClick={() => {
                            setDoFetch(false)
                            submit()
                            } }>Judge!!!</div>
                        </>}
                </div>}
            </div>}
            {loading && 
                <div className='h-screen w-screen flex flex-col justify-center items-center'>
                    <CircularProgress color="inherit" />
                </div>}
            {response && <List response={response} fetch={doFetch}/>}
        </>
        
    )
}