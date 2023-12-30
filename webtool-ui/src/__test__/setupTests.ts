import { jest } from '@jest/globals'
import '@testing-library/jest-dom'

// @ts-ignore
global.fetch = jest.fn( ()=>
    Promise.resolve({
        json: () => Promise.resolve([]),
        status: 200,
    })
)

global.prompt = jest.fn(()=>"secret")