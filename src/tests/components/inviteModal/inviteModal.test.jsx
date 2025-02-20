import '@testing-library/jest-dom';
import InviteModal from '@/components/inviteModal';

test('renders invite modal ', () => {
  const { container } = render(<InviteModal isModalOpen='true' />);

  const requestTitle = screen.getByText('Request an invite');
  expect(requestTitle).toBeInTheDocument();
});