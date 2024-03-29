import React, { useState, useRef, useEffect } from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AttachmentImg from '../assets/Attachment.png';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useLocation } from 'react-router-dom';

const StyledContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  minHeight: '100vh',
});

const StyledFormContainer = styled('div')({
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

const FrozenBar = styled('div')({
  width: '100%',
  height: '50px',
  position: 'fixed',
  top: 0,
  left: 0,
  backgroundColor: 'white',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'flex-end',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
});

const Validation = () => {
  const location = useLocation();
  const markerLocations = location.state;
  console.log(markerLocations)

  const [textFieldValue, setTextFieldValue] = useState('');
  const [droppedFiles, setDroppedFiles] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const inputRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    <StyledContainer style={{ padding: '30px' }}>

      <FrozenBar scrolled={scrolled}>
        <Link to="/home"> {/* link to /home with FeedbackModal open: handleOpenFeedbackModal */} <ArrowBackIosNewIcon sx={{ color: '#000000', paddingLeft: '30px', paddingBottom: '10px' }} /></Link>
        {scrolled && (
          <Typography
            variant="body1"
            sx={{
              paddingBottom: '10px',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              color: '#FF9900',
              fontSize: '20px',
              fontWeight: '600',
              whiteSpace: 'nowrap', // Prevent the text from wrapping to the next line
            }}
          >
            Issue Reporting Form
          </Typography>
        )}
      </FrozenBar>

      <StyledFormContainer style={{ paddingTop: '14px' }}>

        <VerticalSpace>
          <CenterItem>
            <LeftItem>
              <Typography sx={{ textAlign: 'start' }} variant="h1">UR-Active</Typography>
              <Typography sx={{ textAlign: 'start', marginBottom: '-15px' }} variant="h1" color="#000000">Issue Reporting Form</Typography>
            </LeftItem>
          </CenterItem>
        </VerticalSpace>

        <CenterItem>
          <VerticalSpace>
            <Typography sx={{ textAlign: 'start', marginBottom: '10px' }}>What issue(s) did you face with the selected point(s) on the route?</Typography>
            <TextField
              multiline
              rows={8}
              style={{ width: '100%', marginBottom: '10px' }}
              value={textFieldValue}
              onChange={handleTextFieldChange}
              InputProps={{
                  style: {
                  borderRadius: "10px",
                  borderColor: "black",
                  }
              }}
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
                  <img src={thumbnail.url} alt={`Thumbnail ${index}`} style={{ height: '70px', width: '70px', borderRadius: '10px', objectFit: 'cover' }} />
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
              <Button text="BACK" component={Link} to="/home" /* link to /home with InstructionsModal open: handleOpenInstructionsModal */ color="primary" height="40px" width="130px" startIcon={<ArrowBackIcon style={{ color: 'white' }} />} />
          </LeftItem>

          {textFieldValue && (
            <RightItem>
              <Button text="SUBMIT" component={Link} to="/home" /* link to /home with ThankYouModal open: handleOpenThankYouModal */ color="primary" height="40px" width="130px" icon={<ArrowForwardIcon style={{ color: 'white' }} />} />
            </RightItem>
          )}
        </CenterItem>

      </StyledFormContainer>

    </StyledContainer>
  );
};

export default Validation;
