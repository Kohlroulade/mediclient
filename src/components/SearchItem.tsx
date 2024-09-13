import { Box, Button, Checkbox, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FC, PropsWithChildren, useState } from "react";
import { MedikamentModel } from "../models/MedikamentModel";
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
      field: 'ablaufDatum',
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

const SearchItem : FC<PropsWithChildren> = (props) => {

    const [name, setName] = useState("");
    const [medikamente, setMedikamente] = useState<MedikamentModel[]>();
    const [showAbgelaufene, setShowAbgelaufene] = useState(false);

    const submit = async() => {
        let url = `http://localhost:5199/api/Medikamente/search?`;
        if(name)
          url += `name=${ name }&`
        if(showAbgelaufene)
          url += "showAbgelaufene=true";

        const response = await fetch(url);
        const json = await response.json();
        const m = json as MedikamentModel[];
        setMedikamente(m);
    }
    submit();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='de'>
            <Box>
                <TextField name="Name" label="Name" onChange={ e => setName(e.target.value) }/>
                <Button variant="contained" onClick={submit}>OK</Button>
                Abgelaufene anzeigen
                <Checkbox onChange={e => setShowAbgelaufene(!showAbgelaufene) } />
            </Box>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid rows={medikamente} columns={columns} 
                initialState={{sorting: { sortModel: [{
                  field: "ablaufDatum",
                  sort: "asc"
                }]}}}></DataGrid>
            </Box>
        </LocalizationProvider>
    )
}

export default SearchItem;