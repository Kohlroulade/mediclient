import { Box, TextField, Button, responsiveFontSizes } from "@mui/material";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import 'dayjs/locale/de';
import React, { useEffect } from "react";
import { FC, PropsWithChildren } from "react";
import Fade from '@mui/material/Fade';

type Applikationsformen = "Oral" |  "Rektal" | "Intravenös";

const CreateItem: FC<PropsWithChildren> = (props) => {
    const [name, setName] = React.useState<string>();
    const [menge, setMenge] = React.useState<number>();
    const [applikation, setApplikation] = React.useState<Applikationsformen>("Oral");
    const [dosierung, setDosierung] = React.useState<string>()
    const [ablaufdatum, setAblaufdatum] = React.useState<Dayjs | null>();
    const [station, setStation] = React.useState<string>();
    const [preis, setPreis] = React.useState<number>();
    const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
    const [open, setOpen] = React.useState(false);
    const [statusText, setStatusText] = React.useState<string>();
    
    useEffect(() => {
      if(open) {
        const interval = setInterval(() => { setOpen(false);}, 2000);
        return () => clearInterval(interval);
      }
    });

    const submit = async(event: React.MouseEvent<HTMLElement>) => {
        const data = {
            method: 'POST',
            headers: { 
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin" : "*",
              "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
            },
            body: `{
                "name": "${name}",
                "menge": ${menge},
                "applikationsform": "${applikation}",
                "dosierung": "${dosierung}",
                "ablaufDatum": "${ablaufdatum?.toISOString()}",
                "station": "${station}",
                "preis": "${preis}"
            }`
        };

      setAnchor(anchor ? null : event.currentTarget);
      setOpen(true);
      var response = await fetch("http://localhost:5199/api/Medikamente", data);
      if(response.ok)
        setStatusText("Gespeichert");
      else
        setStatusText("Bitte überprüfen Sie Ihre Eingabe");
    }

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='de'>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{display: "flex", flexDirection: "row" }}>
            <TextField name="Name" label="Name" onChange={ e => setName(e.target.value) }/>
            <TextField name="Menge" label="Menge" type="number" onChange={ e => setMenge(Number(e.target.value)) }/>
          </Box>
          <Box sx={{display: "flex", flexDirection: "row"}}>
            <TextField name="Applikationsform" label="Applikationsform" onChange={ e => setApplikation(e.target.value as Applikationsformen) }/>
            <TextField name="Dosierung" label="Dosierung" onChange={ e => setDosierung(e.target.value) }/>
          </Box>
          <Box sx={{display: "flex", flexDirection: "row"}}>
            <DateField name="Ablaufdatum" label="Ablaufdatum" onChange={ e => setAblaufdatum(e) }/>
            <TextField name="Station" label="Station" onChange={e => setStation(e.target.value) }/>
          </Box>
          <Box>
            <TextField name="Preis" label="Preis" type="number" onChange={ e => setPreis(Number(e.target.value)) } />
          </Box>
        </Box>
        <Button variant='contained' onClick={submit}>OK</Button>
        <Fade in={open}><div>{ statusText }</div></Fade>
      </LocalizationProvider>
    )
}
export default CreateItem;