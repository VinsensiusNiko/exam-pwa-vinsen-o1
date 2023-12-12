import React from 'react';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import Typography from '@common_typography';
import ButtonQty from '@common_buttonqty';

const Button = dynamic(() => import('@common_button'), { ssr: true });

const ConfigurableView = (props) => {
    const {
        loading,
        disabled,
        showQty = true,
        handleAddToCart,
        qty,
        setQty,
        t,
        showAddToCart = true,
        customStyleBtnAddToCard = '',
        labelAddToCart = '',
        maxQty = 10000,
        customButton,
        customQty = false,
        freeItemsData,
        showStockStatus,
        stockStatus,
    } = props;

    if (customButton) {
        return customButton;
    }

    return (
        <div className="flex flex-col gap-4">
            { (showStockStatus && stockStatus) && (
                <div className="flex flex-row gap-2 items-center">
                    <div className={classNames(
                        'w-3 h-3 rounded-full bg-green',
                    )}
                    />
                    <Typography className="font-normal capitalize">{stockStatus.replace(/_/g, ' ').toLowerCase()}</Typography>
                </div>
            ) }
            <div className="flex flex-row gap-4 items-end">
                {showQty && (
                    <div className={classNames('flex flex-col gap-2', 'product-OptionItem-qty')}>
                        <Typography className="font-normal" variant="span">
                            {t('common:title:qty')}
                        </Typography>
                        <ButtonQty
                            value={qty}
                            onChange={setQty}
                            max={customQty ? freeItemsData.quantity : maxQty}
                            disabled={disabled}
                            classNameInput="h-[38px]"
                        />
                    </div>
                )}
                {showAddToCart && (
                    <Button
                        id="plugin-addToCart-btn"
                        className={classNames(
                            'w-full h-[48px]',
                            customStyleBtnAddToCard,
                        )}
                        classNameText="justify-center"
                        color="primary"
                        onClick={handleAddToCart}
                        loading={loading}
                        disabled={disabled}
                    >
                        {labelAddToCart || t('product:addToCart')}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ConfigurableView;
