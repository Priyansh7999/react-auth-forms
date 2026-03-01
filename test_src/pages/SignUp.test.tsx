import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { MemoryRouter } from "react-router-dom"
import SignUp from "../../src/pages/SignUp.tsx"
import {userEvent} from '@testing-library/user-event'
import { registerUser } from '../../src/services/userService.ts'
import { toast } from 'react-hot-toast'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => ({
    ...await vi.importActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}))
vi.mock('react-hot-toast', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    }
}))
vi.mock('../../src/services/userService.ts', () => ({
    registerUser: vi.fn(),
}))
const renderSignUp = () => {
    render(
        <MemoryRouter>
            <SignUp />
        </MemoryRouter>
    )
}


describe('Sign Up Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    })

    test('ShouldRenderAllFormFields', () => {
        renderSignUp()
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
    })


    test('ShouldShowErrorsWhenFormIsSubmittedEmpty', async () => {
        const user = userEvent.setup()
        renderSignUp()
        await user.click(screen.getByRole('button', { name: /sign up/i }))
        expect(await screen.findByText('Name is required')).toBeInTheDocument()
        expect(await screen.findByText('Email is required')).toBeInTheDocument()
        expect(await screen.findByText('Password is required')).toBeInTheDocument()
        expect(await screen.findByText('Confirm Password is required')).toBeInTheDocument()
    })

    test('ShouldShowErrorWhenNameIsLessThen3Characters', async () => {
        const user = userEvent.setup();
        renderSignUp()

        await user.type(screen.getByLabelText('Name'), 'pr')
        await user.click(screen.getByRole('button', { name: 'Sign Up' }))
        expect(await screen.findByText('name must be at least 3 characters')).toBeInTheDocument()
    })

    test('ShouldShowErrorForInvalidEmail', async () => {
        const user = userEvent.setup()
        renderSignUp()

        await user.type(screen.getByLabelText('Email'), 'priyansh')
        await user.click(screen.getByRole('button', { name: 'Sign Up' }))
        expect(await screen.findByText('Invalid email')).toBeInTheDocument()
    })

    test('ShouldShowErrorWhenPasswordLessThen8characters', async () => {
        const user = userEvent.setup()
        renderSignUp()

        await user.type(screen.getByLabelText('Password'), 'priyans')
        await user.click(screen.getByRole('button', { name: 'Sign Up' }))
        expect(await screen.findByText('Minimum 8 characters')).toBeInTheDocument()

    })

    test('ShouldShowErrorWhenPasswordsDonotMatch', async () => {
        const user = userEvent.setup()
        renderSignUp()

        await user.type(screen.getByLabelText('Password'), 'priyansh')
        await user.type(screen.getByLabelText('Confirm Password'), 'PRIYANSH')
        await user.click(screen.getByRole('button', { name: 'Sign Up' }))
        expect(await screen.findByText('Passwords must match')).toBeInTheDocument()
    })

    test('ShouldCallRegisterUserWithCorrectDataOnValidSubmit', async () => {
        const user = userEvent.setup();
        (registerUser as any).mockResolvedValue({ message: 'success' })
        renderSignUp()

        await user.type(screen.getByLabelText('Name'), 'Priyansh Saxena')
        await user.type(screen.getByLabelText('Email'), 'priyansh@gmail.com')
        await user.type(screen.getByLabelText('Password'), 'Priyansh@123')
        await user.type(screen.getByLabelText('Confirm Password'), 'Priyansh@123')
        await user.click(screen.getByRole('button', { name: 'Sign Up' }))
        await waitFor(() => {
            expect(registerUser).toHaveBeenCalledWith({
                name: 'Priyansh Saxena',
                email: 'priyansh@gmail.com',
                password: 'Priyansh@123',
            })
            expect(toast.success).toHaveBeenCalledWith('Registration successful! Please sign in.')
            expect(mockNavigate).toHaveBeenCalledWith('/sign-in')
        })
    })


    test('ShouldNavigateToSignInWhenSignInIsClicked', async () => {
        const user = userEvent.setup();
        renderSignUp()
        await user.click(screen.getByText('Sign In'))
        expect(mockNavigate).toHaveBeenCalledWith('/sign-in')
    })

    test('should show error toast when API fails', async () => {
        const user = userEvent.setup();
        (registerUser as any).mockRejectedValue(new Error('Email already exists'))
        renderSignUp()

        await user.type(screen.getByLabelText('Name'), 'Priyansh Saxena')
        await user.type(screen.getByLabelText('Email'), 'priyansh@gmail.com')
        await user.type(screen.getByLabelText('Password'), 'Priyansh@123')
        await user.type(screen.getByLabelText('Confirm Password'), 'Priyansh@123')
        await user.click(screen.getByRole('button', { name: 'Sign Up' }))
        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Email already exists')
        })
    })

    test('should show generic error toast when unknown error occurs', async () => {
        const user = userEvent.setup();
        (registerUser as any).mockRejectedValue('something went wrong')
        renderSignUp()
        await user.type(screen.getByLabelText('Name'), 'Priyansh Saxena')
        await user.type(screen.getByLabelText('Email'), 'priyansh@gmail.com')
        await user.type(screen.getByLabelText('Password'), 'Priyansh@123')
        await user.type(screen.getByLabelText('Confirm Password'), 'Priyansh@123')
        await user.click(screen.getByRole('button', { name: 'Sign Up' }))
        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('An error occurred during registration')
        })
    })
})