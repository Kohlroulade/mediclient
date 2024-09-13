import Checkbox from '@mui/material/Checkbox';
import { FC, PropsWithChildren, useState } from "react";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import DashBoardComponent from "./DashBoardComponent";


const getData = async (stack: boolean, year: number) => {
    const response = await fetch(`http://localhost:5199/api/Medikamente/series/${year}`);
    
    const json = await response.json() as { month: number, name: string, cost: number }[]
    const result: { label: string; data: number[], stack: string | undefined }[] = [];
    json.forEach(element => {
        const month = element.month - 1;
        let e = result.find(x => x.label === element.name);
        if(e === undefined) {
            e = { 
                label: element.name, 
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                stack: stack ? "Stack" : undefined
            };
            result.push(e);
        }
        e.data[month] = element.cost;
    }); 
    
    return { result };
}

const DashBoard: FC<PropsWithChildren> = () => {

    const [stack, setStack] = useState(false);
    const [year, setYear] = useState<number>(2024);    
    const [data, setData] = useState<{ label: string, data: any[] }[]>();
    const [loaded, setLoaded] = useState(false);

    const fetchData = async() => {
        if(!loaded)
        {
            const json = await getData(stack, year);
            setData(json.result);
            setLoaded(true);
        }
    };

    fetchData();

    return (<>
        { data? 
            (<>
                <DashBoardComponent data={data}/>
                Balken stapeln<Checkbox onChange={(_event, checked) => {
                    setLoaded(false);
                    setStack(checked);}
                } />
                <RadioGroup
                    defaultValue="2024"
                    name="radio-buttons-group"
                    onChange={event => {
                        setLoaded(false);
                        setYear(Number(event.target.value)); 
                    }}
                >
                    <FormControlLabel value="2020" control={<Radio />} label="2020" />
                    <FormControlLabel value="2021" control={<Radio />} label="2021" />
                    <FormControlLabel value="2022" control={<Radio />} label="2022" />
                    <FormControlLabel value="2023" control={<Radio />} label="2023" />
                    <FormControlLabel value="2024" control={<Radio />} label="2024" />
                    <FormControlLabel value="2025" control={<Radio />} label="2025" />
                    <FormControlLabel value="2026" control={<Radio />} label="2026" />
                    <FormControlLabel value="2027" control={<Radio />} label="2027" />
                </RadioGroup>
            </>) : 
            (<>Lade Daten...</>) }        
    </>)
}

export default DashBoard;