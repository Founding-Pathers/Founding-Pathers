import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const StyledContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
  padding: '30px'
});

const StyledFormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '64px',
});

const VerticalSpace = styled('div')({
  margin: '8px 0',
});

const LeftItem = styled('div')({
  textAlign: 'start',
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
  height: '100px',
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

const PrivacyPolicy = () => {
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

  return (
    <StyledContainer>

    <FrozenBar scrolled={scrolled}>
      <Link to="/home"><ArrowBackIosNewIcon sx={{ color: '#000000', paddingLeft: '30px', paddingBottom: '10px' }} /></Link>
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
            whiteSpace: 'nowrap',
          }}
        >
          Privacy Policy
        </Typography>
      )}
    </FrozenBar>

      <StyledFormContainer>
          
          <VerticalSpace>
            <CenterItem>
              <LeftItem>
                <Typography sx={{ textAlign: 'start' }} variant="h1">UR-Active</Typography>
                <Typography sx={{ textAlign: 'start', marginBottom: '-15px' }} variant="h1" color="#000000">Privacy Policy</Typography>
              </LeftItem>
            </CenterItem>
          </VerticalSpace>

          <CenterItem>
            <VerticalSpace>
            <Typography sx={{ textAlign: 'start', marginBottom: '10px' }}>
              Founding Pathers (the “Company”) will handle, in accordance with the following policy, the personal information including the private information obtained from our users when they use UR-Active (the “Service”).
            </Typography>

          <List sx={{ listStyle: "decimal", paddingLeft: '20px' }}>

            <ListItem sx={{ display: "list-item", flexDirection: "column", paddingBottom: 0 }}>
              <ListItemText primary="Information We Collect" sx={{ marginBottom: 0 }} />
              <List sx={{ listStyle: "lower-alpha", paddingLeft: '20px', paddingTop: 0 }}>

                <ListItem sx={{ display: "list-item", paddingTop: 0, paddingBottom: 0 }}>
                  <ListItemText primary="Information Provided by Users"/>
                  <List sx={{ listStyle: "lower-roman", paddingLeft: '20px', paddingTop: 0 }}>
                    <ListItem sx={{ display: "list-item", paddingTop: 0, paddingBottom: 0 }}>
                      <ListItemText primary="Email Address: When users create an account, they are required to provide their email address for account creation and communication purposes."/>
                    </ListItem>
                    <ListItem sx={{ display: "list-item", paddingTop: 0, paddingBottom: 0 }}>
                      <ListItemText primary="Password: Users will also create a password for their account to secure their personal information and access to the Service."/>
                    </ListItem>
                  </List>
                </ListItem>

                <ListItem sx={{ display: "list-item", paddingTop: 0, paddingBottom: 0 }}>
                  <ListItemText primary="Information Collected by UR-Active" sx={{ marginBottom: 0 }}/>
                  <List sx={{ listStyle: "lower-roman", paddingLeft: '20px', paddingTop: 0 }}>
                    <ListItem sx={{ display: "list-item", paddingTop: 0, paddingBottom: 0 }}>
                      <ListItemText primary="Routes Taken: UR-Active will collect data on the routes taken by users for Validation purposes."/>
                    </ListItem>
                    <ListItem sx={{ display: "list-item", paddingTop: 0, paddingBottom: 0 }}>
                      <ListItemText primary="Validation Form: Users may submit validation forms which may include routes taken and comments."/>
                    </ListItem>
                    <ListItem sx={{ display: "list-item", paddingTop: 0, paddingBottom: 0 }}>
                      <ListItemText primary="Feedback Form: Users may submit feedback forms which may include personal preferences and opinions."/>
                    </ListItem>
                    <ListItem sx={{ display: "list-item", paddingTop: 0, paddingBottom: 0 }}>
                      <ListItemText primary="Path Preferences: UR-Active may collect information on users' preferences for the type of paths they want."/>
                    </ListItem>
                  </List>
                </ListItem>

              </List>
            </ListItem>

            <ListItem sx={{ display: "list-item", flexDirection: "column", paddingBottom: 0 }}>
              <ListItemText primary="Use of Information:" sx={{ marginBottom: 0 }} />
              <List sx={{ listStyle: "lower-alpha", paddingLeft: '20px', paddingTop: 0 }}>
                <ListItem sx={{ display: "list-item", paddingTop: 0, paddingBottom: 0 }}>
                  <ListItemText primary="To provide and maintain the Service;"/>
                </ListItem>
                <ListItem sx={{ display: "list-item", paddingTop: 0, paddingBottom: 0 }}>
                  <ListItemText primary="To personalize user experience and improve the functionality of the Service;"/>
                </ListItem>
                <ListItem sx={{ display: "list-item", paddingTop: 0, paddingBottom: 0 }}>
                  <ListItemText primary="To communicate with users, including responding to inquiries and providing support;"/>
                </ListItem>
                <ListItem sx={{ display: "list-item", paddingTop: 0, paddingBottom: 0 }}>
                  <ListItemText primary="To analyze preferences to enhance the Service’s features and services;"/>
                </ListItem>
                <ListItem sx={{ display: "list-item", paddingTop: 0, paddingBottom: 0 }}>
                  <ListItemText primary="To comply with legal obligations."/>
                </ListItem>
              </List>
            </ListItem>

            <ListItem sx={{ display: "list-item", flexDirection: "column", paddingBottom: 0 }}>
              <ListItemText primary="Sharing of Information:" sx={{ marginBottom: 0 }} />
              <List sx={{ listStyle: "lower-alpha", paddingLeft: '20px', paddingTop: 0 }}>
                <ListItem sx={{ display: "list-item", paddingTop: 0, paddingBottom: 0 }}>
                  <ListItemText primary="With service providers who assist us in operating the Service and providing services to users;"/>
                </ListItem>
                <ListItem sx={{ display: "list-item", paddingTop: 0, paddingBottom: 0 }}>
                  <ListItemText primary="With affiliated companies or third parties for purposes consistent with this Privacy Policy;"/>
                </ListItem>
                <ListItem sx={{ display: "list-item", paddingTop: 0, paddingBottom: 0 }}>
                  <ListItemText primary="In response to a subpoena, court order, or other legal process;"/>
                </ListItem>
                <ListItem sx={{ display: "list-item", paddingTop: 0, paddingBottom: 0 }}>
                  <ListItemText primary="To protect our rights, property, or safety, or the rights, property, or safety of others;"/>
                </ListItem>
                <ListItem sx={{ display: "list-item", paddingTop: 0, paddingBottom: 0 }}>
                  <ListItemText primary="With the consent of the user."/>
                </ListItem>
              </List>
            </ListItem>

            <ListItem sx={{ display: "list-item", flexDirection: "column" }}>
              <ListItemText primary="Security: We are committed to protecting the security of users' personal information. We implement appropriate technical and organizational measures to safeguard the information collected through the Service."/>
            </ListItem>

            <ListItem sx={{ display: "list-item", flexDirection: "column", paddingBottom: 0 }}>
              <ListItemText primary="User Rights:" sx={{ marginBottom: 0 }} />
              <List sx={{ listStyle: "lower-alpha", paddingLeft: '20px', paddingTop: 0 }}>
                <ListItem sx={{ display: "list-item", paddingTop: 0, paddingBottom: 0 }}>
                  <ListItemText primary="The right to access, update, or delete their personal information or account;"/>
                </ListItem>
                <ListItem sx={{ display: "list-item", paddingTop: 0, paddingBottom: 0 }}>
                  <ListItemText primary="The right to object to the processing of their personal information;"/>
                </ListItem>
                <ListItem sx={{ display: "list-item", paddingTop: 0, paddingBottom: 0 }}>
                  <ListItemText primary="The right to withdraw consent for the collection and processing of personal information."/>
                </ListItem>
              </List>
            </ListItem>

          </List>

          <Typography sx={{ textAlign: 'start', marginBottom: '10px' }}>
            This Privacy Policy is subject to change without notice. Any changes will be effective immediately upon posting the updated Privacy Policy on the Service. It is your responsibility to review this Privacy Policy periodically for any changes. Your continued use of the Service following the posting of any changes to this Privacy Policy constitutes acceptance of those changes.
          </Typography>

          <Typography sx={{ textAlign: 'start', marginBottom: '10px' }}>
            If you have any questions or concerns regarding this Privacy Policy, please contact us at +65 81111111.
          </Typography>

          <Typography sx={{ textAlign: 'end', marginBottom: '10px', marginTop: '20px' }}>
            Last Updated: 14/3/24
          </Typography>
          
          </VerticalSpace>
        </CenterItem>

      </StyledFormContainer>
    </StyledContainer>
  );
}

export default PrivacyPolicy;