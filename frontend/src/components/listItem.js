import React, {useEffect, useState} from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Summary from './summary';
import MarketAbility from './marketAbility';
import Originality from './similarity/originality';
import Code from './code';
export default function ListItem({index, project_image, project_title, project_link, project_repo_link, fetch}){
    const BACKEND_URL = "http://127.0.0.1:5000"
    const [expanded, setExpanded] = useState(false);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingCode, setLoadingCode] = useState(false);
    const [similarityResponse, setSimilarityResponse] = useState(null);
    const [value, setValue] = React.useState(0);
    const [businessResposne, setBusinessResponse] = useState(null);
    const [codeResponse, setCodeResponse] = useState(null);
    const [codeData, setCodeData] = useState(null);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    const TabSelector = () => {
        switch(value){
            case 0:
                return <Summary summary={summary}/>
            case 1:
                return <MarketAbility data = {businessResposne}/>
            case 2:
                return <Originality data = {similarityResponse}/>
            case 3:
                return <Code data={codeData} loading={loadingCode} summary = {summary} github_url = {project_repo_link}/>
        }
    }
    
    useEffect(() => {
        if (fetch){
            const getSummary = async () => {
                const response = await axios.post(BACKEND_URL+'/ai/summary', {"url": project_link}, {"headers": {"Content-Type": "application/json"}});
                setSummary(response.data.summary);
            }
            getSummary();
        }
    }, [])

    useEffect(() => {
        const getAiBusiness = async () => {
            const response = await axios.post(BACKEND_URL+'/ai/business/score', {"summary": summary}, {"headers": {"Content-Type": "application/json"}})
            setBusinessResponse(response.data);
        }
        getAiBusiness();
        const getAiSimilarity = async () => {
            const response = await axios.post(BACKEND_URL+'/ai/originality/score', {"summary": summary}, {"headers": {"Content-Type": "application/json"}})
            setSimilarityResponse(response.data);
        }
        getAiSimilarity();
    }, [summary])

    const getData = async() => {
        setLoadingCode(true);
        const response = await axios.post(BACKEND_URL+'/ai/code/score', { summary, "github_url":project_repo_link }, {"headers": {"Content-Type": "application/json"}})
        setLoading(false);
        setCodeData(response.data);
    }
    return(
        <div className='flex flex-col border rounded-lg mt-10 ml-4 mr-4 mb-4'>
            <div className=' m-2 flex flex-row ml-10 mr-10 items-center justify-start'>
                <div className='mr-4 ml-4 font-semibold text-md'>{index+1}</div>
                {project_image && <img src={project_image} className='h-[50px] rounded-lg object-contain'/>}
                <div className='ml-4 font-medium'>{project_title}</div>
                <div className="hover:cursor-pointer pl-3 pr-3 border hover:bg-slate-800 ml-24 mb-4 mt-4 mr-4 rounded-sm" onClick={() => { getData()}}>
                            Generate Code Score
                </div>
                <div className=" border m-3 pl-3 pr-3 hover:bg-slate-800 hover:cursor-pointer justify-self-end" onClick={() => setExpanded(!expanded)}>{!expanded? "expand" : "collapse"}</div>
            </div>
            {expanded && <div className=''>
                   <Box sx={{ width: '100%', bgcolor: '#415A77' }}>
                    <Tabs value={value} onChange={handleChange} centered>
                            <Tab label="Summary" />
                            <Tab label= "Marketability" />
                            <Tab label="Originality" />
                            <Tab label="Code"/>
                        </Tabs>
                        
                    </Box> 
                    {TabSelector()}
            </div>}
        </div>
    )
}