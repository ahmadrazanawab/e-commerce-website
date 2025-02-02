import React from 'react';
import ProductItems from './ProductItems';
import AddProductItem from './AddProductItem';

const Product: React.FC = () => {
    return (
        <section className='pt-20 pb-4 bg-slate-400'>
            <AddProductItem/>
            <ProductItems/>
        </section>
    );
};

export default Product;
