import Head from 'next/head'
import MengenMeisterDemo from '../components/MengenMeisterDemo'

export default function Home() {
  return (
    <>
      <Head>
        <title>MengenMeister Demo</title>
      </Head>
      <main className="min-h-screen bg-gray-50 p-6">
        <MengenMeisterDemo />
      </main>
    </>
  )
}