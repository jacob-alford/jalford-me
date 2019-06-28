import styled from "styled-components";
import { constants } from "../../../../theme/index.js";

export const StyledBlogInline = styled.div`
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
