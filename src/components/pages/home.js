import React, { useState, useEffect } from 'react'
import { Grid, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import ButtonComp from '../reuseablecomp/buttonComp'
import InputComp from '../reuseablecomp/inputComp'

const Home = () => {
    const [localStore, setlocalStore] = useState("")
    const [open, setOpen] = React.useState(false);
    const [formData, setformData] = React.useState({ title: "", description: "", file: "" })
    useEffect(() => {
        setlocalStore(JSON.parse(localStorage.getItem("user")))
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };


    ///////////////// POST CREATE ///////////////////
    const postCreate = (e) => {
        // console.log(e)
        e.preventDefault()
        const formDataSet = new FormData();
        formDataSet.append('title', formData.title);
        formDataSet.append('description', formData.description);
        formDataSet.append('id', localStore._id);
        formDataSet.append('file', formData.file);
        fetch("http://localhost:5000/addPost", {
            method: "POST",
            body: formDataSet
        })
            .then((data) => {
                return data.json()
            }).then((res) => {
                alert(res.message)
            })
            .catch((err) => { alert(err.message) })
    }

    const handleClose = () => {
        setOpen(false);
    };
    const btnClick = (e) => {
        if (e.target.value == "create") {
            handleClickOpen()
        } else if (e.target.value == "update") {
            console.log("update")
        } else if (e.target.value == "delete") {

            console.log("delete")
        }
    }

    ////////////////////// FIELDS VALUES//////////////
    const fieldValue = (e) => {
        if (e.target.name == "title") {
            setformData({ title: e.target.value, description: formData.description, file: formData.file })
        } else if (e.target.name == "description") {
            setformData({ title: formData.title, description: e.target.value, file: formData.file })
        } else if (e.target.name == "file") {
            setformData({ title: formData.title, description: formData.description, file: e.target.files[0] })

        }
    }

    console.log(formData)



    return (
        <>
            {localStore && localStore.accountType !== "viewer" ? "" :
                <>
                    <Grid >
                        <Typography variant="h3" textAlign="center" gutterBottom>
                            CREATOR SCREEN
                        </Typography>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <div>
                                <ButtonComp btnValue="CREATE POST" name="create" clickEvent={btnClick} />

                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        Create A Post
                                    </DialogTitle>
                                    <form onSubmit={postCreate} encType='multipart/form-data'>

                                        <DialogContent>
                                            <InputComp inputType="text" placeholder="Enter Title here" filedName="title" onchangeFunc={fieldValue} />
                                        </DialogContent>
                                        <DialogContent>
                                            <InputComp inputType="text" placeholder="Enter Title here" filedName="description" onchangeFunc={fieldValue} />
                                        </DialogContent>
                                        <DialogContent>
                                            <InputComp inputType="file" placeholder="Enter Title here" filedName="file" onchangeFunc={fieldValue} />
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose}>Close</Button>
                                            <Button type='submit' autoFocus>
                                                Create post
                                            </Button>
                                        </DialogActions>
                                    </form>
                                </Dialog>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <ButtonComp btnValue="UPDATE POST" name="update" clickEvent={btnClick} />
                        </Grid>
                        <Grid item xs={4}>
                            <ButtonComp btnValue="DELETE POST" name="delete" clickEvent={btnClick} />
                        </Grid>

                    </Grid>
                </>}
        </>
    )
}

export default Home