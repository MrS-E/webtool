import { render, screen, waitFor } from '@testing-library/react';
import {describe, beforeEach, it, expect, jest} from "@jest/globals";
import {act} from "react-dom/test-utils";
import Dashboard from "../subsites/Dashboard.tsx";

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));
jest.mock('react-cookie', () => ({
    useCookies: jest.fn(() => [{ token: 'mocked-token' }, jest.fn()]),
}));

describe("Dashboard tests",()=>{
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders Password component', () => {
        act (()=> render(<Dashboard />))
        // @ts-ignore
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    it('fetches passwords on component mount', async () => {
        // @ts-ignore
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({note: [], password:[{id: 1, name: "Site 1"}]}),
                status: 200,
            })
        );
        render(<Dashboard />)
        await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/dashboard'), expect.any(Object)));
        // @ts-ignore
        await waitFor(()=> expect(screen.getByText('Site 1')).toBeInTheDocument())
    });
    it('fetches notes on component mount', async () => {
        // @ts-ignore
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({note: [{id: 1, name: "Site 1"}], password:[]}),
                status: 200,
            })
        );
        render(<Dashboard />)
        await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/dashboard'), expect.any(Object)));
        // @ts-ignore
        await waitFor(()=> expect(screen.getByText('Site 1')).toBeInTheDocument())
    });
    it('fetches all on component mount', async () => {
        // @ts-ignore
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({note: [{id: 1, name: "Note 1"}, {id: 2, name: "Note 2"}], password:[{id: 1, name: "Site 1"}, {id: 2, name: "Site 2"}]}),
                status: 200,
            })
        );
        render(<Dashboard />)
        await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/dashboard'), expect.any(Object)));
        // @ts-ignore
        await waitFor(()=> expect(screen.getByText('Site 1')).toBeInTheDocument())
        // @ts-ignore
        await waitFor(()=> expect(screen.getByText('Site 2')).toBeInTheDocument())
        // @ts-ignore
        await waitFor(()=> expect(screen.getByText('Note 1')).toBeInTheDocument())
        // @ts-ignore
        await waitFor(()=> expect(screen.getByText('Note 2')).toBeInTheDocument())
    });
    it('fetches all with no data on component mount', async () => {
        // @ts-ignore
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({note: [], password:[]}),
                status: 200,
            })
        );
        render(<Dashboard />)
        await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/dashboard'), expect.any(Object)));
    });
})