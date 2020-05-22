import { getCartId, setCartId } from '@helpers/cartId';
import { getLoginInfo } from '@helpers/auth';
import { GraphCart } from '@services/graphql';
import { setCountCart } from '@stores/actions/cart';
// import Router from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import TagManager from 'react-gtm-module';
import { addSimpleProductsToCart } from '../../services/graphql';
import Footer from './Footer';

export default ({
    setOpen,
    t,
    data: {
        __typename, sku, name, categories,
        price_range, stock_status,
    },
    setMessage,
    loading,
    setLoading,
}) => {
    const [qty, setQty] = React.useState(1);
    const handleQty = (event) => {
        setQty(event.target.value);
    };
    const dispatch = useDispatch();

    let cartId = '';
    let isLogin = '';

    if (typeof window !== 'undefined') {
        isLogin = getLoginInfo();
        cartId = getCartId();
    }

    const [addCartSimple] = addSimpleProductsToCart();
    const [getGuestCartId] = GraphCart.getGuestCartId();
    const cartUser = GraphCart.getCustomerCartId();

    const handleAddToCart = async () => {
        setLoading(true);
        const errorMessage = {
            variant: 'error',
            text: t('product:failedAddCart'),
            open: true,
        };
        if (!cartId || cartId === '' || cartId === undefined) {
            if (!isLogin) {
                await getGuestCartId()
                    .then((res) => {
                        const token = res.data.createEmptyCart;
                        cartId = token;
                        setCartId(token);
                    })
                    .catch((e) => {
                        setLoading(false);
                        setMessage({
                            ...errorMessage,
                            text: e.message.split(':')[1] || errorMessage.text,
                        });
                    });
            } else {
                const token = cartUser.data.customerCart.id || '';
                cartId = token;
                setCartId(token);
            }
        }
        if (__typename === 'SimpleProduct') {
            TagManager.dataLayer({
                dataLayer: {
                    event: 'addToCart',
                    eventLabel: name,
                    ecommerce: {
                        currencyCode: price_range.minimum_price.regular_price.currency || 'USD',
                        add: {
                            products: [{
                                name,
                                id: sku,
                                price: price_range.minimum_price.regular_price.value || 0,
                                category: categories.length > 0 ? categories[0].name : '',
                                list: categories.length > 0 ? categories[0].name : '',
                                quantity: qty,
                                dimensions4: stock_status,
                            }],
                        },
                    },
                },
            });
            addCartSimple({
                variables: {
                    cartId,
                    sku,
                    qty: parseFloat(qty),
                },
            })
                .then((res) => {
                    dispatch(
                        setCountCart(res.data.addSimpleProductsToCart.cart.total_quantity),
                    );
                    setMessage({
                        variant: 'success',
                        text: t('product:successAddCart'),
                        open: true,
                    });
                    setLoading(false);
                    setOpen(false);
                })
                .catch((e) => {
                    setLoading(false);
                    setMessage({
                        ...errorMessage,
                        text: e.message.split(':')[1] || errorMessage.text,
                    });
                });
        }
    };

    return (
        <Footer
            qty={qty}
            handleQty={handleQty}
            handleAddToCart={handleAddToCart}
            t={t}
            loading={loading}
        />
    );
};
