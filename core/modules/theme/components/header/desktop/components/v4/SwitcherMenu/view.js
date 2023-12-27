/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import Button from '@common_button';
import Skeleton from '@common_skeleton';

const ViewSwitcherCurrency = (props) => {
    const {
        t, title, id, open, anchorEl, currencyState, handleClick, handleClose, loading,
    } = props;

    const router = useRouter();

    const buttonRef = useRef();
    const anchorOrigin = { vertical: 'bottom', horizontal: 'right' };
    const transforOrigin = { vertical: 'top', horizontal: 'right' };
    const styleTitle = { fontSize: 12, textTransform: 'uppercase' };
    const styleButton = { fontFamily: 'Montserrat', padding: '0px', fontSize: title ? '12px' : '1em' };

    const isEmptyCookiesCurrency = currencyState === undefined || currencyState === null;
    /**
     * loading state
     */
    if (loading || isEmptyCookiesCurrency || currencyState === null) {
        return (
            <div>
                {title && <Skeleton style={{ padding: 0 }} variant="rect" width={100} height={10} />}
                <Skeleton style={{ display: 'inline-block', padding: 0 }} variant="rect" width={100} height={10} />
            </div>
        );
    }

    /**
     * rendering
     */
    return null;
    // return (
    //     <div>
    //         {/* [CURRENCY] TITLE */}
    //         {currencyState?.exchange_rates.length > 1 && title && (
    //             <div>
    //                 <strong style={styleTitle}>{title}</strong>
    //             </div>
    //         )}

    //         {/* [CURRENCY] BUTTON */}
    //         <Button ref={buttonRef} onClick={handleClick} style={styleButton}>
    //             <strong>More...</strong>
    //         </Button>

    //         {/* [CURRENCY] LIST */}
    //         <Popover
    //             id={id}
    //             open={open}
    //             anchorEl={anchorEl}
    //             onClose={handleClose}
    //             anchorOrigin={anchorOrigin}
    //             transformOrigin={transforOrigin}
    //             container={buttonRef.current}
    //         >
    //             <List component="nav">
    //                 <ListItem
    //                     button
    //                     key="menu-1"
    //                     onClick={() => router.push('/confirmpayment')}
    //                 >
    //                     <ListItemText
    //                         classes={{ primary: classes.listItemText }}
    //                         primary={t('common:menu:confirmpayment')}
    //                     />
    //                 </ListItem>
    //                 <ListItem
    //                     button
    //                     key="menu-2"
    //                     onClick={() => router.push('/sales/order/track')}
    //                 >
    //                     <ListItemText
    //                         classes={{ primary: classes.listItemText }}
    //                         primary={t('common:menu:trackingorder')}
    //                     />
    //                 </ListItem>
    //             </List>
    //         </Popover>
    //     </div>
    // );
};

export default ViewSwitcherCurrency;
