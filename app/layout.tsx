import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Tokens } from 'next-firebase-auth-edge/lib/auth';
import { UserInfo } from 'firebase/auth';
import { getTokens } from 'next-firebase-auth-edge/lib/next/tokens';
import { cookies } from 'next/headers';
import AuthSession from '../components/AuthSession';
import { Roboto } from 'next/font/google';

const mapTokensToUser = ({ decodedToken }: Tokens): UserInfo => {
  const {
    uid,
    email,
    picture: photoURL,
    email_verified: emailVerified,
    phone_number: phoneNumber,
    name: displayName,
    providerData: providerData,
  } = decodedToken;

  return {
    uid,
    email: email ?? null,
    displayName: displayName ?? null,
    photoURL: photoURL ?? null,
    phoneNumber: phoneNumber ?? null,
    providerId: providerData[0]?.providerId ?? null,
  };
};

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Buddies',
  description: 'Generated by create next app',
};

// RootLayout
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const tokens = await getTokens(cookies(), {
  //   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  //   serviceAccount: {
  //     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
  //     privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KE as string,
  //     clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL as string,
  //   },
  //   cookieName: 'AuthToken',
  //   cookieSignatureKeys: ['secret1', 'secret2'],
  // });

  // const user = tokens ? mapTokensToUser(tokens) : null;
  return (
    <html lang='en' className={`${inter.className} ${roboto.variable}`}>
      <head></head>
      <body >
        {/* <Script
          async
          src='https://t1.kakaocdn.net/kakao_js_sdk/2.3.0/kakao.min.js'
          integrity='sha384-70k0rrouSYPWJt7q9rSTKpiTfX6USlMYjZUtr1Du+9o4cGvhPAWxngdtVZDdErlh'
          crossOrigin='anonymous'
        /> */}
        {/* <AuthProvider defaultUser={user}>{children}</AuthProvider> */}
        <AuthSession>{children}</AuthSession>
      </body>
    </html>
  );
}
