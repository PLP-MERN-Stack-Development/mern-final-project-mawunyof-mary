const { render, screen, fireEvent, waitFor } = require('@testing-library/react');
require('@testing-library/jest-dom');
const axios = require('axios');
const React = require('react');
const BugForm = require('../BugForm');

jest.mock('axios');

describe('BugForm Component', () => {
  const mockOnBugCreated = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form with all fields', () => {
    render(React.createElement(BugForm, { onBugCreated: mockOnBugCreated }));
    
    expect(screen.getByTestId('bug-title')).toBeInTheDocument();
    expect(screen.getByTestId('bug-description')).toBeInTheDocument();
    expect(screen.getByTestId('reporter-email')).toBeInTheDocument();
  });

  test('shows validation errors on empty submit', async () => {
    render(React.createElement(BugForm, { onBugCreated: mockOnBugCreated }));
    
    fireEvent.click(screen.getByText(/report bug/i));
    
    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    });
  });

  test('shows error for short description', async () => {
    render(React.createElement(BugForm, { onBugCreated: mockOnBugCreated }));
    
    fireEvent.change(screen.getByTestId('bug-title'), { target: { value: 'Test' } });
    fireEvent.change(screen.getByTestId('bug-description'), { target: { value: 'Short' } });
    fireEvent.change(screen.getByTestId('reporter-email'), { target: { value: 'test@test.com' } });
    
    fireEvent.click(screen.getByText(/report bug/i));
    
    await waitFor(() => {
      expect(screen.getByText(/description must be at least 10 characters/i)).toBeInTheDocument();
    });
  });

  test('submits form with valid data', async () => {
    axios.post.mockResolvedValue({
      data: { success: true, data: { _id: '123', title: 'Test Bug' } }
    });

    render(React.createElement(BugForm, { onBugCreated: mockOnBugCreated }));
    
    fireEvent.change(screen.getByTestId('bug-title'), { target: { value: 'Test Bug' } });
    fireEvent.change(screen.getByTestId('bug-description'), { target: { value: 'This is a valid test description' } });
    fireEvent.change(screen.getByTestId('reporter-email'), { target: { value: 'test@example.com' } });
    
    fireEvent.click(screen.getByText(/report bug/i));
    
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });
  });

  test('shows error message on API failure', async () => {
    axios.post.mockRejectedValue({
      response: { data: { message: 'Server error' } }
    });

    render(React.createElement(BugForm, { onBugCreated: mockOnBugCreated }));
    
    fireEvent.change(screen.getByTestId('bug-title'), { target: { value: 'Test' } });
    fireEvent.change(screen.getByTestId('bug-description'), { target: { value: 'Valid description here' } });
    fireEvent.change(screen.getByTestId('reporter-email'), { target: { value: 'test@test.com' } });
    
    fireEvent.click(screen.getByText(/report bug/i));
    
    await waitFor(() => {
      expect(screen.getByText(/server error/i)).toBeInTheDocument();
    });
  });
});
