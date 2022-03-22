import React from 'react';
import Box from '@mui/material/Box';
import HomeContent from '../../components/HomeContent';
import HomeHeader from '../../components/HomeHeader';

export function HomePage() {
    return (
        <Box sx={{ w: 1 }}>
            <HomeHeader />
            <HomeContent />
        </Box>
    );
}
