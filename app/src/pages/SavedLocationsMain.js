import React, { useState } from 'react';
import OutlinedButtons from '../components/ui/EditButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import StarIcon from '@mui/icons-material/Star';



const StyledContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
    marginTop: '30px'
  });
  
const StyledFormContainer = styled('div')({
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
  });

const VerticalSpace = styled('div')({
    margin: '8px 0',
    marginLeft: '20px '
  });

const HorizontalSpace = styled('div')({
    margin: '8px 0',
    marginTop: '15px '
  });
  
const RightItem = styled('div')({
    textAlign: 'end',
    alignItems: 'end',
    width: '100%',
  });
  
const CenterItem = styled('div')({
    textAlign: 'center',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    display: 'flex',
  });

const MyStarIcon = () => {
    const starStyle = {
      color: '#FBF5BD',
      stroke: '#000000',
      fontSize: '28px'
    };

    return <StarIcon style={starStyle} />;
};


function SavedLocations() {
    
    const goHome = () => {
        window.location.href = '/home';
      };

    const [selectAction , setSelectAction] = useState(''); 

    const handleClick = (action) => {
      setSelectAction((prevAction) => (prevAction === action ? '' : action)); 
      };

    

    return (
        <>
        <StyledContainer>
        <StyledFormContainer>
  
        <ArrowBackIosIcon sx={{ mt:'15px', mb:'30px', ml:'17px' }} onClick={goHome}/>
  
        <VerticalSpace>
          <Typography variant="header3">
            Saved Locations</Typography>

          <p style={{ fontSize: '16px', marginTop: '30px', lineHeight: '24.2px', fontWeight: 600, color: '#000000', marginLeft: '10px', marginRight: '30px'}}>
            Save your frequently visited places to easily locate them when searching for your destination!</p>

          <Typography style={{fontSize: '22px', fontWeight: 700, color: '#00000', marginLeft: '10px', marginTop: '47px'}}>
            Current Saved Locations</Typography>

            <Divider orientation = 'horizontal' variant = 'middle' style={{ marginTop: '10px', color: '#606060'}} flexItem />            
        </VerticalSpace>


        <div>
            <VerticalSpace style={{marginLeft: '30px'}}>
                <OutlinedButtons
                handleClick1={() => handleClick('add')}
                handleClick2={() => handleClick('edit')}
                handleClick3={() => handleClick('delete')}
                >
                </OutlinedButtons>

                {selectAction && (
                                <Typography style={{ marginTop: '25px', color: '#F0A73A'}}>
                                    Please select a location to {selectAction}
                                </Typography>
                                )}                

            </VerticalSpace>
        </div>


        <div>
            <VerticalSpace ><HorizontalSpace>
            {selectAction === 'delete' ? ( <DeleteIcon /> ) : ( <MyStarIcon /> )}
            <span style={{ verticalAlign: 'super', marginLeft: '15px', fontSize: '18px'}}>Toa Payoh MRT</span>
            </HorizontalSpace></VerticalSpace>

            <VerticalSpace ><HorizontalSpace>
            {selectAction === 'delete' ? ( <DeleteIcon /> ) : ( <MyStarIcon /> )}     
            <span style={{ verticalAlign: 'super', marginLeft: '15px', fontSize: '18px'}}>Toa Payoh Public Library</span>
            </HorizontalSpace></VerticalSpace>
        </div>

        </StyledFormContainer>
        </StyledContainer>
        </>
        );

}

export default SavedLocations;