import { TextEncoder, TextDecoder } from 'util';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

global.fetch = jest.fn();