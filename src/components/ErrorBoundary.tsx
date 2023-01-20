import { ReactNode, Component } from 'react';
import Page500 from 'src/pages/500';

type Props = {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {

  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error) {
    console.error('Uncaught error:', error);
  }

  public render() {
    if (this.state.hasError) {
      return <Page500 />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
