import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { MemoryRouter } from "react-router-dom"
import SignUp from "../../src/pages/SignUp.tsx"
import userEvent from '@testing-library/user-event'

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

    
})