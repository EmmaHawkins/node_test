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
    expect(testApp.get(3).id).to.equal(3)
  });

  it("app updates correctly", function() {
    testApp.post('1')
    testApp.post('2')
    testApp.delete(1)
    testApp.update(2, 'update')
    expect(testApp.get(2).content).to.equal('update')
  });

  it("app reads from the given filepath", function() {
    
    let testFileWriteApp = new MessageApp("/json/testMessages.json")
    expect(testFileWriteApp.messages.length).to.equal(0)

    testFileWriteApp.post("Hi")
    expect(testFileWriteApp.messages.length).to.equal(1)

    let testFileReadApp = new MessageApp("/json/testMessages.json")
    expect(testFileReadApp.messages.length).to.equal(1)

    testFileReadApp.delete(1)
    let testFileClearedApp = new MessageApp("/json/testMessages.json")
    expect(testFileClearedApp.messages.length).to.equal(0)
  });

  it("rejects empty messages", function() {
    let testApp = new MessageApp()
    expect(testApp.post('')).to.deep.equal([])
  });

  it("no messages if no messages are sent", function() {
      let testApp = new MessageApp()
      expect(testApp.getAll()).to.deep.equal([])
  });

  it("rejects false update", function() {
      let testApp = new MessageApp()
      expect(testApp.update(0, "")).to.deep.equal([])
  });

  it("errors if no message to delete", function() {
      let testApp = new MessageApp()
      expect(testApp.delete(0)).to.deep.equal('Message not found in database')
  });
})
