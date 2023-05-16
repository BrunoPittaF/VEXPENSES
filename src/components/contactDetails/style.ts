import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  color: blue;
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


`;