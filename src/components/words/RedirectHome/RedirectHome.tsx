import useRedirect from 'components/bindings/utilityHooks/useRedirect';

const RedirectHome = () => {
  const redirect = useRedirect('/') as () => void;
  redirect();
  return null;
};

export default RedirectHome;
