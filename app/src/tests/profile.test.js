import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Profile from '../pages/Profile'
import { act } from 'react-test-renderer';

describe('Application frontend register', () => {

    test('renders the /create page', () => {
        render(
        <BrowserRouter>
            <Profile />
        </BrowserRouter>
        );

    expect(screen.getByTestId('fname-form'))
    .toBeInTheDocument();
    expect(screen.queryByText('Email'))
    .toBeInTheDocument();

    const lastNameFormElement = screen.getByTestId('lname-form')
    const lastNameInput = lastNameFormElement.querySelector('input[type="text"]');
    expect(lastNameInput)
    .toBeInTheDocument()

    const lastNameErrorMessage = lastNameFormElement.querySelector('.error');
    expect(lastNameErrorMessage)
    .toBeNull();

    const emailFormElement = screen.getByTestId('email-form')
    const emailFormInput = emailFormElement.querySelector('input[type="text"]');
    expect(emailFormInput)
    .toBeInTheDocument()

    const emailErrorMessage = emailFormElement.querySelector('.error');
    expect(emailErrorMessage)
    .toBeNull();

    const passwordFormElement = screen.getByTestId('pwd-form')
    const passwordFormInput = passwordFormElement.querySelector('input[type="password"]');
    expect(passwordFormInput)
    .toBeInTheDocument()

    const passwordErrorMessage = passwordFormElement.querySelector('.error');
    expect(passwordErrorMessage)
    .toBeNull();
});
});

    test('submitting a filled form', async () => {

        render(
            <BrowserRouter>
                <Profile />
            </BrowserRouter>
            );
        
        const editButton = screen.getByText('EDIT');
        await act(async () => {
            fireEvent.click(editButton);
        });
            
        const firstNameField = screen.getByTestId('fname-form').querySelector('input[type="text"]');
        fireEvent.change(firstNameField, { target: { value: 'Test' } });

        const lastNameField = screen.getByTestId('fname-form').querySelector('input[type="text"]');
        fireEvent.change(lastNameField, { target: { value: 'Tester' } });

        const emailField = screen.getByTestId('email-form').querySelector('input[type="text"]');
        fireEvent.change(emailField, { target: { value: 'test@example.com' } });

        const passwordField = screen.getByTestId('pwd-form').querySelector('input[type="password"]');
        fireEvent.change(passwordField, { target: { value: 'test123' } });

        const updateButton = screen.getByText('UPDATE');
        await act(async () => {
            fireEvent.click(updateButton);
        });

        expect(editButton)
        .toBeInTheDocument();

        });