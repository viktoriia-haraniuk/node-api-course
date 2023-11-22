import app from "../server";
import supertest from "supertest";
import {describe} from "node:test";


describe('GET /', () => {
  it('should send back some data', async function () {
    const res = await supertest(app)
      .get('/')

    expect(res.body.message).toBe('hello');
  });
})
