import styled, { css } from 'styled-components';

interface IContainerCardProps {
  mode: 'card' | 'button'
}

export const ContainerCard = styled.div<IContainerCardProps>`
    display: flex;
    align-items: center;
    padding: 0.4rem 1rem;
    gap: 0.6rem;

    span {
      display: flex;
      align-items: baseline;
      border-radius: 100%;
      width: 36px;
      height: 36px;
      background-color: red;
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
    ${mode === 'card' && css`

      img {
        padding: 2px 4px;
        border-radius: 100%;
        width: 24px;
        height: 24px;
      }

      p {
        
       color: black;
      }
    
    `}  

      ${mode === 'button' && css`
      img {
        padding: 2px 4px;
        border-radius: 100%;
        width: 24px;
        height: 24px;
      }

      p {
        
      color: blue;
      }
    
      `} 
  `}
`;
