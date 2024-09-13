import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC, PropsWithChildren, useState } from "react";
import { MedikamentModel } from "../models/MedikamentModel";
import { Dayjs } from "dayjs";
import { Box, Button } from "@mui/material";
import { LocalizationProvider, DateField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";

const columns: GridColDef<(MedikamentModel[])[number]>[] = [
    {
      field: 'name',
      headerName: 'Medikament',
      width: 150,
    },
    {
      field: 'applikationsform',
      headerName: 'Applikationsform',
      width: 150,
    },
    {
      field: 'ablaufdatum',
      headerName: 'Ablaufdatum',
      type: 'string',
      valueGetter: (value) => moment(value).format("DD.MM.YYYY"),
      width: 110
    },
    {
      field: 'dosierung',
      headerName: 'Dosierung',
      width: 160
    },
    {
      field: 'station',
      headerName: 'Station',
      width: 160
    },
    {
      field: 'menge',
      headerName: 'Menge',
      width: 160
    }
  ];

const LaeuftAbSearch: FC<PropsWithChildren> = (props) => {
    const [medikamente, setMedikamente] = useState<MedikamentModel[]>();
    const [ablaufdatum, setAblaufdatum] = useState<Dayjs>();
    
    const submit = async() => {
        const response = await fetch(`http://localhost:5199/api/Medikamente/search/Ablaufdatum/before/${ablaufdatum}`);
        const json = await response.json();
        setMedikamente(json as MedikamentModel[]);
    }
    
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='de'>
            <Box>
                <DateField name="Ablaufdatum" label="Ablaufdatum" onChange={ e => setAblaufdatum(e!) }/>
                <Button variant="contained" onClick={submit}>OK</Button>
            </Box>

            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid rows={medikamente} columns={columns}></DataGrid>
            </Box>
        </LocalizationProvider>
    )
}
export default LaeuftAbSearch;