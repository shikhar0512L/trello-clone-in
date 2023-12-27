import Board from "@/components/Board";
import Header from "@/components/Header";
import Login from "@/components/Login";
// import { useRouter } from 'next/router';
import value from '@/components/Login'

export default function Home() {
  return (
    <main>
      {/* <Login/> */}
<Header/>
<Board/>
    </main>
  );
};