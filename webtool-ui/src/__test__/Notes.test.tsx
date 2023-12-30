import { render, screen, waitFor } from '@testing-library/react';
import {describe, beforeEach, it, expect, jest} from "@jest/globals";
import userEvent from '@testing-library/user-event';
import Notes from "../subsites/Notes.tsx";
import {act} from "react-dom/test-utils";

jest.mock('react-cookie', () => ({
    useCookies: jest.fn(() => [{ token: 'mocked-token' }, jest.fn()]),
}));

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

jest.mock('../components/PopUp.tsx', () => ({children} : {children:any})=> <div>{children}</div>);
jest.mock('../components/Form.tsx', () => ({ children, button, action }: {children:any, button:any, action: any}) => <form onSubmit={action}>{children}<button type={"submit"}>{button}</button></form>);
jest.mock('../components/FormInput.tsx', () => ({ value, ...props }: { value: any}) => (<input defaultValue={value} {...props} />));


describe('Notes Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders Note component', () => {
        act (()=> render(<Notes />))
        // @ts-ignore
        expect(screen.getByText('Notes')).toBeInTheDocument();
    });

    it('fetches notes on component mount', async () => {
        // @ts-ignore
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([{ id: '1', name: 'Site 1' }]),
                status: 200,
            })
        );
        render(<Notes />)
        await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/notes'), expect.any(Object)));
        // @ts-ignore
        await waitFor(()=> expect(screen.getByText('Site 1')).toBeInTheDocument())
    });

    it('handles add button click and makes API call', async () => {
        // @ts-ignore
        global.fetch = jest.fn(() => Promise.resolve({
            json: ()=>Promise.resolve([]),
            status: 200 }));
        render(<Notes />);
        userEvent.click(screen.getByText('add'));
        userEvent.click(screen.getByText('hinzufügen'));

        await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/notes'), expect.any(Object)));
    });

    it('handles update button click and makes API call', async () => {
        // @ts-ignore
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve([{ id: '1', name: 'Site 1' }]),
            status: 200 }));
        render(<Notes />);
        // @ts-ignore
        await waitFor(()=>expect(screen.getByText('Site 1')).toBeInTheDocument())
        await userEvent.click(screen.getByText('Bearbeiten'));
        await userEvent.click(screen.getByText('Speichern'));

        await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    });

    it('handles delete button click and makes API call', async () => {
        // @ts-ignore
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve([{ id: '1', name: 'Site 1' }]),
            status: 200 }));
        render(<Notes />);
        // @ts-ignore
        await waitFor(()=>expect(screen.getByText('Site 1')).toBeInTheDocument())
        userEvent.click(screen.getByText('Site 1'));
        userEvent.click(screen.getByText('Löschen'));

        await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/notes/1'), expect.any(Object)));
    });
});
