// App.tsx
import React from 'react';
import './globals.css';
import Providers from './providers';

const App: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div lang="en">
            <Providers>
                {children}
            </Providers>
        </div>
    );
};

export default App;
