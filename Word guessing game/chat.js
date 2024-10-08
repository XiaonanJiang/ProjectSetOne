const chatContents = [];


function addChatContent(who, sayWhat) {
    chatContents.push({ username: who, message: sayWhat });
}

module.exports = {
    chatContents,
    addChatContent,
  };
