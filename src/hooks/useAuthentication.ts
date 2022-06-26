import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';

import firebaseManager from '../firebase';

export function useAuthentication() {
  const [user, setUser] = useState<User | null>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const onAuthSuccess = (user: User) => {
      setUser(user);
      setIsLoading(false);
    };
    const onAuthError = (user: null) => {
      setUser(user);
      setIsLoading(false);
    };
    const unsubscribeFromAuthStatusChanged = firebaseManager.authChangeListener(
      onAuthSuccess,
      onAuthError
    );

    return unsubscribeFromAuthStatusChanged;
  }, []);

  return {
    user,
    isLoading,
  };
}
