import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;

  &.filled {
    input {
      + label {
          font-size: 0.75rem;
          color: #215990;
          transform: translateY(-1.5rem);
          background-color: #fff;
          padding: 0px 5px;
        }
    }
  }

  svg + .input-group {
    input {
      margin-left: 0;
    }
    label {
      left: 10px;
    }
  }

  .input-group {
    position: relative;
    width: 100%;

    input {
      width: 100%;
      margin-left: 36px;
      outline: none;
      padding: 16px;
      border-radius: 6px;
      border: 1px solid gray;
      font-size: 1rem;
      transition: all 0.2s;
      max-width: -webkit-fill-available;

      &[type='date'] {
        background-color: transparent;
        color: transparent;

        &:active,
        &:focus {
          color: inherit;
        }

        &::-webkit-calendar-picker-indicator {
          display: none;
        }

        &::-webkit-input-placeholder {
          visibility: hidden;
        }

        &::-moz-placeholder {
          visibility: hidden;
        }

        &:-ms-input-placeholder {
          visibility: hidden;
        }

        &::placeholder {
          visibility: hidden;
        }
      }

      &:focus {
        border-color: #215990;

        + label {
          font-size: 0.75rem;
          color: #215990;
          transform: translateY(-1.5rem);
          background-color: #fff;
          padding: 0px 5px;
        }
      }
    }
    label {
      position: absolute;
      top: 18px;
      left: 46px;
      font-size: 1rem;
      color: #999;
      transition: all 0.2s;
    }
  }
`;
