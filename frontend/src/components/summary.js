import CircularProgress from '@mui/material/CircularProgress';
export default function Summary({summary}){
    return(
        <>
            <div className="flex flex-col items-center justify-center">
                {summary && <div className="text-white text-md w-1/2 mt-4 mb-4">
                    {summary}
                </div>}
                {!summary &&  <div className='m-10'><CircularProgress/></div>}
            </div>
        </>
    )
}