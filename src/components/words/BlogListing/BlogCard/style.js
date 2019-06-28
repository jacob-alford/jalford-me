import styled from "styled-components";
import { constants } from "../../../../theme";

export const StyledBlogCard = styled.div`
  .title{
    font-weight:bold;
  }
  .date{
    color:${constants.mutedGrey};
  }
  .link{
    color:${constants.mutedGrey};
    cursor:pointer;
  }
`;
