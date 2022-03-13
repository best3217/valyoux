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
import { ResetPasswordForm } from '../../sections/auth/password';
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
  return (
    <Page title="Reset Password" sx={{ height: 1 }}>
      <RootStyle>
        <Container>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
            <SectionStyle>
                <Image
                    src="/logo/valyou_x_black_logo.svg"
                    alt="login"
                    style={{ width: '65%', margin: 'auto' }}
                />
                <Typography variant="h5" sx={{ px: 5, mt: 10, mb: 1, color: 'primary.main', textAlign: 'center' }}>
                Reset Password
                </Typography>
                <ResetPasswordForm/>
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
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}