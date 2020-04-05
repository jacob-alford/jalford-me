import styled from 'styled-components';

import { themeSelect } from 'theme';

const [link, hover] = themeSelect(['getLinkColor', 'getLinkHover']);

export const StyledSocialIcon = styled.div`
  .icon {
    margin: 10px;
    width: 35px;
    height: 35px;
    color: white;
  }
  .iconHolder {
    margin: 20px 15px 20px;
    border-radius: 50%;
    background-color: ${link};
    transition: background 0.25s;
  }
  .iconHolder:hover {
    background-color: ${hover};
  }
`;
