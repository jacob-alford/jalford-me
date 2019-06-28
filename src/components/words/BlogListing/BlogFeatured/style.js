import styled from "styled-components";
import { constants } from "../../../../theme";

export const StyledBlogFeatured = styled.div`
  .title{

  }
  .author{
    font-size:1.25rem;
  }
  .date{
    font-weight:bold;
  }
  .link{
    color:${constants.mutedGrey};
    cursor:pointer;
  }
`;
