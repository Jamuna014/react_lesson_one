import { useEffect, useState } from "react";
import "./App.css";
import ResponsiveAppBar from "./header";
import RecipeReviewCard from "./card";
import { Button, Grid } from "@mui/material";
import { Add, Fastfood } from "@mui/icons-material";
import ModalForm from "./Form";
import { GET_FOOD_LIST } from "./services/API";
import {DateTime} from 'luxon';
import { API_SEVICES } from "./services/UtilAPI";
function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const foodData = () => {
   API_SEVICES.GetRequest(GET_FOOD_LIST,    
    (res:any)=>{
setData(res.data)
    },
    (err:any)=>{
console.log(err)
    }
    )
  };
  
  useEffect(() => {
    foodData();
  }, []);
  return (
    <>
      <ResponsiveAppBar />
      <Grid container padding={1}>
        <Grid item xs={6}>
          <Button
            endIcon={<Add />}
            color="primary"
            variant="contained"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Add Food
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        padding={5}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
         
          {
            data.length>0?
            data.map((item:any,i:number)=>{
return <Grid item xs={4} padding={2} >
<RecipeReviewCard image={item.image} icon={<Fastfood sx={{
            color:'green'
          }} />} description={item.description} created_at={DateTime.fromISO(item.created_at).toFormat("yyyy LLL dd")} />
</Grid>
            })
            :null
          }
     
      </Grid>
      <ModalForm
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          foodData()
        }}
      />
    </>
  );
}

export default App;
