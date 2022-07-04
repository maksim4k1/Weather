import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { gap } from "../../../styles/mixins";
import { searchCityAction } from "../../../redux/actions/searchCityAction";
import { connect } from "react-redux/es/exports";

const HeaderElement = styled.header`
  min-height: 60px;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-white);
  border-radius: 15px;
  box-shadow: 0 0 10px var(--color-white-shadow);
  overflow: hidden;
  @media screen and (max-width: 600px){
    &{
      padding: 5px 15px 10px;
      flex-flow: column;
      border-radius: 0;
      z-index: 10;
    }  
  }
`;
const Logo = styled.h1`
  color: var(--color-black);
  font-size: 24px;
  font-weight: 600;
  @media screen and (max-width: 600px){
    &{
      font-size: 32px;
    }  
  }
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  ${gap("10px")}
`;
const SearchInput = styled.input`
  max-width: 180px;
  padding: 5px 0;
  border-bottom: 2px solid var(--color-blue);
  &::placeholder{
    color: var(--color-text-gray);
    font-weight: 500;
  }
`;
const SearchButton = styled.button`
  padding: 7px 10px;
  background: var(--color-blue);
  border-radius: 10px;
  color: var(--color-white);
  font-size: 14px;
  font-weight: 600;
`;
const SearchButtonError = styled(SearchButton)`
  background: #ff6868;
`;

function Header ({cityState, searchCity}) {
  const [value, setValue] = useState("");
  const [formData, setFormData] = useState({city: ""});
  useEffect(() => {
    setFormData({
      city: value
    });
  }, [value, setFormData]);
  function onSubmitHandler(event){
    event.preventDefault();
    searchCity(formData.city);
  }
  function onChangeHandler(event){
    setValue(event.target.value);
  }

  return(
    <HeaderElement>
      <NavLink to="/"><Logo>Погода онлайн</Logo></NavLink>
      <Form onSubmit={onSubmitHandler}>
        <SearchInput onChange={onChangeHandler} type="text" placeholder="Город" value={value}/>
        {
          cityState.failing ?
          <SearchButtonError type="submit">Ошибка</SearchButtonError>
          : <SearchButton type="submit">Поиск</SearchButton>
        }
      </Form>
    </HeaderElement>
  );
}

const mapStateToProps = (state) => ({
  cityState: state.city.cityNameState
});
const mapDispatchToProps = {
  searchCity: searchCityAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);