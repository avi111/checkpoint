import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Container} from '@mui/material';

import {Header} from "./Layout/Header.tsx";
import {MovieGrid} from "./components/MovieGrid";

const queryClient = new QueryClient();

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Container>
                    <Header />
                    <Routes>
                        <Route path="/" element={<MovieGrid/>}/>
                    </Routes>
                </Container>
            </Router>
        </QueryClientProvider>
    );
};

export default App;