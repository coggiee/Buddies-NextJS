'use client';

import React, { useContext, useEffect } from 'react';
import { useAuth } from '../AuthProvider';
import Login from './Login';
import Image from 'next/image';
import service_title from '/public/service_title_black.svg';
import bomi from '/public/bomi.svg';
import BackgroundCircles from './BackgroundCircles';
import CharacterCarousel from './CharacterCarousel';
import Logo from '../UI/Logo';

type Props = {};

import { useUser, withUser, withUserTokenSSR } from 'next-firebase-auth';

export default function LoginSection({}: Props) {
  useEffect(() => {
    const kakaoSDK = document.createElement('script');
    kakaoSDK.async = false;
    kakaoSDK.src = `https://t1.kakaocdn.net/kakao_js_sdk/2.3.0/kakao.min.js`;
    kakaoSDK.integrity = `sha384-70k0rrouSYPWJt7q9rSTKpiTfX6USlMYjZUtr1Du+9o4cGvhPAWxngdtVZDdErlh`;
    kakaoSDK.crossOrigin = `anonymous`;
    document.head.appendChild(kakaoSDK);

    const onLoadKakaoAPI = () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
        console.log('after Init: ', window.Kakao.isInitialized());
      }
    };

    kakaoSDK.addEventListener('load', onLoadKakaoAPI);
  }, []);

  return (
    <div className='w-screen h-screen relative flex flex-col justify-between overflow-hidden'>
      <div className='flex flex-col items-start'>
        <div className='flex flex-col items-start justify-between gap-8 pt-5 pl-6 md:gap-12'>
          <Logo serviceTitle={service_title} isHome={false} />
          <div className='flex flex-col items-start gap-6 md:gap-8'>
            <div className='font-PyeongChangPeace text-3xl md:text-6xl'>
              <p className='font-light'>Find your</p>
              <p className='font-bold'>
                own secret
                <br />
                planet
              </p>
            </div>
            <div className='text-[#444444] text-sm md:text-lg'>
              나의 친구, 버디와 함께{' '}
              <span className='font-bold'>
                차곡차곡 쌓이는 <br />
                이야기로 나만의 행성
              </span>
              을 만들어보세요!
            </div>
          </div>
        </div>
      </div>
      <CharacterCarousel />
      <Login />
      <BackgroundCircles />
    </div>
  );
}
