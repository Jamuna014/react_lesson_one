import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { CREATE_FOOD, UPLOAD_IMAGE } from "../services/API";
import { useState } from "react";
import { toast } from 'react-toastify';

type modalForm={
    open:boolean;
    onClose:any;
    
}
export default function ModalForm(props:modalForm){
    const [Image,setImage]=useState<any>()
        const {open,onClose}=props;
        const style = {
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          };

const foodcreateSchema=Yup.object().shape({
    title:Yup.string().required("Please enter a title"),
    description:Yup.string().required("Please enter a description")
})
const initialValues={
    title:"",
    description:"",
    image:''
}

const formik=useFormik({
    initialValues:initialValues,
    validationSchema:foodcreateSchema,
    onSubmit:async(values)=>{
        
const createFood=(imageUrl:any)=>{
    console.log(imageUrl,'i')
    let payload={
        title:formik.values.title,
description:formik.values.description,
image:imageUrl
    }
axios.post(CREATE_FOOD,payload
).then((res:any)=>{
    console.log(res.data);
    // createFood(res.data.secure_url)
    toast(
        'Registered Successfully',{

            type:"success",
            autoClose:3000,
            hideProgressBar:true
        }
    )
    onClose()
    }).catch((err:any)=>{
        console.log(err);
     
    })
}
const formData=new FormData()
// const imageData=JSON.stringify(Image)
// const blob=new Blob([imageData],{type:'application/json'})

 formData.append('image',Image)

axios.post(UPLOAD_IMAGE,
 formData,{
    headers:{
        'Content-Type':'multipart/form-data'
    }
 }
).then((res:any)=>{
console.log(res.data);
createFood(res.data.secure_url)

}).catch((err:any)=>{
    console.log(err);
    toast(
        'Failed to register',
        {
            type:"error",
            hideProgressBar:true,
            autoClose:3000
        }
    )
    
})
    }
})
return(
    <>
<Modal
  open={open}
  onClose={onClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
<Box sx={style}

>
<Typography variant="h5" fontWeight={'bold'} style={
    {
        color:'crimson',
        justifyContent:'center',
        display:'flex',
    }
} gutterBottom>
        Food register
      </Typography>
<Grid  container padding={8} spacing={2}  direction='row' alignItems='center' justifyContent='center'>
<Grid item xs={6}>

<TextField id="outlined-basic"
 label="Food title" 
 name="title"  
 value={formik.values.title}
 onBlur={formik.handleBlur}
 variant="outlined"
 onChange={formik.handleChange} 
 error={formik.touched.title && formik.errors.title  ?true:false}
 helperText={formik.errors.title}
 />

 {/* {formik.touched.title && formik.errors.title ? (
        <div style={{
            color:"red"
        }}>{formik.errors.title}</div>
      ) : null} */}
</Grid>
<Grid item xs={6}>

<TextField id="outlined-basic"
 label="Description"
 name="description"
 value={formik.values.description}
 onBlur={formik.handleBlur} 
 variant="outlined"
 onChange={formik.handleChange} 
 error={formik.touched.description && formik.errors.description  ?true:false}
 helperText={formik.errors.description}
 
 />
 
 {/* {formik.touched.description && formik.errors.description ? (
        <div style={{
            color:"red"
        }}>{formik.errors.description}</div>
      ) : null} */}
</Grid>
<Grid item xs={12}>

<TextField fullWidth 
name="image"

error={formik.touched.image && formik.errors.image  ?true:false}
helperText={formik.errors.image}
onChange={(e:any)=>{
   setImage(e.target.files[0]);
}} 


type="file" />
</Grid>


<Box sx={{
    marginTop:2
}} >

<Button 
variant="contained" color="success" 
onClick={()=>formik.handleSubmit()}
>Submit</Button>
</Box>





</Grid>
        </Box>
        
</Modal>

</>
)}