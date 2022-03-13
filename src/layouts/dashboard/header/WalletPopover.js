import { useState } from 'react';
import { Popover, Typography } from '@mui/material';
import { IconButtonAnimate } from '../../../components/animate';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Image from '../../../components/Image';

export default function WalletPopover() {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'wallet-popver' : undefined;
    
    return (
        <>
            <IconButtonAnimate aria-describedby={id} variant="contained" onClick={handleClick}>
                <Image src="/icons/wallet-1.svg" sx={{ width:'24px' }} />
            </IconButtonAnimate>

            <Popover
                id={id}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 2, left: 830 }}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ px:2, py:1.35 }}>Total Balance: $ 1000252.198199 VXD</Typography>
            </Popover>
        </>
    )
}