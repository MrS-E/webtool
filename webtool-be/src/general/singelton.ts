import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import {db} from '../general/util';

jest.mock('../general/util', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
}))

beforeEach(()=>{
    mockReset(prismaMock)
})

export const prismaMock = db as unknown as DeepMockProxy<PrismaClient>