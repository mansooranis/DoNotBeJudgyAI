export default function Viability({overall, remark, reason, score}) {
    return (
        <> 
            <div className="flex flex-col m-5">

                <div className=" font-bold text-xl">
                    Overall Score: {Math.round(overall * 100)/100}/5
                </div>
                <div className=" font-bold text-xl">
                    Overall Remark: {remark}
                </div>
                <div>
                    <div className="text-lg font-bold">
                        Reason:
                    </div>
                    <div className="text-lg">
                        {reason}
                    </div>
                </div>
                <div className="text-lg font-bold">
                    Score: {score}/5
                </div>
            </div>
        </>
    )
}