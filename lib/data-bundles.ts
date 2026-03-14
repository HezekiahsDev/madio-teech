export interface DataBundle {
  productCode: string;
  network: string;
  type: string;
  size: string;
  amount: number;
}

export const DATA_BUNDLES: DataBundle[] = [
  // 9MOBILE SME
  { productCode: '9MOBSME1', network: '9MOBILE', type: 'SME', size: '500MB', amount: 179 },
  { productCode: '9MOBSME2', network: '9MOBILE', type: 'SME', size: '1GB', amount: 370 },
  { productCode: '9MOBSME3', network: '9MOBILE', type: 'SME', size: '1.5GB', amount: 590 },
  { productCode: '9MOBSME4', network: '9MOBILE', type: 'SME', size: '2GB', amount: 740 },
  { productCode: '9MOBSME5', network: '9MOBILE', type: 'SME', size: '3GB', amount: 1110 },
  { productCode: '9MOBSME6', network: '9MOBILE', type: 'SME', size: '4GB', amount: 1480 },
  
  // MTN COUPON
  { productCode: 'Coupon01', network: 'MTN', type: 'COUPON', size: '500MB', amount: 135 },
  { productCode: 'Coupon02', network: 'MTN', type: 'COUPON', size: '750MB', amount: 170 },
  { productCode: 'Coupon03', network: 'MTN', type: 'COUPON', size: '1GB', amount: 262 },
  { productCode: 'Coupon04', network: 'MTN', type: 'COUPON', size: '1.5GB', amount: 360 },
  { productCode: 'Coupon05', network: 'MTN', type: 'COUPON', size: '2GB', amount: 524 },
  { productCode: 'Coupon06', network: 'MTN', type: 'COUPON', size: '3GB', amount: 823 },
  
  // MTN CORPORATE GIFTING LITE
  { productCode: 'MTNLITE01', network: 'MTN', type: 'LITE', size: '500MB', amount: 450 },
  { productCode: 'MTNLITE02', network: 'MTN', type: 'LITE', size: '1GB', amount: 870 },
  { productCode: 'MTNLITE03', network: 'MTN', type: 'LITE', size: '2GB', amount: 1740 },
  { productCode: 'MTNLITE04', network: 'MTN', type: 'LITE', size: '3GB', amount: 2610 },
  { productCode: 'MTNLITE05', network: 'MTN', type: 'LITE', size: '5GB', amount: 4350 },
  { productCode: 'MTNLITE06', network: 'MTN', type: 'LITE', size: '10GB', amount: 8700 },

  // MTN SME
  { productCode: 'SME01', network: 'MTN', type: 'SME', size: '2GB (30D)', amount: 1700 },
  { productCode: 'SME02', network: 'MTN', type: 'SME', size: '2.7GB (30D)', amount: 2100 },
  { productCode: 'SME03', network: 'MTN', type: 'SME', size: '5GB (30D)', amount: 3000 },
  { productCode: 'SME04', network: 'MTN', type: 'SME', size: '5.5GB (30D)', amount: 2800 },
  { productCode: 'SME05', network: 'MTN', type: 'SME', size: '8GB', amount: 6000 },
  { productCode: 'SME06', network: 'MTN', type: 'SME', size: '11GB', amount: 7800 },
  { productCode: 'G2', network: 'MTN', type: 'SME', size: '3.5GB', amount: 2700 },
  { productCode: '99', network: 'MTN', type: 'SME', size: '1GB (1D)', amount: 550 },

  // MTN CORPORATE GIFTING
  { productCode: 'CG01', network: 'MTN', type: 'CG', size: '50MB', amount: 70 },
  { productCode: 'CG02', network: 'MTN', type: 'CG', size: '150MB', amount: 170 },
  { productCode: 'CG03', network: 'MTN', type: 'CG', size: '250MB', amount: 270 },
  { productCode: 'CG05', network: 'MTN', type: 'CG', size: '1GB', amount: 870 },
  { productCode: 'CG06', network: 'MTN', type: 'CG', size: '2GB', amount: 1740 },
  { productCode: 'CG07', network: 'MTN', type: 'CG', size: '3GB', amount: 2610 },
  { productCode: 'CG08', network: 'MTN', type: 'CG', size: '5GB', amount: 4350 },
  { productCode: 'CG09', network: 'MTN', type: 'CG', size: '10GB', amount: 8700 },

  // MTN GIFTING
  { productCode: '98', network: 'MTN', type: 'GIFTING', size: '1GB (1D)', amount: 590 },
  { productCode: '92', network: 'MTN', type: 'GIFTING', size: '1.5GB (1D)', amount: 450 },
  { productCode: '93', network: 'MTN', type: 'GIFTING', size: '2GB (2D)', amount: 789 },
  { productCode: '93_2', network: 'MTN', type: 'GIFTING', size: '2.5GB (2D)', amount: 985 }, // duplicated id from docs, making unique
  { productCode: '94', network: 'MTN', type: 'GIFTING', size: '1GB (7D)', amount: 889 },
  { productCode: '96', network: 'MTN', type: 'GIFTING', size: '500MB (7D)', amount: 520 },
  { productCode: 'G5', network: 'MTN', type: 'GIFTING', size: '11GB (7D)', amount: 3700 },

  // AIRTEL CORPORATE GIFTING
  { productCode: 'ACG01', network: 'AIRTEL', type: 'CG', size: '100MB', amount: 150 },
  { productCode: 'ACG02', network: 'AIRTEL', type: 'CG', size: '300MB', amount: 300 },
  { productCode: 'ACG03', network: 'AIRTEL', type: 'CG', size: '500MB', amount: 420 },
  { productCode: 'ACG04', network: 'AIRTEL', type: 'CG', size: '1GB', amount: 840 },
  { productCode: 'ACG05', network: 'AIRTEL', type: 'CG', size: '2GB', amount: 1680 },
  { productCode: 'ACG06', network: 'AIRTEL', type: 'CG', size: '5GB', amount: 4200 },
  { productCode: 'ACG07', network: 'AIRTEL', type: 'CG', size: '10GB', amount: 8400 },

  // AIRTEL GIFTING
  { productCode: 'AGT01', network: 'AIRTEL', type: 'GIFTING', size: '750MB', amount: 500 },
  { productCode: 'AGT02', network: 'AIRTEL', type: 'GIFTING', size: '1.5GB', amount: 1000 },
  { productCode: 'AGT03', network: 'AIRTEL', type: 'GIFTING', size: '2GB', amount: 1150 },
  { productCode: 'AGT04', network: 'AIRTEL', type: 'GIFTING', size: '3GB', amount: 1450 },
  { productCode: 'AGT05', network: 'AIRTEL', type: 'GIFTING', size: '4.5GB', amount: 1950 },
  { productCode: 'AGT06', network: 'AIRTEL', type: 'GIFTING', size: '6GB', amount: 2490 },
  { productCode: 'AGT07', network: 'AIRTEL', type: 'GIFTING', size: '10GB', amount: 2900 },

  // AIRTEL SME
  { productCode: '77', network: 'AIRTEL', type: 'SME', size: '300MB', amount: 148 },
  { productCode: '78', network: 'AIRTEL', type: 'SME', size: '600MB', amount: 245 },
  { productCode: '79', network: 'AIRTEL', type: 'SME', size: '2.5GB (2D)', amount: 574 },
  { productCode: '80', network: 'AIRTEL', type: 'SME', size: '3GB (7D)', amount: 1150 },
  { productCode: '82', network: 'AIRTEL', type: 'SME', size: '10GB', amount: 2400 },
  { productCode: '83', network: 'AIRTEL', type: 'SME', size: '15GB', amount: 3600 },
  { productCode: '84', network: 'AIRTEL', type: 'SME', size: '100MB', amount: 85 },
  { productCode: '90', network: 'AIRTEL', type: 'SME', size: '600MB (2D)', amount: 259 },
  { productCode: '91', network: 'AIRTEL', type: 'SME', size: '2.5GB (2D)', amount: 690 },
  { productCode: '92_AIRTEL', network: 'AIRTEL', type: 'SME', size: '3GB (7D)', amount: 1190 },
  { productCode: '99_AIRTEL', network: 'AIRTEL', type: 'SME', size: '1GB (1D)', amount: 500 },
  { productCode: '100', network: 'AIRTEL', type: 'SME', size: '2GB (5D)', amount: 1000 },

  // GLO CORPORATE GIFTING
  { productCode: 'GCG01', network: 'GLO', type: 'CG', size: '200MB', amount: 99 },
  { productCode: 'GCG02', network: 'GLO', type: 'CG', size: '500MB', amount: 230 },
  { productCode: 'GCG03', network: 'GLO', type: 'CG', size: '1GB', amount: 453 },
  { productCode: 'GCG04', network: 'GLO', type: 'CG', size: '2GB', amount: 903 },
  { productCode: 'GCG05', network: 'GLO', type: 'CG', size: '3GB', amount: 1539 },
  { productCode: 'GCG06', network: 'GLO', type: 'CG', size: '5GB', amount: 2265 },
  { productCode: 'GCG07', network: 'GLO', type: 'CG', size: '10GB', amount: 4530 },

  // GLO GIFTING
  { productCode: 'DGT01', network: 'GLO', type: 'GIFTING', size: '1.3GB', amount: 495 },
  { productCode: 'DGT02', network: 'GLO', type: 'GIFTING', size: '2.9GB', amount: 1000 },
  { productCode: 'DGT03', network: 'GLO', type: 'GIFTING', size: '4.1GB', amount: 1500 },
  { productCode: 'DGT04', network: 'GLO', type: 'GIFTING', size: '5.2GB', amount: 2000 },
  { productCode: 'DGT05', network: 'GLO', type: 'GIFTING', size: '7.5GB', amount: 2600 },
  { productCode: 'DGT06', network: 'GLO', type: 'GIFTING', size: '10GB', amount: 3100 },

  // GLO SME
  { productCode: '85', network: 'GLO', type: 'SME', size: '600MB (1D)', amount: 240 },
  { productCode: '86', network: 'GLO', type: 'SME', size: '1.5GB (1D)', amount: 453 },
  { productCode: '87', network: 'GLO', type: 'SME', size: '2.5GB (2D)', amount: 685 },
  { productCode: '88', network: 'GLO', type: 'SME', size: '10GB (7D)', amount: 2550 },

  // 9MOBILE CORPORATE GIFTING
  { productCode: '9CG01', network: '9MOBILE', type: 'CG', size: '500MB', amount: 145 },
  { productCode: '9CG02', network: '9MOBILE', type: 'CG', size: '1GB', amount: 159 },
  { productCode: '9CG04', network: '9MOBILE', type: 'CG', size: '2GB', amount: 318 },
  { productCode: '9CG05', network: '9MOBILE', type: 'CG', size: '3GB', amount: 477 },
  { productCode: '9CG06', network: '9MOBILE', type: 'CG', size: '4.5GB', amount: 716 },
  { productCode: '9CG07', network: '9MOBILE', type: 'CG', size: '5GB', amount: 795 },
  { productCode: '9CG08', network: '9MOBILE', type: 'CG', size: '10.5GB', amount: 1659 },

  // 9MOBILE SME & GIFTING
  { productCode: '9GT01', network: '9MOBILE', type: 'SME', size: '5GB', amount: 1850 },
  { productCode: '9GT02', network: '9MOBILE', type: 'SME', size: '10GB', amount: 3700 },
  { productCode: '9GT03', network: '9MOBILE', type: 'GIFTING', size: '2GB', amount: 1050 },
  { productCode: '9GT04', network: '9MOBILE', type: 'GIFTING', size: '3GB', amount: 1300 },
  { productCode: '9GT05', network: '9MOBILE', type: 'GIFTING', size: '4.5GB', amount: 1740 },
];
