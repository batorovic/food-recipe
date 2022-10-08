import { Pages } from "./pages/Pages";
import { Category } from "./components/Category";
import { BrowserRouter, Link } from "react-router-dom";
import { Search } from "./components/Search";
import styled from "styled-components";
import { GiKnifeFork } from "react-icons/gi";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav>
          <div className="logo">
            <GiKnifeFork />
            <Logo to={`/`}>recipess</Logo>
          </div>
          <SignDiv>
            <SignLink to={"/signin"}>Sign in</SignLink>
            <span>/</span>
            <SignLink>Sign up</SignLink>
          </SignDiv>
        </Nav>
        <Search />
        <Category />
        <Pages />
      </BrowserRouter>
    </div>
  );
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
`;

const Nav = styled.div`
  padding: 3rem 0rem;
  display: flex;
  /* justify-content: flex-start; */
  justify-content: space-between;
  align-items: center;
  svg {
    font-size: 2rem;
  }
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SignLink = styled(Link)`
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0rem 0.5rem;
  &:hover {
    color: #dc930b;
  }
`;

const SignDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;
