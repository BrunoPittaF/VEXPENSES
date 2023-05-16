
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;


  .input-group {
    position: relative;

    input {
    outline: none;
    padding: 16px;
    border-radius: 6px;
    border: 1px solid gray;
    font-size: 1rem;
    transition: all 0.2s;

    &:focus {
      border-color: blue;

      + label {
        font-size: 0.75rem;
        color: blue;
        transform: translateY(-1.5rem);
        background-color: #fff;
        padding: 0px 5px;
      }
    }
  }
  label {
  position: absolute;
  top: 15px;
  left: 10px;
  font-size: 1rem;
  color: #999;
  transition: all 0.2s;
}
  }



`;
