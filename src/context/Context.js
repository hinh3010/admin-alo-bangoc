import { createContext } from 'react';
import { io } from 'socket.io-client';
// import { REALTIME_URL } from '../api/urlConfig';
import { settings } from '../config';

const AppContext = createContext(settings);

export const EmailContext = createContext({ emails: [] });

export const ProductContext = createContext({ products: [] });

export const FeedContext = createContext({ feeds: [] });

export const AuthWizardContext = createContext({ user: {} });

export const ChatContext = createContext();

export const KanbanContext = createContext({ KanbanColumns: [], kanbanTasks: [] });

export const SocketContext = createContext({ count: 0, noti: {} });

export default AppContext;
