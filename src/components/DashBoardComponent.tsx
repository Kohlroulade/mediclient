import { BarChart, BarSeriesType } from "@mui/x-charts";
import { MakeOptional } from "@mui/x-date-pickers/internals";
import { FC } from "react";

type DashBoardModel = {
    data: MakeOptional<BarSeriesType, "type">[]
}
const DashBoardComponent: FC<DashBoardModel> = (props) => {
    return (<>
        <BarChart 
            xAxis={[{ 
                scaleType: 'band', 
                data: [
                    'Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 
                    'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'
                ]
            }]}
            series={props.data}
            height={300} width={600}
            margin={ {top: 5, right: 5, bottom: 80, left: 100 } }
        />
    </>)
}

export default DashBoardComponent;