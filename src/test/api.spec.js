const request = require("supertest");
const should = require("should");
const index = require("../index");

describe("GET /api/home는", () => {
  describe("성공 시", () => {
    it("매장 리스트의 첫번째는 맥도날드이다.", done => {
      request(index)
        .get("/api/home")
        .end((err, res) => {
          const mac = res.body[0];
          mac.should.have.property("name", "맥도날드");
          done();
        });
    });
  });
});
describe("GET /api/store/:storeId/menu 는", () => {
  describe("성공시", () => {
    it("메뉴 객체를 담은 배열로 응답한다 ", done => {
      request(index)
        .get("/api/store/1/menu")
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
      describe("실패시", () => {
        it("메뉴를 1도 조회할 수 없는 경우 404로 응답쓰", done => {
          request(index)
            .get("/api/store/7/menu")
            .expect(404)
            .end(done);
        });
      });
    });
  });
});
