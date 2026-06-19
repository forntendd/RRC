import { apiRequest } from "./client";

export function createQuestion({ title, content, category }) {
  return apiRequest("/questions", {
    method: "POST",
    body: JSON.stringify({ title, content, category }),
  });
}

export function getQuestions() {
  return apiRequest("/questions");
}

export function getQuestion(questionId) {
  return apiRequest(`/questions/${questionId}`);
}

export function createAnswer(questionId, { content }) {
  return apiRequest(`/questions/${questionId}/answers`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}

export function getAnswers(questionId) {
  return apiRequest(`/questions/${questionId}/answers`);
}
