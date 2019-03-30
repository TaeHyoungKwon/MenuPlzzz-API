const request = require("supertest");
const should = require("should");
const api = require("../routes/api");
const index = require("../index");

describe("GET /store/:storeId/menu 는", () => {
  describe("성공시", () => {
    it("메뉴 객체를 담은 배열로 응답한다 ", done => {
      request(index)
        .get("/api/store/1/menu")
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });
  });
  describe("실패시", () => {
    it("메뉴를 1도 조회할 수 없는 경우 404로 응답쓰", done => {
      request(index)
        .get("/api/store/7/menu")
        .expect(404)
        //.expect(404)
        .end(done);
    });
  });
});
