import { Button, CircularProgress, Typography } from '@mui/material'
import { Box } from '@mui/system'
import SelectField from '../comp/SelectField'
import TextFieldComp from '../comp/TextFieldComp'
import useAxios from '../hooks/useAxios'
import { useNavigate } from 'react-router-dom'

const Settings = () => {


 const {response,error,loading} =useAxios({url:"/api_category.php"});
 const Navigate= useNavigate();
 
 if (loading){
     return(
         <Box mt={20} >
             <CircularProgress/>
         </Box>
     )
 }

 if (error) {
     return (
         <Typography variant='h6' mt={20} color='red' >
             Some Went Wrong
         </Typography>
     )
 }
 const difficultyOptions= [
     {id:"easy",name:"Easy"},
     {id:"medium",name:"Medium"},
     {id:"hard",name:"Hard"},

 ]

 const typeOptions= [
    {id:"multiple",name:"Multiple Choise"},
    {id:"boolean",name:"True/False"},

]


 const handleSubmit = (e) => {
   e.preventDefault();
   Navigate('/questions')
 }

  return (
    <form onSubmit={handleSubmit}>
        <SelectField options={response.trivia_categories} label="Category" />
        <SelectField options={difficultyOptions} label="Difficulty" />
        <SelectField options={typeOptions} label="Type" />
        <TextFieldComp />
        <Box mt={3} width="100%">
            <Button fullWidth variant='contained'  type='submit'>Get Started</Button>
        </Box> 


        
    </form>
  )
}

export default Settings