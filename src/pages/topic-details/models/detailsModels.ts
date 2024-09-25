export interface Comment {
  id: number;
  username: string;
  comment: string;
  date: string;
  rating: number;
}

export interface Topic {
  id: string;
  title: string;
  details: string;
  subject: string;
  createdBy: string;
  createdDate: string;
}