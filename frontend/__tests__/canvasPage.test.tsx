import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '../app/canvas/page';
import { useCanvasSupportStore } from '../app/store/canvasStore';

// Mock Zustand store
jest.mock('../app/store/canvasStore', () => ({
  useCanvasSupportStore: jest.fn(),
}));

describe('Page Component', () => {
  it('renders Spinner when canvasSupported is null', () => {
    // Mock the Zustand store using mockImplementation
    (useCanvasSupportStore as unknown as jest.Mock).mockImplementation(() => ({
      canvasSupported: null,
      textApiSupported: null,
      toDataUrlSupported: null,
      canvasSignature: null,
      canvasDataUrl: null,
      canvasSizeInBytes: null,
      numberOfColors: null,
      checkSupport: jest.fn(), // Mock checkSupport function
    }));

    // Render the Page component
    render(<Page />);

    // Assert that the Spinner is rendered (assuming it has a role="status")
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
