import { Test, TestingModule } from '@nestjs/testing';
import {trycatch} from "./util";
import {HttpException} from "@nestjs/common";



describe('Utilitys', () => {

    beforeEach(async () => {});

    describe('trycatch', () => {
        it('should return the result of the function', async () => {
            const result = await trycatch(() => 1);
            expect(result).toBe(1);
        });
        /*it('should throw an error if the function throws an error', async () => {
            try {
                await trycatch(() => {throw new Error("Test")});
                fail();
            } catch (e) {
                expect(e).toBeInstanceOf(Error);
            }
        });*/
        it('should throw an HttpException if the function throws an error', async () => {
            try {
                await trycatch(() => {throw new Error("Test")});
                fail();
            } catch (e) {
                expect(e).toBeInstanceOf(HttpException);
            }
        });
    });
});
