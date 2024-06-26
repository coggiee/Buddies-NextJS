import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import GoogleProvider from 'next-auth/providers/google';
import {
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import { auth } from '@/config/firebase';

const authOptions = NextAuth({
  // adapter: FirestoreAdapter(firestore) as Adapter,
  providers: [
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_REST_KEY!,
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_SECRET_KEY!,
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      (session as { accessToken: unknown }).accessToken = token.accessToken;
      session.user.id = token.id || token.sub;
      (session as { provider: unknown }).provider = token.provider;
      return session;
    },
    // idToken is only available in signIn callbacks
    async signIn({ user, account, profile, email, credentials }) {
      const provider = account?.provider;
      if (provider === 'google') {
        try {
          const googleCredential = GoogleAuthProvider.credential(
            account?.id_token
          );
          const userCredential = await signInWithCredential(
            auth,
            googleCredential
          ).catch((error) => {
            console.log('error: ', error);
            return false;
          });
          return userCredential ? true : false;
        } catch (error) {
          console.log('error: ', error);
          return false;
        }
      }
      return true;
    },
  },
});

export { authOptions as GET, authOptions as POST, authOptions };
