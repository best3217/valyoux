import { useState, useEffect } from 'react';
//next
import { useRouter } from "next/router";
// @mui
import { MenuItem, Stack, Box, Button } from '@mui/material';
// components
import Image from '../../../components/Image';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import { useSelector, useDispatch } from 'react-redux'
import { changeRole } from '../../../redux/slices/role';
import ConfirmDialog from '../../../components/ConfirmDialog'
//hook
import useAuth from '../../../hooks/useAuth';
import { addRoleData } from '../../../redux/slices/role';
import { useSnackbar } from 'notistack';
import { PATH_DASHBOARD } from '../../../routes/paths';

export default function RolePopover() {

    const { currentRole, roles } = useSelector((state) => state.role)
    const { user } = useAuth();
    const router = useRouter();
    const dispatch = useDispatch()

    const [open, setOpen] = useState('')
    const [selectRole, setSelectRole] = useState('')
    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const { enqueueSnackbar } = useSnackbar();

    const handleChangeRole = (role) => {
        const isHasRole = user.role.some(_role => _role===role.value)

        if(isHasRole) {
            // console.log(ru)
            if(role.value == currentRole.value) {
                enqueueSnackbar('You are using ' + role.value + ' account',  { variant: 'warning' });    
            }else {
                enqueueSnackbar('Your account have been swiched to ' + role.value, { variant: 'success' });
                dispatch(changeRole(role))
                localStorage.setItem('role', JSON.stringify(role))
                router.push('/dashboard/'+ role.value)
            }
        }else {
            setDialogOpen(true)
            setSelectRole(role)
        }
    }

    //dialog
    const [openDialog, setDialogOpen] = useState(false);

    const handleDiaogOkay = () => {
        setDialogOpen(false)
        router.push('/dashboard/'+selectRole.value+'/create')
    };

    useEffect(() => {
        const userRole = localStorage.getItem('role');
        const hasAdmin = user.role.some(role => role=="admin")
        
        if(userRole) {
            dispatch(changeRole(JSON.parse(userRole)))
        }
        
        if(hasAdmin) {
            const adminRoleData = 
                {
                    label: 'Admin',
                    value: 'admin',
                    icon: '/icons/admin.svg',
                }
            dispatch(addRoleData(adminRoleData))
        }
    }, [])

    return (
        <>  
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', ml:-2.25 }}>
            <ConfirmDialog
                id="ringtone-menu"
                keepMounted
                open={openDialog}
                title={"You don't have currently " + selectRole.value + " account."}
                content={"Would you create " + selectRole.value + " account?"}
                onOkay = {handleDiaogOkay}
                onClose={() => setDialogOpen(false)}
            />
        </Box>
             <IconButtonAnimate
                onClick={handleOpen}
                sx={{
                width: 40,
                height: 40,
                ...(open && { bgcolor: 'action.selected' }),
                }}
            >
                <Image disabledEffect src={currentRole.icon} alt={currentRole.label} />
            </IconButtonAnimate>

            <MenuPopover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleClose}
                sx={{
                mt: 1.5,
                ml: 0.75,
                width: 180,
                '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
                }}
            >
                <Stack spacing={0.75}>
                    {roles.map((option) => (
                        <MenuItem
                            key={option.value}
                            selected={option.value === currentRole.value}
                            onClick={() => {
                                handleChangeRole(option)
                                handleClose();
                        }}
                        >
                            <Image disabledEffect alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />
                            {option.label}
                        </MenuItem>
                    ))}
                </Stack>
            </MenuPopover>
        </>
    )
}