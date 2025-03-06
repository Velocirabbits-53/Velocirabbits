import { TextEncoder, TextDecoder } from 'util';
import '@testing-library/jest-dom';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
jest.mock('react-router-dom', () => (Object.assign(Object.assign({}, jest.requireActual('react-router-dom')), { useNavigate: jest.fn() })));
