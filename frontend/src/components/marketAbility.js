import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import React, {useEffect, useState} from 'react';
import Relevance from './marketability/Relevance';
import CircularProgress from '@mui/material/CircularProgress';
import Revenue from './marketability/Revenue';
import CustomerBase from './marketability/CustomerBase';
import Viability from './marketability/Viability';
import Demand from './marketability/Demand';
import Scallability from './marketability/Scalability';

export default function MarketAbility({data}){
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    
      const TabSelector = () => {
            if (!data){
                return <CircularProgress/>
            }
            else {
                switch(value){
                    case 0:
                        return <Relevance overall = {data.score} remark={data.category} reason = {data.metrics.metrics[0].reason} score={data.metrics.metrics[0].score}/>
                    case 1:
                        return <Demand overall = {data.score} remark={data.category} reason = {data.metrics.metrics[1].reason} score={data.metrics.metrics[1].score}/>
                    case 2:
                        return <Revenue overall = {data.score} remark={data.category} reason = {data.metrics.metrics[2].reason} score={data.metrics.metrics[2].score}/>
                    case 3:
                        return <Scallability overall = {data.score} remark={data.category} reason = {data.metrics.metrics[3].reason} score={data.metrics.metrics[3].score}/>
                    case 4:
                        return <CustomerBase overall = {data.score} remark={data.category} reason = {data.metrics.metrics[4].reason} score={data.metrics.metrics[4].score}/>
                    case 5:
                        return <Viability overall = {data.score} remark={data.category} reason = {data.metrics.metrics[5].reason} score={data.metrics.metrics[5].score}/>
                }
            }
      }
    return(
        <div className='flex flex-row'>
            <Box sx={{ width:"200px", bgcolor: '#778DA9' }}>
                <Tabs value={value} onChange={handleChange} orientation='vertical' sx={{ borderRight: 1, borderColor: 'divider', color:"#E0E1DD" }}>
                    <Tab label="Market Relevance" />
                    <Tab label="Market Demand" />
                    <Tab label="Revenue Generation" />
                    <Tab label="Scalability" />
                    <Tab label="Customer Base" />
                    <Tab label="Long-Term Viability" />
                </Tabs>
            </Box>
            {TabSelector()}
        </div>
    )
}