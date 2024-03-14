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

const TermsAndConditions = () => {
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
          Terms and Conditions
        </Typography>
      )}
    </FrozenBar>

      <StyledFormContainer>
          
          <VerticalSpace>
            <CenterItem>
              <LeftItem>
                <Typography sx={{ textAlign: 'start' }} variant="h1">UR-Active</Typography>
                <Typography sx={{ textAlign: 'start', marginBottom: '-15px' }} variant="h1" color="#000000">Terms and Conditions</Typography>
              </LeftItem>
            </CenterItem>
          </VerticalSpace>

          <CenterItem>
            <VerticalSpace>
            <Typography sx={{ textAlign: 'start', marginBottom: '10px' }}>
                UR-Active (the "Service") is provided by Founding Pathers (the “Company”) to our users in accordance to these Terms and Conditions ("Terms"). By using the Service, you agree to be bound by these Terms. Please read them carefully.
            </Typography>

            <List sx={{ listStyle: "decimal", paddingLeft: '20px' }}>

              <ListItem sx={{ display: "list-item", flexDirection: "column", paddingTop: 0  }}>
                <ListItemText primary="Acceptance of Terms: By accessing or using the Service, you agree to comply with and be bound by these Terms. If you do not agree with any part of these Terms, you may not use the Service." sx={{ marginBottom: 0 }} />
              </ListItem>

              <ListItem sx={{ display: "list-item", flexDirection: "column", paddingBottom: 0 }}>
                <ListItemText primary="Privacy" sx={{ marginBottom: 0 }} />
                <List sx={{ listStyle: "lower-alpha", paddingLeft: '20px', paddingTop: 0 }}>
                  <ListItem sx={{ display: "list-item", paddingTop: 0 }}>
                    <ListItemText
                      primary={
                        <span>
                          Data Collection: Data collected from you and used will be pursuant to the terms and conditions of our Privacy Policy. View our&nbsp;
                          <Link href="/privacypolicy" color="primary" sx={{ fontWeight: 'medium' }}>Privacy Policy</Link>
                          &nbsp;for more detailed information.
                        </span>
                      }
                    />
                  </ListItem>
                </List>
              </ListItem>

              <ListItem sx={{ display: "list-item", flexDirection: "column", paddingTop: 0, paddingBottom: 0 }}>
                <ListItemText primary="Disclaimers" sx={{ marginBottom: 0 }} />
                <List sx={{ listStyle: "lower-alpha", paddingLeft: '20px', paddingTop: 0 }}>
                  <ListItem sx={{ display: "list-item", paddingTop: 0, paddingBottom: 0 }}>
                    <ListItemText primary="Accuracy of Information: The accuracy of UR-Active's information may not always be accurate, and you should exercise their judgment when relying on the app for navigation." />
                  </ListItem>
                  <ListItem sx={{ display: "list-item", paddingTop: 0 }}>
                    <ListItemText primary="Availability: UR-Active's availability and functionality may be subject to occasional disruptions should there be updates available." />
                  </ListItem>
                </List>
              </ListItem>

              <ListItem sx={{ display: "list-item", flexDirection: "column", paddingTop: 0, paddingBottom: 0 }}>
                <ListItemText primary="Intellectual Property" sx={{ marginBottom: 0 }} />
                <List sx={{ listStyle: "lower-alpha", paddingLeft: '20px', paddingTop: 0 }}>
                  <ListItem sx={{ display: "list-item", paddingTop: 0, paddingBottom: 0 }}>
                    <ListItemText primary="Ownership: The contents, logos, and other visual media within this Service are not your property and are protected by copyright laws. All intellectual property rights in the Service are owned by Founding Pathers or its licensors." />
                  </ListItem>
                  <ListItem sx={{ display: "list-item", paddingTop: 0 }}>
                    <ListItemText primary="Use Restrictions: You agree not to reproduce, distribute, modify, display, perform, or otherwise use any of the content, logos, or visual media in the Service without the prior written consent of Founding Pathers." />
                  </ListItem>
                </List>
              </ListItem>

              <ListItem sx={{ display: "list-item", flexDirection: "column", paddingBottom: 0 }}>
                <ListItemText primary="Content" sx={{ marginBottom: 0 }} />
                <List sx={{ listStyle: "lower-alpha", paddingLeft: '20px', paddingTop: 0 }}>
                  <ListItem sx={{ display: "list-item", paddingTop: 0 }}>
                    <ListItemText primary="Prohibited Actions: You may not repost or mass download the content from the Service, unless expressly permitted to do so by written permission from Founding Pathers." />
                  </ListItem>
                </List>
              </ListItem>

              <ListItem sx={{ display: "list-item", flexDirection: "column", paddingTop: 0, paddingBottom: 0 }}>
                <ListItemText primary="User Conduct" sx={{ marginBottom: 0 }} />
                <List sx={{ listStyle: "lower-alpha", paddingLeft: '20px', paddingTop: 0 }}>
                  <ListItem sx={{ display: "list-item", paddingTop: 0, paddingBottom: 0 }}>
                    <ListItemText primary="Lawful Use: You agree not to use the Service for any purpose that is unlawful or prohibited by these Terms." />
                  </ListItem>
                  <ListItem sx={{ display: "list-item", paddingTop: 0 }}>
                    <ListItemText primary="Responsibility for Content: You are solely responsible for the content they submit or share on the Service." />
                  </ListItem>
                </List>
              </ListItem>

              <ListItem sx={{ display: "list-item", flexDirection: "column", paddingBottom: 0 }}>
                <ListItemText primary="Indemnification" sx={{ marginBottom: 0 }} />
                <List sx={{ listStyle: "lower-alpha", paddingLeft: '20px', paddingTop: 0 }}>
                  <ListItem sx={{ display: "list-item", paddingTop: 0 }}>
                    <ListItemText primary="User Responsibility: You agree to indemnify and hold Founding Pathers harmless from any claim or demand, including reasonable attorneys' fees, made by any third party due to or arising out of their use of the Service." />
                  </ListItem>
                </List>
              </ListItem>

              <ListItem sx={{ display: "list-item", flexDirection: "column", paddingTop: 0, paddingBottom: 0 }}>
                <ListItemText primary="Feedback" sx={{ marginBottom: 0 }} />
                <List sx={{ listStyle: "lower-alpha", paddingLeft: '20px', paddingTop: 0 }}>
                  <ListItem sx={{ display: "list-item", paddingTop: 0, paddingBottom: 0 }}>
                    <ListItemText primary="User Contributions: If you submit feedback within this Service, Founding Pathers may use these information for future improvement of this Service." />
                  </ListItem>
                  <ListItem sx={{ display: "list-item", paddingTop: 0 }}>
                    <ListItemText primary="User Social Conduct: If you submit feedback through this Service, ensure that your feedback complies with all applicable laws and regulations. Do not engage in any activities that violate legal standards." />
                  </ListItem>
                </List>
              </ListItem>

              <ListItem sx={{ display: "list-item", flexDirection: "column", paddingTop: 0  }}>
                <ListItemText primary="Governing Law: These Terms shall be governed and construed in accordance with the laws of Singapore, without regard to its conflict of law provisions." />
              </ListItem>

              <ListItem sx={{ display: "list-item", flexDirection: "column", paddingTop: 0  }}>
                <ListItemText primary="Termination: We reserve the right to terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms." />
              </ListItem>

              <ListItem sx={{ display: "list-item", flexDirection: "column", paddingBottom: 0 }}>
                <ListItemText primary="Changes to the Service" sx={{ marginBottom: 0 }} />
                <List sx={{ listStyle: "lower-alpha", paddingLeft: '20px', paddingTop: 0 }}>
                  <ListItem sx={{ display: "list-item", paddingTop: 0 }}>
                    <ListItemText primary="Modification: Founding Pathers will have the right to modify or discontinue the Service at any time, with or without notice." />
                  </ListItem>
                </List>
              </ListItem>

              <ListItem sx={{ display: "list-item", flexDirection: "column", paddingTop: 0, paddingBottom: 0 }}>
                <ListItemText primary="Limitation of Liability" sx={{ marginBottom: 0 }} />
                <List sx={{ listStyle: "lower-alpha", paddingLeft: '20px', paddingTop: 0 }}>
                  <ListItem sx={{ display: "list-item", paddingTop: 0, paddingBottom: 0 }}>
                    <ListItemText primary="No Warranty: UR-Active is provided 'as is' without warranties of any kind, either expressed or implied." />
                  </ListItem>
                  <ListItem sx={{ display: "list-item", paddingTop: 0 }}>
                    <ListItemText primary="Consequential Damages: Founding Pathers will not be liable for any damages arising out of the use or inability to use this Service." />
                  </ListItem>
                </List>
              </ListItem>

              <ListItem sx={{ display: "list-item", flexDirection: "column", paddingTop: 0  }}>
                <ListItemText primary="Links to Other Websites: The Service may contain links to third-party websites or services that are not owned or controlled by Founding Pathers. Founding Pathers has no control over and assumes no responsibility for the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that Founding Pathers shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services." />
              </ListItem>

              <ListItem sx={{ display: "list-item", flexDirection: "column", paddingBottom: 0 }}>
                <ListItemText primary="User Accounts" sx={{ marginBottom: 0 }} />
                <List sx={{ listStyle: "lower-alpha", paddingLeft: '20px', paddingTop: 0 }}>
                  <ListItem sx={{ display: "list-item", paddingTop: 0 }}>
                    <ListItemText primary="Account Security: You are responsible for keeping your accounts secure. UR-Active will not be held liable for the loss or breech of your account." />
                  </ListItem>
                </List>
              </ListItem>

            </List>

            <Typography sx={{ textAlign: 'start', marginBottom: '10px' }}>
              These Terms are subject to change without notice. It is your responsibility to review these Terms periodically for any changes. Your continued use of the Service following the posting of any changes to these Terms constitutes acceptance of those changes.
            </Typography>

            <Typography sx={{ textAlign: 'start', marginBottom: '10px' }}>
              If you have any questions or concerns regarding these Terms, please contact us at +6581111111.
            </Typography>

            <Typography sx={{ textAlign: 'end', marginBottom: '10px', marginTop: '20px' }}>
              Last Updated: 24/1/24
            </Typography>
                
            </VerticalSpace>
          </CenterItem>

    </StyledFormContainer>

    </StyledContainer>
  );
}

export default TermsAndConditions;