import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button[type="button"] {
    font-weight: bold;
    font-size: 1.25rem;
  }

  button[type="submit"] {
    color: #fff;
    background-color: #2842ac;
    padding: 0.5rem 0.75rem;
    border-radius: 1rem;
  }

  h1 {
    font-size: 1.8rem;
    margin: 0;
  }
`;


export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .photo-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    .photo {
  margin-top: 2rem;
  background-color: #161689;
  width: 90px;
  height: 90px;
  border-radius: 100%;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: center;


  input {
    opacity: 0;
    position: absolute;
    z-index: -1;
  }

  label {
    cursor: pointer;
  }

}

label {
  color: #215990;
  font-size: 0.85rem;
}
  }

`;


export const Form = styled.form`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  .photo {
    label + div {
      width: 0px;
    }
  }

  


`;


export const ButtonRemove = styled.button`
    position: absolute;
    left: 3px;
    top: 34%;


`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 160px;
    height: 160px;
    border-radius: 100%;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
  }

  button {
    margin-top: 1rem;
  }

`;