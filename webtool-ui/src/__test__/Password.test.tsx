import { render, screen, waitFor } from '@testing-library/react';
import {describe, beforeEach, it, expect, jest} from "@jest/globals";
import userEvent from '@testing-library/user-event';
import Password from '../subsites/Password.tsx';

import {act} from "react-dom/test-utils";

jest.mock('react-cookie', () => ({
    useCookies: jest.fn(() => [{ token: 'mocked-token' }, jest.fn()]),
}));

jest.mock('crypto-js', () => ({
    AES: {
        encrypt: jest.fn(() => ({ toString: jest.fn() })),
        decrypt: jest.fn(() => ({ toString: jest.fn() })),
    },
    enc: {
        Utf8: {
            parse: jest.fn(),
        },
    },
    MD5: jest.fn(() => ({ toString: jest.fn() })),
}));

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

jest.mock('../components/PopUp.tsx', () => ({children} : {children:any})=> <div>{children}</div>);
jest.mock('../components/Form.tsx', () => ({ children, button }: {children:any, button:any}) => <form>{children}<button>{button}</button></form>);
jest.mock('../components/FormInput.tsx', () => ({ value, ...props }: { value: any}) => (<input defaultValue={value} {...props} />));


describe('Password Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders Password component', () => {
        act (()=> render(<Password />))
        // @ts-ignore
        expect(screen.getByText('Passwort-Manager')).toBeInTheDocument();
    });

    it('fetches passwords on component mount', async () => {
        // @ts-ignore
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ id: '1', name: 'Site 1' }]),
                status: 200,
            })
        );
        render(<Password />)
        await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/passwords'), expect.any(Object)));
        // @ts-ignore
        await waitFor(()=> expect(screen.getByText('Site 1')).toBeInTheDocument())
    });

    it('handles add button click and makes API call', async () => {
        // @ts-ignore
        global.fetch = jest.fn(() => Promise.resolve({
            json: ()=>Promise.resolve([]),
            status: 200 }));
        render(<Password />);
        userEvent.click(screen.getByText('add'));
        userEvent.click(screen.getByText('hinzufügen'));

        await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/passwords'), expect.any(Object)));
    });

    it('handles detail button click and makes API call', async () => {
        // @ts-ignore
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ id: '1', name: 'Site 1' }]),
                status: 200,
            })
        );
        act(()=>render(<Password />))
        // @ts-ignore
        await waitFor(()=>expect(screen.getByText('Site 1')).toBeInTheDocument())

        userEvent.click(screen.getByText('Site 1'));

        await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/passwords/1'), expect.any(Object)));
        // @ts-ignore
        expect(screen.getByText('Detail')).toBeInTheDocument();
    });

    it('handles update button click and makes API call', async () => {
        // @ts-ignore
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve([{ id: '1', name: 'Site 1' }]),
            status: 200 }));
        render(<Password />);
        // @ts-ignore
        await waitFor(()=>expect(screen.getByText('Site 1')).toBeInTheDocument())
        userEvent.click(screen.getByText('Site 1'));
        userEvent.click(screen.getAllByText('Bearbeiten')[0]);
        userEvent.click(screen.getAllByText('Bearbeiten')[1]);

        await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/passwords/1'), expect.any(Object)));
    });

    it('handles delete button click and makes API call', async () => {
        // @ts-ignore
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve([{ id: '1', name: 'Site 1' }]),
            status: 200 }));
        render(<Password />);
        // @ts-ignore
        await waitFor(()=>expect(screen.getByText('Site 1')).toBeInTheDocument())
        userEvent.click(screen.getByText('Site 1'));
        userEvent.click(screen.getByText('Löschen'));

        await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/passwords/1'), expect.any(Object)));
    });
});
