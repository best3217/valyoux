import { paramCase, capitalCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../../routes/paths';
// hooks
import useSettings from '../../../../../hooks/useSettings';
// layouts
import Layout from '../../../../../layouts';
// components
import Page from '../../../../../components/Page';
import HeaderBreadcrumbs from '../../../../../components/HeaderBreadcrumbs';
// sections
import UserNewForm from '../../../../../sections/@dashboard/user/UserNewForm';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

UserEdit.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserEdit() {
  const { themeStretch } = useSettings();

  const { query } = useRouter();

  const { name } = query;

  const { users } = useSelector(state => state.user)

  const currentUser = users.find((user) => paramCase(user.firstName + user.lastName) === name);
  // const currentUser = user

  return (
    <Page title="User: Edit user">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit user"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.admin.userManage.list },
            { name: capitalCase(name) },
          ]}
        />

        <UserNewForm isEdit currentUser={currentUser} />
      </Container>
    </Page>
  );
}
