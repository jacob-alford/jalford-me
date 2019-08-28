import useReactRouter from 'use-react-router';

export default function useRedirect(link){
  const { history } = useReactRouter();
  if(link.includes("http"))
    return () => window.location.href = link;
  else
    return () => history.push(link);
}
