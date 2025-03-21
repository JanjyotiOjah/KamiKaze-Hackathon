
// Mock users data (in a real app, this would be in a database)
export const mockUsers: any[] = [
  {
    id: '1',
    name: 'Amit Kumar',
    email: 'amit@example.com',
    password: '$2b$10$X7XJJj8DdYULOzAl4.Y4P.gL/6X1ek7CBfOYAEl9yLy9LqQdPy8/.',  // "password123"
    role: 'teacher',
    subject: 'Physics',
  },
  {
    id: '2',
    name: 'Priya Singh',
    email: 'priya@example.com',
    password: '$2b$10$X7XJJj8DdYULOzAl4.Y4P.gL/6X1ek7CBfOYAEl9yLy9LqQdPy8/.',  // "password123"
    role: 'student'
  }
];

// Mock tests data
export const mockTests: any[] = [
  {
    id: '1',
    teacherId: '1',
    subject: 'Physics',
    chapter: "Newton's Laws of Motion",
    difficulty: 'medium',
    title: "Newton's Laws of Motion - Medium Level Test",
    questions: [
      {
        id: '1',
        text: "Imagine you're at a bus stop and the bus suddenly starts moving forward. You feel yourself being pushed backward. Using Newton's First Law of Motion, explain this phenomenon in detail.",
        marks: 10
      },
      {
        id: '2',
        text: "Riya and her brother are skating in the park. Riya weighs 40 kg and her brother weighs 60 kg. Using Newton's Laws, explain their movement dynamics.",
        marks: 10
      }
    ],
    createdAt: '2023-01-01T00:00:00.000Z'
  }
];

// Mock test results data
export const mockTestResults: any[] = [
  {
    id: '1',
    userId: '2',
    testId: '1',
    score: 18,
    answers: [
      {
        questionId: '1',
        score: 8,
        maxScore: 10,
        feedback: "Good explanation of inertia, but could elaborate more on the apparent force."
      },
      {
        questionId: '2',
        score: 10,
        maxScore: 10,
        feedback: "Excellent explanation of Newton's Third Law in this scenario."
      }
    ],
    submittedAt: '2023-01-02T00:00:00.000Z'
  }
];

// Mock notes data
export const mockNotes: any[] = [
  {
    id: '1',
    teacherId: '1',
    subject: 'Physics',
    chapter: "Newton's Laws of Motion",
    description: "Comprehensive notes on Newton's three laws of motion with examples.",
    filePath: "/uploads/newtons_laws.pdf",
    content: "Newton's First Law: An object at rest stays at rest, and an object in motion stays in motion...",
    uploadedAt: '2022-12-15T00:00:00.000Z'
  }
];

// Mock doubts data
export const mockDoubts: any[] = [
  {
    id: '1',
    studentId: '2',
    subject: 'Physics',
    question: "I don't understand why objects continue moving even after the force is removed. Can you explain this using Newton's laws?",
    answer: "This is explained by Newton's First Law of Motion, also known as the Law of Inertia. It states that an object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an external force.\n\nIn simpler terms, objects want to keep doing what they're already doing. When a force is removed, there's no longer anything changing the object's motion, so it continues moving.\n\nFor example, when you're in a car and it stops suddenly, your body continues moving forward because of inertia. This is why we wear seat belts!\n\nIn real life, objects eventually stop because of friction, which is an external force acting against the motion. In space, where there's almost no friction, objects can continue moving for extremely long periods without any additional force.",
    status: 'answered',
    askedAt: '2023-01-05T00:00:00.000Z',
    answeredAt: '2023-01-05T00:10:00.000Z'
  }
];
