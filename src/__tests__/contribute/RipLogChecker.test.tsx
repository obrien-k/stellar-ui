import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../testUtils';
import RipLogChecker from '../../components/contribute/RipLogChecker';
import LogCheckResult from '../../components/contribute/LogCheckResult';
import type { LogCheckResult as Result } from '../../store/services/logApi';

const mockCheckLog = jest.fn();
let mockState: { data?: Result; isLoading: boolean; error?: unknown };

jest.mock('../../store/services/logApi', () => ({
  useCheckLogMutation: () => [mockCheckLog, { ...mockState, reset: jest.fn() }]
}));

beforeEach(() => {
  mockCheckLog.mockClear();
  mockState = { isLoading: false };
});

describe('RipLogChecker', () => {
  it('disables the button until a log is entered, then submits it', () => {
    renderWithProviders(<RipLogChecker />);

    const button = screen.getByRole('button', { name: /check log/i });
    expect(button).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/rip log/i), {
      target: { value: 'Exact Audio Copy V1.3 ...' }
    });
    expect(button).toBeEnabled();

    fireEvent.click(button);
    expect(mockCheckLog).toHaveBeenCalledWith({
      log: 'Exact Audio Copy V1.3 ...'
    });
  });

  it('renders a perfect score with the Perfect badge', () => {
    mockState = {
      isLoading: false,
      data: {
        ripper: 'EAC',
        version: '1.3',
        score: 100,
        isPerfect: true,
        deductions: []
      }
    };
    renderWithProviders(<RipLogChecker />);

    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Perfect')).toBeInTheDocument();
  });

  it('lists deduction messages for an imperfect score', () => {
    mockState = {
      isLoading: false,
      data: {
        ripper: 'XLD',
        version: '20161007',
        score: 70,
        isPerfect: false,
        deductions: [
          { message: 'CRC mismatch on track 1, -30 points', points: 30 }
        ]
      }
    };
    renderWithProviders(<RipLogChecker />);

    expect(screen.getByText('70')).toBeInTheDocument();
    expect(screen.queryByText('Perfect')).not.toBeInTheDocument();
    expect(screen.getByText(/CRC mismatch on track 1/)).toBeInTheDocument();
  });
});

describe('LogCheckResult', () => {
  it('shows an error message for an unrecognized log', () => {
    const result: Result = {
      ripper: null,
      version: null,
      score: 0,
      isPerfect: false,
      deductions: [{ message: 'Unrecognized log format.', points: 0 }]
    };
    renderWithProviders(<LogCheckResult result={result} />);

    expect(screen.getByText(/Unrecognized log format/)).toBeInTheDocument();
  });
});
