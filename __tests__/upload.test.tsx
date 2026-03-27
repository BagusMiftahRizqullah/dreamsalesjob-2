import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BlogForm } from '@/components/admin/BlogForm';
import { POST } from '@/app/api/upload/image/route';
import { NextRequest } from 'next/server';

// Mock the Next.js router and dynamic imports
jest.mock('next/dynamic', () => () => {
  const DynamicComponent = () => <div data-testid="mock-quill-editor" />;
  return DynamicComponent;
});

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe('Image Upload Functionality', () => {
  describe('API Endpoint: /api/upload/image', () => {
    it('should reject requests without a file', async () => {
      const formData = new FormData();
      
      const req = new NextRequest('http://localhost:3000/api/upload/image', {
        method: 'POST',
        body: formData,
      });

      const response = await POST(req);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data.error).toBe('No file uploaded');
    });

    it('should reject invalid file types', async () => {
      const formData = new FormData();
      // Mocking a PDF file which is not allowed
      const file = new File(['dummy content'], 'document.pdf', { type: 'application/pdf' });
      formData.append('file', file);
      
      const req = new NextRequest('http://localhost:3000/api/upload/image', {
        method: 'POST',
        body: formData,
      });

      const response = await POST(req);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data.error).toContain('Invalid file format');
    });

    it('should reject files exceeding 2MB', async () => {
      const formData = new FormData();
      
      // Create a fake large file (> 2MB)
      const largeContent = new Array(3 * 1024 * 1024).fill('a').join('');
      const file = new File([largeContent], 'large.jpg', { type: 'image/jpeg' });
      formData.append('file', file);
      
      const req = new NextRequest('http://localhost:3000/api/upload/image', {
        method: 'POST',
        body: formData,
      });

      const response = await POST(req);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data.error).toContain('File size exceeds 2MB limit');
    });
  });

  describe('BlogForm Image Upload UI', () => {
    const mockOnSuccess = jest.fn();
    const mockOnCancel = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should render the drag and drop area for Featured Image', () => {
      render(<BlogForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
      
      expect(screen.getByText('Featured Image')).toBeInTheDocument();
      expect(screen.getByText('Upload a file')).toBeInTheDocument();
      expect(screen.getByText('or drag and drop')).toBeInTheDocument();
      expect(screen.getByText('PNG, JPG, GIF, WEBP up to 2MB')).toBeInTheDocument();
    });

    it('should display file size error alert for large files in UI', async () => {
      const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
      
      render(<BlogForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
      
      const fileInput = screen.getByLabelElement(/Upload a file/i);
      
      // Create a fake large file (> 2MB)
      const largeContent = new Array(3 * 1024 * 1024).fill('a').join('');
      const largeFile = new File([largeContent], 'large.jpg', { type: 'image/jpeg' });

      fireEvent.change(fileInput, { target: { files: [largeFile] } });

      await waitFor(() => {
        expect(alertMock).toHaveBeenCalledWith('File size exceeds 2MB limit.');
      });
      
      alertMock.mockRestore();
    });

    it('should display format error alert for invalid file types in UI', async () => {
      const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
      
      render(<BlogForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
      
      const fileInput = screen.getByLabelElement(/Upload a file/i);
      
      const invalidFile = new File(['dummy'], 'doc.pdf', { type: 'application/pdf' });

      fireEvent.change(fileInput, { target: { files: [invalidFile] } });

      await waitFor(() => {
        expect(alertMock).toHaveBeenCalledWith('Invalid file format. Only JPG, PNG, GIF, and WEBP are allowed.');
      });
      
      alertMock.mockRestore();
    });
  });
});
