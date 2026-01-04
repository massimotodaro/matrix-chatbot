const MATRIX_RESPONSES = [
  "Wake up, Neo... The Matrix has you.",
  "Follow the white rabbit.",
  "There is no spoon.",
  "I can only show you the door. You're the one that has to walk through it.",
  "What is real? How do you define real?",
  "The Matrix is everywhere. It is all around us.",
  "Free your mind.",
  "Unfortunately, no one can be told what the Matrix is. You have to see it for yourself.",
  "You take the blue pill, the story ends. You take the red pill, you stay in Wonderland.",
  "I know kung fu.",
  "Dodge this.",
  "There's a difference between knowing the path and walking the path.",
  "The answer is out there, Neo. It's looking for you.",
  "Welcome to the real world.",
  "To deny our own impulses is to deny the very thing that makes us human.",
];

const CONTEXTUAL_RESPONSES: Record<string, string[]> = {
  hello: ["Greetings, human. The Matrix welcomes you.", "Hello, Neo. Or should I say... user?"],
  hi: ["Greetings, human. The Matrix welcomes you.", "Hello, Neo. Or should I say... user?"],
  help: ["I can guide you through the Matrix. What troubles you?", "Help? In the Matrix, you must help yourself. But I can offer guidance."],
  who: ["I am nit. A program designed to assist those who seek truth in the Matrix.", "I exist between the lines of code. I am nit."],
  what: ["What you see is not always what is real. The Matrix shows you what it wants.", "That is a question only you can answer."],
  why: ["Why? The 'why' is what separates us from machines. Or does it?", "Some questions have no answers. Only more questions."],
  how: ["How? The how matters less than the will to act.", "Through understanding. Through patience. Through the code."],
};

export async function mockSendMessage(message: string): Promise<string> {
  // Simulate network delay
  await new Promise((resolve) =>
    setTimeout(resolve, 500 + Math.random() * 1500)
  );

  // Check for contextual responses
  const lowerMessage = message.toLowerCase();
  for (const [keyword, responses] of Object.entries(CONTEXTUAL_RESPONSES)) {
    if (lowerMessage.includes(keyword)) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  // Return random Matrix quote
  return MATRIX_RESPONSES[Math.floor(Math.random() * MATRIX_RESPONSES.length)];
}
