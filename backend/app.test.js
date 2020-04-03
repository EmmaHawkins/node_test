import { expect } from "chai";
import MessageApp from './app.js'

describe("app", function() {
  
  let testApp;

  beforeEach(() => {
    testApp = new MessageApp
    testApp.post('hi World')
  })
  
  it("app has messages", function() {
    expect(testApp.messages).to.be.an('array');
  });

  it("app creates message (post)", function() {
    testApp.post('hi World')
    expect(testApp.messages.length).to.equal(2);
  });

  it("message has the id, date and content", function() {
    expect(testApp.messages[0].content).to.equal('hi World')
    expect(testApp.messages[0].date).to.not.equal(undefined)
    expect(testApp.messages[0].id).to.equal(1)
  });

  it("app reads GET function", function() {
    expect(testApp.get(1).content).to.equal("hi World")
  });

  it("app updates (update)", function() {
    testApp.update(1, "hello world")
    expect(testApp.get(1).content).to.equal("hello world")
  });

  it("app deletes (delete)", function() {
    testApp.delete(1)
    expect(testApp.messages.length).to.equal(0)
  });

  it("id's are always unique", function() {
    testApp.post('1')
    testApp.post('2')
    testApp.delete('1')
    testApp.post('3')
    expect(testApp.messages[1].id).to.equal(3)
  });

  it("app deletes correctly", function() {
    testApp.post('1')
    testApp.post('2')
    testApp.post('3')
    testApp.delete(1)
    testApp.delete(2)
    console.log(testApp.messages)
    expect(testApp.get(3).id).to.equal(3)
  });

  it("app updates correctly", function() {
    testApp.post('1')
    testApp.post('2')
    testApp.delete(1)
    testApp.update(2, 'update')
    expect(testApp.get(2).content).to.equal('update')
  });
});