import { useNavigate } from 'react-router-dom';
import MarketAccess from '@/components/MarketAccess';

export default function MarketAccessPage() {
  const navigate = useNavigate();

  return (
    <MarketAccess
      onExplore={() => navigate('/pickles')}
    />
  );
}
