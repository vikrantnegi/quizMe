import React from 'react';

const NetworkContext = React.createContext<boolean | null>(null);

export const NetWorkStatusProvider = NetworkContext.Provider;
export const NetWorkStatusConsumer = NetworkContext.Consumer;
