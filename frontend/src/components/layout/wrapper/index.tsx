import React, { ReactNode } from 'react';
import Header from '@/components/layout/header';
import styles from '@/components/layout/wrapper/LayoutWrapper.module.scss';
import classNames from 'classnames/bind';
import Footer from '@/components/layout/footer';
import ButtonBadge from '@/components/common/badge/buttonBadge';

const cx = classNames.bind(styles);

type Props = {
  children: ReactNode;
};

const LayoutWrapper = ({ children }: Props) => {
  return (
    <div className={cx('wrapper-container')}>
      <video
        className={cx('wrapper-inner')}
        autoPlay
        loop
        muted
        playsInline
        width={'100%'}
        height={'100%'}
      >
        <source
          src={'/assets/background.mp4'}
          width={'100%'}
          height={'100%'}
          className={cx('video-source')}
        />
      </video>
      <Header />
      {children}
      <div className={cx('sub-nav-wrapper')}>
        <ButtonBadge type="telegram" url="https://t.me/+hozckWtCuYw4MzVl" />
        <ButtonBadge type="twitter" url="https://x.com/homo_memetus" />
        <ButtonBadge
          type="dexscreener"
          url="https://dexscreener.com/solana/9czr2mvyxgpcndrba7ywaqg3k1fgckcqybwsbkxnmjfs"
        />
      </div>
      <Footer />
    </div>
  );
};

export default LayoutWrapper;
