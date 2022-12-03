import styled from '@emotion/styled';
import type { NextPage } from 'next'
import UploadForm from '../components/Form/UploadForm'
import Header from '../components/Header'
import Title from '../components/Title'


declare global {
  interface Window {
    ethereum?: any;
  }
}

const Wrapper = styled.div`
font: 1em/1.618 Inter, sans-serif;

display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

min-height: 100vh;
padding: 30px;

color: #224;
background:
  url(https://source.unsplash.com/E8Ufcyxz514/2400x1823)
  center / cover no-repeat fixed;
`
const MainContent = styled.div`
max-width: 300px;
min-height: 100vh;
display: flex;
flex-direction: column;
justify-content: space-between;

max-width: 500px;
height: 300px;
padding: 35px;

border: 1px solid rgba(255, 255, 255, .25);
border-radius: 20px;
background-color: rgba(255, 255, 255, 0.45);
box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);

backdrop-filter: blur(15px);
`

const Home: NextPage = () => {
  return (
    <Wrapper>
      <Header/>
      <MainContent>
        <div className='w-full h-[100vh] grid place-items-center'>
          <div className='h-[300px] grid place-items-center'>
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
      </MainContent>
    </Wrapper>
  )
}

export default Home
