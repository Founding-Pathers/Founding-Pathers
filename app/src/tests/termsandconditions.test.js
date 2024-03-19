import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TermsAndConditions from '../pages/TermsAndConditions';

describe('Application frontend terms and conditions', () => {

    test('renders the /TermsAndConditions page', () => {
        render(
        <BrowserRouter>
            <TermsAndConditions />
        </BrowserRouter>
        );

    expect(screen.getByTestId('tnc-content'))
    .toBeInTheDocument();
    expect(screen.queryByText('Terms and Conditions'))
    .toBeInTheDocument();
});
});