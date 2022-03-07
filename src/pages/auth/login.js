import { capitalCase } from 'change-case';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Link, Alert, Tooltip, Container, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
// routes
import { PATH_AUTH } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// guards
import GuestGuard from '../../guards/GuestGuard';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import Image from '../../components/Image';
// sections
import { LoginForm } from '../../sections/auth/login';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  maxWidth: 420,
  margin: theme.spacing(2, 'auto'),
  borderRadius: '0.25rem',
  marginTop: 70,
  boxShadow: '0 1.5px 4px 0 rgba(0,0,0,.3)',
  padding: theme.spacing(6, 4, 3),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuth();

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <GuestGuard>
      <Page title="Login">
        <Container maxWidth="sm">
          <SectionStyle>
            <Image
                src="/logo/valyou_x_black_logo.svg"
                alt="login"
                style={{ width: '65%', margin: 'auto' }}
            />
            <Typography variant="h5" sx={{ px: 5, mt: 10, mb: 1, color: 'primary.main', textAlign: 'center' }}>
              Welcome Back !
            </Typography>
            <Typography sx={{ px: 5, mb: 5, color: 'primary.main', textAlign: 'center', fontSize: 13 }}>
              Sign in to continue to Valyou X.
            </Typography>
            <LoginForm />
          </SectionStyle>

          <Typography sx={{ mt: { md: 5 }, mb:1, textAlign: 'center', fontSize: 13 }}>
            Don’t have an account? {''}
            <NextLink href={PATH_AUTH.register} passHref>
              <Link variant="subtitle2" underline="none" 
                sx={(theme) => ({
                '&:hover': {
                  color: theme.palette.success.main,
                },
              })}
              >
              Signup now
            </Link>
            </NextLink>
          </Typography>
          <Typography sx={{ pb:3, fontSize: 13, textAlign: 'center' }}>© {(new Date).getFullYear()} <FavoriteIcon sx={{ fontSize:12, verticalAlign: 'middle', color: '#f46a6a' }} /> Valyou X Powered by Blockchain Technology </Typography>
        </Container>
        {/* <RootStyle>
          <HeaderStyle>
            <Logo />
            {smUp && (
              <Typography variant="body2" sx={{ mt: { md: -2 } }}>
                Don’t have an account? {''}
                <NextLink href={PATH_AUTH.register} passHref>
                  <Link variant="subtitle2">Get started</Link>
                </NextLink>
              </Typography>
            )}
          </HeaderStyle>

          {mdUp && (
            <SectionStyle>
              <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                Hi, Welcome Back
              </Typography>
              <Image
                src="https://minimal-assets-api.vercel.app/assets/illustrations/illustration_login.png"
                alt="login"
              />
            </SectionStyle>
          )}

          <Container maxWidth="sm">
            <ContentStyle>
              <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    Sign in to Minimal
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
                </Box>

                <Tooltip title={capitalCase(method)} placement="right">
                  <>
                    <Image
                      disabledEffect
                      alt={method}
                      src={`https://minimal-assets-api.vercel.app/assets/icons/auth/ic_${method}.png`}
                      sx={{ width: 32, height: 32 }}
                    />
                  </>
                </Tooltip>
              </Stack>

              <Alert severity="info" sx={{ mb: 3 }}>
                Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
              </Alert>

              <LoginForm />

              {!smUp && (
                <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                  Don’t have an account?{' '}
                  <NextLink href={PATH_AUTH.register} passHref>
                    <Link variant="subtitle2">Get started</Link>
                  </NextLink>
                </Typography>
              )}
            </ContentStyle>
          </Container>
        </RootStyle> */}
      </Page>
    </GuestGuard>
  );
}
