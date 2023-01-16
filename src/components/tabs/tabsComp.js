import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputComp from '../reuseablecomp/inputComp';
import ButtonComp from '../reuseablecomp/buttonComp';
import { useNavigate } from 'react-router-dom';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function TabsComp() {
    const navigate = useNavigate()

    React.useEffect(() => {
        if (localStorage.getItem("isLogin")) {
            navigate("/")
        }

    }, [])


    const [inputData, setinputData] = React.useState({ name: "", email: "", password: "" })
    const getInputData = (e) => {
        if (e.target.name == "name") {
            setinputData({ name: e.target.value, email: inputData.email, password: inputData.password })
        } else if (e.target.name == "email") {
            setinputData({ name: inputData.name, email: e.target.value, password: inputData.password })
        } else if (e.target.name == "password") {
            setinputData({ name: inputData.name, email: inputData.email, password: e.target.value })
        }
    }
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    ///////////////////// SIGN UP API CALL /////////////
    const signUp = (e) => {
        let data = {
            name: inputData.name,
            email: inputData.email,
            password: inputData.password,
            accountType: e.target.value,
            canEditPost: false
        }
        fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: { 'accept': "application/json", 'content-type': "application/json" },
            body: JSON.stringify(e.target.value == "creator" ? data : {
                name: inputData.name,
                email: inputData.email,
                password: inputData.password,
                accountType: e.target.value,
            })
        }).then((res) => {
            return res.json()
        }).then((data) => {
            alert(data.message)
        }).catch((err) => {
            console.log("error front end", err)
        })

    }


    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                    <Tab label="Viewer" {...a11yProps(0)} />
                    <Tab label="Creator" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>

                <InputComp filedName="name" inputType="text" onchangeFunc={getInputData} placeholder="Enter Full Name" />
                <InputComp filedName="email" inputType="email" onchangeFunc={getInputData} placeholder="Enter Email" />
                <InputComp filedName="password" inputType="password" onchangeFunc={getInputData} placeholder="Enter password" />
                <ButtonComp clickEvent={signUp} btnValue="Sign Up" name="viewer" />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <InputComp filedName="name" inputType="text" onchangeFunc={getInputData} placeholder="Enter Full Name" />
                <InputComp filedName="email" inputType="email" onchangeFunc={getInputData} placeholder="Enter Email" />
                <InputComp filedName="password" inputType="password" onchangeFunc={getInputData} placeholder="Enter password" />
                <ButtonComp clickEvent={signUp} btnValue="Sign Up" name="creator" />
            </TabPanel>

        </Box>
    );
}