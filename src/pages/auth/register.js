// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
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
      </Page>
    </GuestGuard>
  );
}
