import React from 'react';
import { fireEvent, getByTestId ,render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserGuidelines from '../pages/UserGuideline';
import { act } from 'react-test-renderer';

describe('Application frontend terms and conditions', () => {

    test('renders the /TermsAndConditions page', () => {
        render(
        <BrowserRouter>
            <UserGuidelines />
        </BrowserRouter>
        );

    expect(screen.getByTestId('userguideline-content'))
    .toBeInTheDocument();
    expect(screen.queryByText('User Guidelines'))
    .toBeInTheDocument();
});

    test('able to change content', async () => {
        render(
            <BrowserRouter>
                <UserGuidelines />
            </BrowserRouter>
        );

        const firstScreen = screen.getByRole('button');
        await act(async () => {
            await fireEvent.click(firstScreen);
        });
        expect(screen.queryByText('Entering your destination'))
        .toBeInTheDocument()

        const nextScreen = screen.getByRole('button', { name: "Next" });
        await act(async () => {
            await fireEvent.click(nextScreen);
        });
        expect(screen.queryByText('Selecting your search filters'))
        .toBeInTheDocument()
        
        const nextScreen2 = screen.getByRole('button', { name: "Next" });
        await act(async () => {
            await fireEvent.click(nextScreen2);
        });
        expect(screen.queryByText('Selecting your travelling mode'))
        .toBeInTheDocument()

        const nextScreen3 = screen.getByRole('button', { name: "Next" });
        await act(async () => {
            await fireEvent.click(nextScreen3);
        });
        expect(screen.queryByText('Selecting your route'))
        .toBeInTheDocument()

        const nextScreen4 = screen.getByRole('button', { name: "Next" });
        await act(async () => {
            await fireEvent.click(nextScreen4);
        });
        expect(screen.queryByText('Managing your navigation'))
        .toBeInTheDocument()

        const nextScreen5 = screen.getByText('Done', { selector: "span" });
        await act(async () => {
            await fireEvent.click(nextScreen5);
        });

        expect(window.location.pathname).toEqual('/home');

    })
});