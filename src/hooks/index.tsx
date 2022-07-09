import React from 'react';
import { AuthUserProvider } from './providers/useAuthUser';
import { UidProvider } from './providers/useUid';

const AppProvider: React.FC = ({ children }) => (
    <AuthUserProvider>
        <UidProvider>
            {children}
        </UidProvider>
    </AuthUserProvider>
);

export default AppProvider;