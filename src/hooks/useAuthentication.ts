import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { setUser } from '../features/userSlice';
import firebaseManager from '../firebase';
import { useAppDispatch, useAppSelector } from './redux';

export function useAuthentication() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    const onAuthSuccess = (user: User) => {
      dispatch(setUser(user.toJSON() as User));
      setIsLoading(false);
    };
    const onAuthError = (user: null) => {
      dispatch(setUser(user));
      setIsLoading(false);
    };
    const unsubscribeFromAuthStatusChanged = firebaseManager.authChangeListener(
      onAuthSuccess,
      onAuthError
    );

    return unsubscribeFromAuthStatusChanged;
  }, [dispatch]);

  return {
    user,
    isLoading,
  };
}
