import React, {useEffect, useState} from 'react';
import { Grid } from '@mui/material';
import { ProductItem } from '../../components/ProductItem';
import { getProductsAsync, productsIds as selectorProductsIds } from '../../slices/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './styles';
import TitlePage from '../../../../shared/ui/TitlePage';
import Spinner from '../../../../shared/ui/Spinner';
import { useModal } from '../../../../shared/hooks/useModal';
import { Modal } from '../../../../shared/ui/Modal';
import { useLocation, useNavigate } from 'react-router-dom';

export const Products = () => {
  const [purchaseInformation, setPurchaseInformation] = useState({});
  const dispatch = useDispatch();
  let { state } = useLocation();
  let navigate = useNavigate();
  const { isShowing, toggle: toggleModal } = useModal();

  const productsIds = useSelector(selectorProductsIds);
  const productsStatus = useSelector((state) => state.products.status);

  useEffect(() => {
    productsStatus === 'idle' && dispatch(getProductsAsync());
  }, [productsStatus, dispatch]);

  useEffect(() => {
    if (state?.purchaseInformation) {
      // issue react router holds state
      setPurchaseInformation(state?.purchaseInformation);
      navigate('/', { state: null });

      toggleModal();
    }
  }, [toggleModal, state?.purchaseInformation]);

  const renderedListProducts = productsIds.map((productsId) => {
    return <ProductItem key={productsId} id={productsId} />;
  });

  return (
    <>
      <Grid>
        <TitlePage component='h1' variant='h4' align='left'>
          Products
        </TitlePage>
        <Grid container spacing={2} direction='row' justifyContent='center'>
          {productsStatus === 'loading' && <Spinner style={{ marginTop: 30 }} />}
          {renderedListProducts}
        </Grid>
      </Grid>
      <Modal isShowing={isShowing} hide={toggleModal} content={purchaseInformation} />
    </>
  );
};
