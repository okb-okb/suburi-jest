/* eslint-disable jest/no-mocks-import */
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { getCatFact } from "./api";
import factData from "./__mocks__/fact.json";

describe("test cat-facts", () => {
  const mock = new MockAdapter(axios);

  // 使用毎にモック内のデータをクリア
  afterEach(() => {
    mock.reset();
  });

  describe("get cat-facts by id", () => {
    // 正常系
    it("should succeed", async () => {
      const id = "591f98803b90f7150a19c229";
      mock.onGet(`/facts/${id}`).reply(200, factData);

      const catFact = await getCatFact(id);

      expect(catFact.text).toBe(factData.text);
      expect(catFact.text).not.toBe("Dog is the best.");
    });

    // 異常系
    it("should return error because it uses wrong id", async () => {
      const id = "591f98803b90f7150a19c221"; // 最後の1文字が違う
      mock
        .onGet(`/facts/${id}`)
        .reply(404, JSON.parse(`{"message":"Fact not found"}`));

      try {
        await getCatFact(id);
      } catch (error) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(error.response.status).toBe(404);
      }
    });
  });
});

describe("test without cat-facts", () => {
  it("contains expected array", () => {
    const expected = ["cat", "dog"];

    expect(["cat", "bird", "dog"]).toEqual(expect.arrayContaining(expected));
  });

  it("has expected property", () => {
    const cat = {
      name: "tama",
      age: 2,
      weight: 2 + 1.1,
    };

    expect(cat.weight).toBeCloseTo(3.1, 5);
  });
});
