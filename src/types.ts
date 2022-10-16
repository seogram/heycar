export interface IQuestion {}
export interface IChoice {
  choice: string;
  votes: number;
  url: string;
}

export interface IPoll {
  published_at: string;
  question: string;
  choices: IChoice[];
  url: string;
}

export interface IQuestionBody {
  question: string;
  choices: string[];
}
