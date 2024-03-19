import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import fetchMock from 'jest-fetch-mock';
import { act } from 'react-test-renderer';

fetchMock.enableMocks();

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: () => mockNavigate,
}));

describe('Application frontend login', () => {

test('renders the landing page', () => {
    render(<App />);

    expect(screen.getByTestId('email-form'))
    .toBeInTheDocument();
    expect(screen.queryByText('Email'))
    .toBeInTheDocument();

    const passwordFormElement = screen.getByTestId('password-form')
    const passwordInput = passwordFormElement.querySelector('input[type="password"]');
    expect(passwordInput)
    .toBeInTheDocument()

    const errorMessage = passwordFormElement.querySelector('.error');
    expect(errorMessage)
    .toBeNull();
});

test('submitting an empty form', async () => {
    render(<App />)

    const submitButtonElement = screen.getByTestId('ArrowForwardIcon')
    fireEvent.click(submitButtonElement)

    await screen.findByText('Email is required')
    await screen.findByText('Password is required')
});

test('submitting a filled form', async () => {

    fetchMock.mockResponseOnce(JSON.stringify("Success"));

    render(<App />);

    const emailField = screen.getByTestId('email-form').querySelector('input[type="text"]');
    fireEvent.change(emailField, { target: { value: 'test@example.com' } });

    const passwordField = screen.getByTestId('password-form').querySelector('input[type="password"]');
    fireEvent.change(passwordField, { target: { value: 'test123' } });

    const formSubmit = screen.getByRole('button');
    await act(async () => {
        await fireEvent.click(formSubmit);
    });

    expect(fetchMock).toHaveBeenCalled();

    expect(mockNavigate).toHaveBeenCalledWith("/home");

    });
});