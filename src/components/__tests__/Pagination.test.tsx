import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination, PaginationInfo } from '../Pagination';

const mockPagination: PaginationInfo = {
  page: 2,
  limit: 25,
  totalCount: 100,
  totalPages: 4,
  hasNextPage: true,
  hasPreviousPage: true,
};

const mockOnPageChange = jest.fn();
const mockOnLimitChange = jest.fn();

describe('Pagination', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders pagination info correctly', () => {
    render(
      <Pagination
        pagination={mockPagination}
        onPageChange={mockOnPageChange}
        onLimitChange={mockOnLimitChange}
      />,
    );

    expect(
      screen.getByText((content, element) => {
        return element?.textContent === 'Showing 26 to 50 of 100 advocates';
      }),
    ).toBeInTheDocument();
  });

  it('renders page size selector with correct options', () => {
    render(
      <Pagination
        pagination={mockPagination}
        onPageChange={mockOnPageChange}
        onLimitChange={mockOnLimitChange}
      />,
    );

    const select = screen.getByDisplayValue('25');
    expect(select).toBeInTheDocument();

    // Check all options are present
    expect(screen.getByRole('option', { name: '25' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '50' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '75' })).toBeInTheDocument();
  });

  it('calls onLimitChange when page size is changed', async () => {
    const user = userEvent.setup();

    render(
      <Pagination
        pagination={mockPagination}
        onPageChange={mockOnPageChange}
        onLimitChange={mockOnLimitChange}
      />,
    );

    const select = screen.getByDisplayValue('25');
    await user.selectOptions(select, '50');

    expect(mockOnLimitChange).toHaveBeenCalledWith(50);
  });

  it('renders pagination controls when totalPages > 1', () => {
    render(
      <Pagination
        pagination={mockPagination}
        onPageChange={mockOnPageChange}
        onLimitChange={mockOnLimitChange}
      />,
    );

    expect(screen.getByText('← Previous')).toBeInTheDocument();
    expect(screen.getByText('Next →')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('does not render pagination controls when totalPages <= 1', () => {
    const singlePagePagination: PaginationInfo = {
      page: 1,
      limit: 25,
      totalCount: 10,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    };

    render(
      <Pagination
        pagination={singlePagePagination}
        onPageChange={mockOnPageChange}
        onLimitChange={mockOnLimitChange}
      />,
    );

    expect(screen.queryByText('← Previous')).not.toBeInTheDocument();
    expect(screen.queryByText('Next →')).not.toBeInTheDocument();
  });

  it('calls onPageChange when previous button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <Pagination
        pagination={mockPagination}
        onPageChange={mockOnPageChange}
        onLimitChange={mockOnLimitChange}
      />,
    );

    const prevButton = screen.getByText('← Previous');
    await user.click(prevButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it('calls onPageChange when next button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <Pagination
        pagination={mockPagination}
        onPageChange={mockOnPageChange}
        onLimitChange={mockOnLimitChange}
      />,
    );

    const nextButton = screen.getByText('Next →');
    await user.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange when page number is clicked', async () => {
    const user = userEvent.setup();

    render(
      <Pagination
        pagination={mockPagination}
        onPageChange={mockOnPageChange}
        onLimitChange={mockOnLimitChange}
      />,
    );

    const pageButton = screen.getByText('3');
    await user.click(pageButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('disables previous button when hasPreviousPage is false', () => {
    const firstPagePagination: PaginationInfo = {
      page: 1,
      limit: 25,
      totalCount: 100,
      totalPages: 4,
      hasNextPage: true,
      hasPreviousPage: false,
    };

    render(
      <Pagination
        pagination={firstPagePagination}
        onPageChange={mockOnPageChange}
        onLimitChange={mockOnLimitChange}
      />,
    );

    const prevButton = screen.getByText('← Previous');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button when hasNextPage is false', () => {
    const lastPagePagination: PaginationInfo = {
      page: 4,
      limit: 25,
      totalCount: 100,
      totalPages: 4,
      hasNextPage: false,
      hasPreviousPage: true,
    };

    render(
      <Pagination
        pagination={lastPagePagination}
        onPageChange={mockOnPageChange}
        onLimitChange={mockOnLimitChange}
      />,
    );

    const nextButton = screen.getByText('Next →');
    expect(nextButton).toBeDisabled();
  });

  it('highlights current page', () => {
    render(
      <Pagination
        pagination={mockPagination}
        onPageChange={mockOnPageChange}
        onLimitChange={mockOnLimitChange}
      />,
    );

    const currentPageButton = screen.getByText('2');
    expect(currentPageButton).toHaveClass('bg-primary-default', 'text-neutral-white');
  });

  it('shows ellipsis for large page counts', () => {
    const largePagination: PaginationInfo = {
      page: 10,
      limit: 25,
      totalCount: 500,
      totalPages: 20,
      hasNextPage: true,
      hasPreviousPage: true,
    };

    render(
      <Pagination
        pagination={largePagination}
        onPageChange={mockOnPageChange}
        onLimitChange={mockOnLimitChange}
      />,
    );

    const ellipsis = screen.getAllByText('...');
    expect(ellipsis.length).toBeGreaterThan(0);
  });

  it('calculates correct start and end items for different pages', () => {
    const page3Pagination: PaginationInfo = {
      page: 3,
      limit: 25,
      totalCount: 100,
      totalPages: 4,
      hasNextPage: true,
      hasPreviousPage: true,
    };

    render(
      <Pagination
        pagination={page3Pagination}
        onPageChange={mockOnPageChange}
        onLimitChange={mockOnLimitChange}
      />,
    );

    expect(
      screen.getByText((content, element) => {
        return element?.textContent === 'Showing 51 to 75 of 100 advocates';
      }),
    ).toBeInTheDocument();
  });

  it('handles last page with fewer items correctly', () => {
    const lastPagePagination: PaginationInfo = {
      page: 4,
      limit: 25,
      totalCount: 85, // Only 10 items on last page
      totalPages: 4,
      hasNextPage: false,
      hasPreviousPage: true,
    };

    render(
      <Pagination
        pagination={lastPagePagination}
        onPageChange={mockOnPageChange}
        onLimitChange={mockOnLimitChange}
      />,
    );

    expect(
      screen.getByText((content, element) => {
        return element?.textContent === 'Showing 76 to 85 of 85 advocates';
      }),
    ).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(
      <Pagination
        pagination={mockPagination}
        onPageChange={mockOnPageChange}
        onLimitChange={mockOnLimitChange}
      />,
    );

    const prevButton = screen.getByLabelText('Previous page');
    const nextButton = screen.getByLabelText('Next page');
    const currentPage = screen.getByLabelText('Go to page 2');

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(currentPage).toHaveAttribute('aria-current', 'page');
  });
});
