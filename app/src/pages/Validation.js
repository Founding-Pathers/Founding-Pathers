import React, { useState, useRef, useEffect } from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import Button from '../components/ui/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AttachmentImg from '../assets/Attachment.png';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const StyledContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  minHeight: '100vh',
  padding: '20px',
});

const StyledFormContainer = styled('div')({
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
});

const VerticalSpace = styled('div')({
  margin: '8px 0',
});

const LeftItem = styled('div')({
  textAlign: 'start',
  alignItems: 'end',
  width: '100%'
});

const RightItem = styled('div')({
  textAlign: 'end',
  alignItems: 'end',
  width: '100%'
});

const CenterItem = styled('div')({
  textAlign: 'center',
  alignItems: 'center',
  width: '100%',
  paddingTop: '25px',
  justifyContent: 'center',
  display: 'flex'
});

const Validation = () => {
  const [textFieldValue, setTextFieldValue] = useState('');
  const [droppedFiles, setDroppedFiles] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const inputRef = useRef(null);

  const handleTextFieldChange = (event) => {
    setTextFieldValue(event.target.value);
  };

  // Function to handle file drop
  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const newDroppedFiles = [...droppedFiles, ...files];
    setDroppedFiles(newDroppedFiles);

    // Generate thumbnails
    const newThumbnails = [...thumbnails];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newThumbnails.push({ url: e.target.result, selected: false });
        setThumbnails([...newThumbnails]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Function to trigger file input click
  const handleClick = () => {
      inputRef.current.click();
  };

  // Function to handle file selection
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    const newDroppedFiles = [...droppedFiles, ...files];
    setDroppedFiles(newDroppedFiles);

    // Generate thumbnails
    const newThumbnails = [...thumbnails];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newThumbnails.push({ url: e.target.result, selected: false });
        setThumbnails([...newThumbnails]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Function to handle thumbnail click
  const handleThumbnailClick = (index) => {
    const newThumbnails = thumbnails.map((thumbnail, i) => ({
      ...thumbnail,
      selected: i === index ? !thumbnail.selected : thumbnail.selected,
    }));
    setThumbnails(newThumbnails);
  };
  
  // Function to remove thumbnail
  const removeThumbnail = (index) => {
    const updatedThumbnails = thumbnails.filter((_, i) => i !== index);
    setThumbnails(updatedThumbnails);
  
    const updatedDroppedFiles = droppedFiles.filter((_, i) => i !== index);
    setDroppedFiles(updatedDroppedFiles);
  };

  useEffect(() => {
    // Prevent scrolling on mount
    document.body.style.overflow = 'hidden';

    // Add event listener to handle clicks outside of thumbnails
    const handleClickOutside = (event) => {
      if (!event.target.closest('.thumbnail-container')) {
        setThumbnails(thumbnails.map(thumbnail => ({ ...thumbnail, selected: false })));
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    // Re-enable scrolling and remove event listener on unmount
    return () => {
      document.body.style.overflow = 'auto';
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, [thumbnails]);

  return (
      <StyledContainer>
          <StyledFormContainer>

            <VerticalSpace>
              <CenterItem>
                <LeftItem>
                    <Typography sx={{ textAlign: 'start' }} variant="h1">UR-Active</Typography>
                </LeftItem>
                <Link to="/home">
                  <RightItem>
                      <Button text="Exit" color="endNavigation" width="60px" height="32px" fontSize="15px" textTransform="none" borderRadius="10px" />
                  </RightItem>
                </Link>
              </CenterItem>
              <Typography sx={{ textAlign: 'start' }} variant="h1" color="black">Validation Form</Typography>
            </VerticalSpace>

            <CenterItem>
                <VerticalSpace>
                    <Typography sx={{textAlign: 'start', marginBottom: '10px' }}>What problem(s) did you face with the selected path(s)?</Typography>
                    <TextField 
                      multiline
                      rows={8}
                      style={{ width: '100%', borderRadius: '20px', marginBottom: '10px' }}
                      value={textFieldValue}
                      onChange={handleTextFieldChange}
                    />
                </VerticalSpace>
            </CenterItem>

            <LeftItem>
              <div
                  onDrop={handleDrop}
                  onClick={handleClick}
                  style={{ display: 'flex', alignItems: 'center' }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={AttachmentImg} alt="Attachment" style={{ height: '14px', marginRight: '3px' }} />
                    <Typography variant="body1" style={{ marginLeft: '2px', fontWeight: '500', color: '#FF9900' }}>Upload supporting images</Typography>
                    <input type="file" ref={inputRef} style={{ display: 'none' }} onChange={handleFileSelect} />
                </div>
              </div>

              <div className="thumbnail-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(65px, 1fr))', gap: '10px', marginTop: '20px' }}>
                {thumbnails.map((thumbnail, index) => {
                  const handleClickRemove = (e) => {
                    e.stopPropagation(); // Prevent propagation to handleThumbnailClick
                    removeThumbnail(index);
                  };

                  return (
                    <div key={index} style={{ position: 'relative' }} onClick={() => handleThumbnailClick(index)}>
                      <img src={thumbnail.url} alt={`Thumbnail ${index}`} style={{ height: '70px', width: '70px', borderRadius: '10px', objectFit: 'cover'}} />
                      {thumbnail.selected && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '70px',
                            height: '70px',
                            background: 'rgba(0,0,0,0.5)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center', 
                            borderRadius: '10px'
                          }}
                        >
                          <IconButton aria-label="remove" style={{ color: 'white' }} onClick={handleClickRemove}>
                            <CloseIcon style={{ fontSize: '40px' }} />
                          </IconButton>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

          </LeftItem>

          <CenterItem>
            <LeftItem>
              <Button text="BACK" component={Link} to="/home" color="primary" height="40px" width="130px" startIcon={<ArrowBackIcon style={{ color: 'white' }} />} />
            </LeftItem>

            {textFieldValue && (
              <RightItem>
                <Button text="SUBMIT" component={Link} to="/home" color="primary" height="40px" width="130px" icon={<ArrowForwardIcon style={{ color: 'white' }} />} />
              </RightItem>
            )}
        </CenterItem>

        </StyledFormContainer>

      </StyledContainer>
  )
}

export default Validation;
