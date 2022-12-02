import type { NextPage } from 'next'
import UploadForm from '../components/Form/UploadForm'
import Header from '../components/Header'
import Title from '../components/Title'


declare global {
  interface Window {
    ethereum?: any;
  }
}


const Home: NextPage = () => {
  return (
    <>
      <Header/>
      <div className='w-full h-[100vh] grid place-items-center'>
        <div className='h-[200px] grid place-items-center'>
          <Title />
          <UploadForm />
        </div>
         <div className="grid w-[300px]">
        <div>
          Example - 
        </div>
          <div className="flex justify-between mx-4 w-[100%]">
            <span>
              ChainId 
            </span>
            <span>
              DestinationAddress
            </span>
            <span>
              Amount
            </span>
            </div>
          <div className="flex justify-between mx-4 w-[100%]">
            <span>
              21 
            </span>
            <span>
              0xeee
            </span>
            <span>
              100
            </span>
            </div>
          <div className="flex justify-between mx-4 w-[100%]">
            <span>
              21 
            </span>
            <span>
              0xeee
            </span>
            <span>
              100
            </span>
            </div>
        </div>
      </div>
    </>
  )
}

export default Home
