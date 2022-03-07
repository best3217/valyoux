import { capitalCase } from 'change-case';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
// hooks
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// routes
import { PATH_AUTH } from '../../routes/paths';
// guards
import GuestGuard from '../../guards/GuestGuard';
// components
import Page from '../../components/Page';
import Image from '../../components/Image';
// sections
import { RegisterForm } from '../../sections/auth/register';

// ----------------------------------------------------------------------

const SectionStyle = styled(Card)(({ theme }) => ({
  maxWidth: 420,
  margin: theme.spacing(2, 'auto'),
  borderRadius: '0.25rem',
  marginTop: 70,
  boxShadow: '0 1.5px 4px 0 rgba(0,0,0,.3)',
  padding: theme.spacing(6, 4, 3),
}));

// ----------------------------------------------------------------------

export default function Register() {
  const { method } = useAuth();

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  return (
    <GuestGuard>
      <Page title="Register">
        <Container>
          <SectionStyle>
            <Image
                src="/logo/valyou_x_black_logo.svg"
                alt="login"
                style={{ width: '65%', margin: 'auto auto 60px' }}
            />
            <RegisterForm />
          </SectionStyle>

          <Typography sx={{ mt: { md: 5 }, mb:1, textAlign: 'center', fontSize: 13 }}>
            Already have an account ? {''}
              <NextLink href={PATH_AUTH.login} passHref>
                <Link variant="subtitle2" underline="none" 
                  sx={(theme) => ({
                  '&:hover': {
                    color: theme.palette.success.main,
                  },
                })}
                >
                Login
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
                Already have an account? {''}
                <NextLink href={PATH_AUTH.login} passHref>
                  <Link variant="subtitle2">Login</Link>
                </NextLink>
              </Typography>
            )}
          </HeaderStyle>

          {mdUp && (
            <SectionStyle>
              <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                Manage the job more effectively with Minimal
              </Typography>
              <Image
                alt="register"
                src="https://minimal-assets-api.vercel.app/assets/illustrations/illustration_register.png"
              />
            </SectionStyle>
          )}

          <Container>
            <ContentStyle>
              <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    Get started absolutely free.
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>Free forever. No credit card needed.</Typography>
                </Box>
                <Tooltip title={capitalCase(method)}>
                  <>
                    <Image
                      disabledEffect
                      alt={method}
                      src={`https://minimal-assets-api.vercel.app/assets/icons/auth/ic_${method}.png`}
                      sx={{ width: 32, height: 32 }}
                    />
                  </>
                </Tooltip>
              </Box>

              <RegisterForm />

              <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
                By registering, I agree to Minimal&nbsp;
                <Link underline="always" color="text.primary" href="#">
                  Terms of Service
                </Link>
                {''}and{''}
                <Link underline="always" color="text.primary" href="#">
                  Privacy Policy
                </Link>
                .
              </Typography>

              {!smUp && (
                <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                  Already have an account?{' '}
                  <NextLink href={PATH_AUTH.login} passHref>
                    <Link variant="subtitle2">Login</Link>
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
