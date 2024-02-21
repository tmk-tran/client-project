import React from 'react';
import { generateSellerUrl } from './sellerUtils';

const SellerLink = ({ seller }) => {
    console.log(seller);
  const sellerUrl = generateSellerUrl(seller.refId);
  console.log(sellerUrl);

  return (
    <a href={sellerUrl} target="_blank" rel="noopener noreferrer">
      View Seller {sellerUrl}
    </a>
  );
};

export default SellerLink;
