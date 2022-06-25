import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { auth } from '../config/firebase';

export function useAuthentication() {
  const [user, setUser] = useState<User | null>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
        setIsLoading(false);
      } else {
        // User is signed out
        setUser(null);
        setIsLoading(false);
      }
    });

    return unsubscribeFromAuthStatusChanged;
  }, []);

  return {
    user,
    isLoading,
  };
}
