import { useRouteError } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = (): JSX.Element => {
  const error = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops! Page not found!</h1>
      <Link to={`/`}>Go back!</Link>
    </div>
  );
};

export default ErrorPage;
