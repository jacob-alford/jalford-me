import styled from "styled-components";
import { constants } from "../../../../theme/index.js";

export const StyledBlogInline = styled.div`
  .listing{
    margin-top:15px;
    padding:15px;
  }
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
