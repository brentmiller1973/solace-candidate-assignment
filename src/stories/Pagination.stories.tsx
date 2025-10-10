import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination, PaginationInfo } from '../components/Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive pagination component with page navigation, size selection, and results display.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    pagination: {
      description: 'Pagination information including current page, total count, etc.',
    },
    onPageChange: {
      description: 'Callback function called when page changes',
    },
    onLimitChange: {
      description: 'Callback function called when page size changes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default pagination state
const defaultPagination: PaginationInfo = {
  page: 2,
  limit: 25,
  totalCount: 100,
  totalPages: 4,
  hasNextPage: true,
  hasPreviousPage: true,
};

export const Default: Story = {
  args: {
    pagination: defaultPagination,
    onPageChange: (page: number) => console.log('Page changed to:', page),
    onLimitChange: (limit: number) => console.log('Limit changed to:', limit),
  },
};

export const FirstPage: Story = {
  args: {
    pagination: {
      page: 1,
      limit: 25,
      totalCount: 100,
      totalPages: 4,
      hasNextPage: true,
      hasPreviousPage: false,
    },
    onPageChange: (page: number) => console.log('Page changed to:', page),
    onLimitChange: (limit: number) => console.log('Limit changed to:', limit),
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination on the first page - Previous button is disabled.',
      },
    },
  },
};

export const LastPage: Story = {
  args: {
    pagination: {
      page: 4,
      limit: 25,
      totalCount: 100,
      totalPages: 4,
      hasNextPage: false,
      hasPreviousPage: true,
    },
    onPageChange: (page: number) => console.log('Page changed to:', page),
    onLimitChange: (limit: number) => console.log('Limit changed to:', limit),
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination on the last page - Next button is disabled.',
      },
    },
  },
};

export const SinglePage: Story = {
  args: {
    pagination: {
      page: 1,
      limit: 25,
      totalCount: 15,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    },
    onPageChange: (page: number) => console.log('Page changed to:', page),
    onLimitChange: (limit: number) => console.log('Limit changed to:', limit),
  },
  parameters: {
    docs: {
      description: {
        story: 'When there is only one page, navigation controls are hidden.',
      },
    },
  },
};

export const LargeDataset: Story = {
  args: {
    pagination: {
      page: 10,
      limit: 25,
      totalCount: 500,
      totalPages: 20,
      hasNextPage: true,
      hasPreviousPage: true,
    },
    onPageChange: (page: number) => console.log('Page changed to:', page),
    onLimitChange: (limit: number) => console.log('Limit changed to:', limit),
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination with many pages shows ellipsis for better navigation.',
      },
    },
  },
};

export const LargePageSize: Story = {
  args: {
    pagination: {
      page: 1,
      limit: 75,
      totalCount: 150,
      totalPages: 2,
      hasNextPage: true,
      hasPreviousPage: false,
    },
    onPageChange: (page: number) => console.log('Page changed to:', page),
    onLimitChange: (limit: number) => console.log('Limit changed to:', limit),
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination with 75 items per page selected.',
      },
    },
  },
};

export const PartialLastPage: Story = {
  args: {
    pagination: {
      page: 4,
      limit: 25,
      totalCount: 85,
      totalPages: 4,
      hasNextPage: false,
      hasPreviousPage: true,
    },
    onPageChange: (page: number) => console.log('Page changed to:', page),
    onLimitChange: (limit: number) => console.log('Limit changed to:', limit),
  },
  parameters: {
    docs: {
      description: {
        story: 'Last page with fewer items than the page size (85 total, showing 76-85).',
      },
    },
  },
};

export const VeryLargeDataset: Story = {
  args: {
    pagination: {
      page: 50,
      limit: 50,
      totalCount: 10000,
      totalPages: 200,
      hasNextPage: true,
      hasPreviousPage: true,
    },
    onPageChange: (page: number) => console.log('Page changed to:', page),
    onLimitChange: (limit: number) => console.log('Limit changed to:', limit),
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination with a very large dataset (10,000 items, 200 pages).',
      },
    },
  },
};

export const SmallPageSize: Story = {
  args: {
    pagination: {
      page: 3,
      limit: 25,
      totalCount: 60,
      totalPages: 3,
      hasNextPage: false,
      hasPreviousPage: true,
    },
    onPageChange: (page: number) => console.log('Page changed to:', page),
    onLimitChange: (limit: number) => console.log('Limit changed to:', limit),
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination with a smaller dataset (60 items total).',
      },
    },
  },
};

// Interactive story that demonstrates state changes
export const Interactive: Story = {
  render: () => {
    const [currentPagination, setCurrentPagination] = React.useState<PaginationInfo>({
      page: 1,
      limit: 25,
      totalCount: 237,
      totalPages: 10,
      hasNextPage: true,
      hasPreviousPage: false,
    });

    const handlePageChange = (page: number) => {
      const newPagination = {
        ...currentPagination,
        page,
        hasNextPage: page < currentPagination.totalPages,
        hasPreviousPage: page > 1,
      };
      setCurrentPagination(newPagination);
      console.log('Page changed to:', page);
    };

    const handleLimitChange = (limit: number) => {
      const totalPages = Math.ceil(currentPagination.totalCount / limit);
      const newPage = Math.min(currentPagination.page, totalPages);
      
      const newPagination = {
        ...currentPagination,
        page: newPage,
        limit,
        totalPages,
        hasNextPage: newPage < totalPages,
        hasPreviousPage: newPage > 1,
      };
      setCurrentPagination(newPagination);
      console.log('Limit changed to:', limit);
    };

    return (
      <div className="w-full max-w-4xl">
        <Pagination
          pagination={currentPagination}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
        />
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">Current State:</h3>
          <pre className="text-sm">{JSON.stringify(currentPagination, null, 2)}</pre>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive pagination that updates state in real-time. Try changing pages and page sizes!',
      },
    },
  },
};

