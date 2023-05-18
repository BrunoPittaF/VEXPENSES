import styled, { css } from 'styled-components';

interface IContainerCardProps {
  mode: 'card' | 'button';
}
const colors = ['#215990', '#019F1B', '#CD0202', '#242424'];
let randomColorEven, randomColorOdd;

do {
  randomColorEven = colors[Math.floor(Math.random() * colors.length)];
  randomColorOdd = colors[Math.floor(Math.random() * colors.length)];
} while (randomColorEven === randomColorOdd);

export const ContainerCard = styled.div<IContainerCardProps>`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.4rem 1rem;
  gap: 0.6rem;
  height: 75px;

  &:nth-child(even) {
    span {
      background-color: ${randomColorEven};
    }
  }
  &:nth-child(odd) {
    span {
      background-color: ${randomColorOdd};
    }
  }

  span {
    display: flex;
    align-items: baseline;
    border-radius: 100%;
    width: 36px;
    height: 36px;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 500;
    font-size: 1.3rem;
  }

  p {
    font-size: 1rem;
    text-transform: capitalize;
  }

  ${({ mode }) => css`
    ${mode === 'button' &&
    css`
      img {
        padding: 2px 4px;
        border-radius: 100%;
        width: 24px;
        height: 24px;
      }
      p {
        color: #215990;
      }
    `}

    ${mode === 'card' &&
    css`
      img {
        padding: 2px 4px;
        border-radius: 100%;
        width: 24px;
        height: 24px;
      }

      p {
        color: black;
      }

      .action-button {
        margin-left: auto;
        position: relative;
      }
    `}
  `}
`;

export const FloatingMenu = styled.div`
  position: absolute;
  top: -7px;
  right: 30px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
  border-radius: 4px;
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;

    li {
      border-bottom: 1px solid black;
      width: 100%;
      font-size: 1.2rem;
      padding: 6px;

      &:last-of-type {
        border: none;
      }
    }
  }
`;
