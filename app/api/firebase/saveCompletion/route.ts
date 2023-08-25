import { NextRequest, NextResponse } from 'next/server';
import {
  collection,
  doc,
  addDoc,
  serverTimestamp,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import dayjs from 'dayjs';

export async function POST(req: NextRequest) {
  const { completion, uid, prompt } = await req.json();
  const todayDate = dayjs().format('YY-MM-DD');
  const curTime = dayjs().format('HH');
  // const userRef = doc(db, 'Users', res.data.uid);
  // const userSnap = await getDoc(userRef);
  const chatRef = doc(
    db,
    `Users/${uid}/ChatHistory/${todayDate}/${prompt}`,
    curTime
  ); // ChatHistory 컬렉션 가져오고, 날짜로 문서 이름 설정
  const chatSnap = await getDoc(chatRef);

  if (chatSnap.exists()) {
    // 있으면 기존 문서에 대화 기록 추가

    await updateDoc(
      doc(db, `Users/${uid}/ChatHistory/${todayDate}/${prompt}`, curTime),
      {
        gpt: arrayUnion({ content: completion, role: 'assistant' }),
      }
    );
    return NextResponse.json({
      message: 'Firestore Completion Saving SUCCESS!',
    });
  } else {
    await setDoc(
      doc(db, `Users/${uid}/ChatHistory/${todayDate}/${prompt}`, curTime),
      {
        gpt: [
          {
            content: completion,
            role: 'assistant',
          },
        ],
      }
    );
    return NextResponse.json({
      message: 'Firestore Completion Saving SUCCESS!',
    });
  }
}