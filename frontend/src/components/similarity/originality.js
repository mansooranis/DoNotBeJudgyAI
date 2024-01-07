const dataaaaa = {
    "category": "Adequate",
    "metrics": {
        "metrics": [
            {
                "label": "Novelty",
                "reason": "The project introduces novel approaches and techniques by combining digital signages, AI analysis, and communication to provide passengers with information and enable communication with specialists.",
                "score": 4
            },
            {
                "label": "Problem-Solving",
                "reason": "The project effectively addresses the problem of providing passengers with information and enabling communication with specialists by utilizing digital signages, AI analysis, and communication tools.",
                "score": 4
            },
            {
                "label": "Impact",
                "reason": "The project has the potential to cause moderate changes in the industry by improving the passenger experience and providing a more efficient way of obtaining information and communicating with specialists.",
                "score": 3
            }
        ]
    },
    "score": 3.6666666666666665,
    "tools": {
        "listoftools": [
            {
                "reason": "Similar: Both tools provide digital signages for communication and information dissemination. However, Smart Digital Signage may not have the AI analysis and FAQ generation features.",
                "toolname": "Smart Digital Signage"
            },
            {
                "reason": "Similar: Both tools enable communication between passengers and specialists. However, Zoom Video SDK may not have the digital signage and AI analysis features.",
                "toolname": "Zoom Video SDK"
            },
            {
                "reason": "Similar: Both tools provide authentication for user access. However, Firebase Auth may not have the digital signage, AI analysis, and communication features.",
                "toolname": "Firebase Auth"
            },
            {
                "reason": "Similar: Both tools are built using OCI's PaaS service. However, OCI's PaaS service may not have the digital signage, AI analysis, FAQ generation, and communication features.",
                "toolname": "OCI's PaaS service"
            },
            {
                "reason": "Similar: Both tools utilize OCI's AI service for text analysis. However, OCI's AI service for text analysis may not have the digital signage, FAQ generation, and communication features.",
                "toolname": "OCI's AI service for text analysis"
            },
            {
                "reason": "Similar: Both tools may utilize the ChatGPT API for automatic FAQ generation. However, ChatGPT API may not have the digital signage, AI analysis, and communication features.",
                "toolname": "ChatGPT API"
            },
            {
                "reason": "Similar: Both tools may explore Zoom's Contact Center SDK for communication features. However, Zoom's Contact Center SDK may not have the digital signage, AI analysis, and FAQ generation features.",
                "toolname": "Zoom's Contact Center SDK"
            }
        ]
    }
}






export default function Originality({data}){
    return(
        <div className='flex flex-col'>
            <div className="text-2xl font-bold m-2">Overall Label: {data.category}</div>
            <div className="text-2xl font-bold m-2">Overall Score: {Math.round(data.score * 100)/100}/5</div>
            <div className="m-2 font-semibold text-xl">Parameters:</div>
            {/* Add list from dataaaaa */}
            <div className='flex flex-col'>
                {data.metrics.metrics.map((metric, index) => {
                    return(
                        <div className='flex flex-col m-3'>
                            <div className='font-semibold'>{index+1}. {metric.label}</div>
                            <div>Reason: {metric.reason}</div>
                            <div>Score: {metric.score}/5</div>
                        </div>
                    )
                })}
            </div>
            <div className="m-2 font-semibold text-xl">Similar Projects:</div>
            {/*Add similarr tools from dataaaaa*/}
            <div className='flex flex-col'>
                {data.tools.listoftools.map((tool, index) => {
                    return(
                        <div className='flex flex-col m-3'>
                            <div className='font-semibold'>{index+1}. {tool.toolname}</div>
                            <div>Reason: {tool.reason}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}