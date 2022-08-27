import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { gap } from "../../../styles/mixins";
import SettingsIcon from "../../../assets/icons/SettingsIcon";
import { saveCityAction } from "../../../redux/actions/cityAction";
import { connect } from "react-redux/es/exports";

const FooterElement = styled.footer`
  min-height: 60px;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-white);
  border-radius: 15px;
  box-shadow: 0 0 10px var(--color-white-shadow);
`;
const SettingsButton = styled.button`
  width: 90px;
  height: 30px;
  display: flex;
  align-items: center;
  ${gap("5px")}
  border-radius: 50%;
  font-size: 14px;
  font-weight: 600;
  &>div>svg{
    transition: transform 0.5s;
  }
  &:hover{
    &>div>svg{
      transform: rotateZ(90deg);
    }
  }
`;
const ButtonIcon = styled.div`
  width: 25px;
  height: 25px;
`;
const Logo = styled.h1`
  color: var(--color-black);
  font-size: 24px;
  font-weight: 600;
  @media screen and (max-width: 600px){
    display: none;
  }
`;
const Author = styled.div`
  width: 90px;
  display: flex;
  flex-flow: column;
`;
const AuthorTitle = styled.h6`
  color: var(--color-text-gray);
  font-size: 12px;
`;
const Link = styled.a`
  color: var(--color-black);
  font-weight: 600;
  &:hover{
    text-decoration: underline;
  }
`;
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0,0,0,0.5);
  z-index: 100;
  transition: opacity 0.4s, visibility 0.4s;
  opacity: 0;
  visibility: hidden;
  &.active{
    opacity: 1;
    visibility: visible;
  }
`;
const ModalWindow = styled.div`
  max-width: 350px;
  padding: 20px 30px;
  margin: 100px auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-white);
  border-radius: 15px;
  box-shadow: 0 0 10px var(--color-black-shadow);
  transition: opacity 0.4s, visibility 0.4s, transform 0.4s;
  opacity: 0;
  visibility: hidden;
  &.active{
    opacity: 1;
    visibility: visible;
    transform: translateY(30px);
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  ${gap("15px")}
`;
const InfoText = styled.p`
  font-size: 12px;
  text-align: center;
`;
const Input = styled.input`
  width: 100%;
  padding: 5px 0;
  border-bottom: 2px solid var(--color-blue);
  &::placeholder{
    color: var(--color-text-gray);
    font-weight: 500;
  }
`;
const SaveButton = styled.button`
  padding: 7px 10px;
  background: var(--color-blue);
  border-radius: 10px;
  color: var(--color-white);
  font-size: 14px;
  font-weight: 600;
`;
const SaveButtonLoading = styled(SaveButton)`
  background: var(--color-text-gray);
`;
const SaveButtonError = styled(SaveButton)`
  background: #ff6868;
`;

function Footer ({savedCityState, savedCityName, saveCity}) {
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = useState(savedCityName);
  const [formData, setFormData] = useState({city: ""});

  useEffect(() => {
    setFormData({
      city: value
    });
  }, [value, setFormData]);
  function onClickHandler(event){
    if(event.currentTarget === event.target){
      setOpenModal(false);
    }
  }
  function onSubmitHandler(event){
    event.preventDefault();
    saveCity(formData.city);
    if(savedCityState.success){
      setOpenModal(false);
    }
  }
  function onChangeHandler(event){
    setValue(event.target.value);
    savedCityState.failing = false;
  }

  return(
    <>
      <FooterElement>
        <SettingsButton type="button" onClick={() => setOpenModal(!openModal)}>
          <ButtonIcon>
            <SettingsIcon/>
          </ButtonIcon>
          <div>настройки</div>
        </SettingsButton>
        <NavLink to="/"><Logo>Погода онлайн</Logo></NavLink>
        <Author>
          <AuthorTitle>Author</AuthorTitle>
          <Link href="https://maksim4k1.github.io/Maksim-Bazhenov/" target="_blank">maksim4k1</Link>
        </Author>
      </FooterElement>
      <Modal className={openModal ? "active" : ""} onClick={onClickHandler}>
        <ModalWindow className={openModal ? "active" : ""}>
          <Form onSubmit={onSubmitHandler}>
            <Input type="text" placeholder="Город" onChange={onChangeHandler} value={value}/>
            <InfoText>Введите название города, в которым вы живёте, чтобы при входе в приложение по умолчанию была показана погода именно в вашем городе!</InfoText>
            {
            savedCityState.failing ? <SaveButtonError disabled>Ошибка</SaveButtonError>
            : savedCityState.loading ? <SaveButtonLoading disabled>Загрузка...</SaveButtonLoading>
            : <SaveButton type="submit">Сохранить</SaveButton>
            }
          </Form>
        </ModalWindow>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({
  savedCityState: state.city.savedCityNameState,
  savedCityName: state.city.savedCityName
});
const mapDispatchToProps = {
  saveCity: saveCityAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);