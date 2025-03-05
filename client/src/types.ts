export interface PollTopic {
  pollTopic: string;
  votes: number;
}
export interface Poll {
  pollName: string;
  pollTopics: PollTopic[];
}
export interface LocationState {
  username: string;
  code: string;
}
