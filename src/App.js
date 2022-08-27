import styled from 'styled-components';
import AppRouter from './components/AppRouter';
import Footer from './components/UI/Footer';
import Header from './components/UI/Header';
import './styles/App.css';
import { gap } from './styles/mixins';

const Container = styled.div`
  padding: 50px 15px 80px;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  ${gap("10px")}
  @media screen and (max-width: 600px){
    &{
      padding: 0;
      ${gap("0")}
    }
  }
`;
const Content = styled.main`
  background: var(--color-white);
  border-radius: 15px;
  box-shadow: 0 0 10px var(--color-white-shadow);
  overflow: hidden;
  @media screen and (max-width: 600px){
    &{
      border-radius: 0;
      box-shadow: 0 0 0 var(--color-white-shadow);
    }  
  }
`;

function App() {
  return (
    <Container className='container'>
      <Header/>
      <Content>
        <AppRouter/>
      </Content>
      <Footer/>
    </Container>
  );
}

export default App;