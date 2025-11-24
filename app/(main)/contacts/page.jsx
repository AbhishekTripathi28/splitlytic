import MainPage from '@/components/contacts-page/MainPage'
import React, { Suspense } from 'react'
import { BarLoader } from 'react-spinners'

function page() {
  return (
    <Suspense fallback={<BarLoader width={"100%"} color="#36d7b7"/>}>
        <MainPage/>
    </Suspense>
  )
}

export default page