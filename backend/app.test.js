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
    expect(testApp.messages[0].id).to.equal(0)
  });

  it("app reads GET function", function() {
    expect(testApp.get(0).content).to.equal("hi World")
  });

  it("app updates (update)", function() {
    testApp.update(0, "hello world")
    expect(testApp.get(0).content).to.equal("hello world")
  });

  it("app deletes (delete)", function() {
    testApp.delete(0)
    expect(testApp.messages.length).to.equal(0)
  });

 
});