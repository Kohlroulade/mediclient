import './App.css';
import { Tab } from '@mui/material';
import CreateItem from './components/CreateItem';
import SearchItem from './components/SearchItem';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import React, { SyntheticEvent } from 'react';
import DashBoard from './components/DashBoard';

function App() {
  const [value, setValue] = React.useState('1');
  const handleChange = (event: SyntheticEvent, newValue: string) => { setValue(newValue); }

  return (
    <TabContext value={value}>
      <TabList onChange={handleChange}>
        <Tab label="Medikament eingeben" value="1"></Tab>
        <Tab label="Medikament suchen" value="2"></Tab>
        <Tab label="Dashboard" value="4"></Tab>
      </TabList>
      <TabPanel value="1"><CreateItem /></TabPanel>
      <TabPanel value="2"><SearchItem /></TabPanel>
      <TabPanel value="4"><DashBoard /></TabPanel>
    </TabContext>
  );
}

export default App;
