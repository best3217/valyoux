import { useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Link, Container, Card, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
// routes
import { PATH_AUTH } from '../../routes/paths';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections
import { ForgetPasswordForm } from '../../sections/auth/password';
// assets
import { SentIcon } from '../../assets';

import Image from '../../components/Image';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  maxWidth: 420,
  margin: theme.spacing(2, 'auto'),
  borderRadius: '0.25rem',
  marginTop: 70,
  boxShadow: '0 1.5px 4px 0 rgba(0,0,0,.3)',
  padding: theme.spacing(6, 4, 3),
}));

// ----------------------------------------------------------------------

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <Page title="Forget Password" sx={{ height: 1 }}>
      <RootStyle>
        <Container>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
            {!sent ? (
              <>
                <SectionStyle>
                  <Image
                  src="/logo/valyou_x_black_logo.svg"
                  alt="login"
                  style={{ width: '65%', margin: 'auto' }}
                  />
                  <Typography variant="h5" sx={{ px: 5, mt: 10, mb: 1, color: 'primary.main', textAlign: 'center' }}>
                    Forget Password
                  </Typography>
                  <ForgetPasswordForm onSent={() => setSent(true)} onGetEmail={(value) => setEmail(value)} />
                </SectionStyle>

                <Typography sx={{ mt: { md: 5 }, mb:1, textAlign: 'center', fontSize: 13 }}>
                  Remember It ? {''}
                  <NextLink href={PATH_AUTH.login} passHref>
                    <Link variant="subtitle2" underline="none" 
                      sx={(theme) => ({
                      '&:hover': {
                        color: theme.palette.success.main,
                      },
                    })}
                    >
                    Sign In here
                  </Link>
                  </NextLink>
                </Typography>
                <Typography sx={{ pb:3, fontSize: 13, textAlign: 'center' }}>© {(new Date).getFullYear()} <FavoriteIcon sx={{ fontSize:12, verticalAlign: 'middle', color: '#f46a6a' }} /> Valyou X Powered by Blockchain Technology </Typography>
              </>
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

                <Typography variant="h3" gutterBottom>
                  Request sent successfully
                </Typography>
                <Typography>
                  We have sent a confirmation email to &nbsp;
                  <strong>{email}</strong>
                  <br />
                  Please check your email.
                </Typography>

                <NextLink href={PATH_AUTH.login} passHref>
                  <Button size="large" variant="contained" sx={{ mt: 5 }}>
                    Back
                  </Button>
                </NextLink>
              </Box>
            )}
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
