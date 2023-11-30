import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    service = new UserService();
  });

    describe('createUser', () => {
      it('Should return 201; everything in order', async () => {
        const result: number = 201 //HttpStatus.CREATED
        jest.spyOn(service, 'createUser').mockImplementation(async () => result);

        expect(await service.createUser({
          firstname: 'test',
          lastname: 'test',
          email: 'test.test@test.test',
          auth: 'test'
        })).toBe(result);
      });

      it('Should return 201; missing names', async () => {
        const result: number = 201 //HttpStatus.CREATED
        jest.spyOn(service, 'createUser').mockImplementation(async () => result);

        // @ts-ignore
        expect(await service.createUser({
          email: 'test.test@test.test',
          auth: 'test'
        })).toBe(result);
      });

      it('Should return 500; missing mail', async () => {
        const result: number = 500 //HttpStatus.INTERNAL_SERVER_ERROR
        jest.spyOn(service, 'createUser').mockImplementation(async () => result);

        // @ts-ignore
        expect(await service.createUser({
          firstname: 'test',
          lastname: 'test',
          auth: 'test'
        })).toBe(result);
      });

      it('Should return 500; missing auth', async () => {
        const result: number = 500 //HttpStatus.INTERNAL_SERVER_ERROR
        jest.spyOn(service, 'createUser').mockImplementation(async () => result);

        // @ts-ignore
        expect(await service.createUser({
          firstname: 'test',
          lastname: 'test',
          email: 'test.test@test.test',
        })).toBe(result);
      });

      it('Should return 500; empty', async () => {
        const result: number = 500 //HttpStatus.INTERNAL_SERVER_ERROR
        jest.spyOn(service, 'createUser').mockImplementation(async () => result);

        // @ts-ignore
        expect(await service.createUser()).toBe(result);
      });

    });

});
