// detailsModels.ts

export interface Comment { 
  id: number;
  username: string;
  comment: string;
  date: string;
  rating: number;
  topicId?: string;  // Păstrăm topicId ca opțional dacă intenționezi să legi comentariile de topic
}

export interface Topic {
  id: string;
  title: string;
  description: string;  // Schimbăm 'details' în 'description' pentru a se potrivi cu codul de afișare
  subject: string;
  createdBy: string;
  createdDate: string;
  tags?: string[];  // Adăugăm taguri ca opționale pentru a le folosi pe carduri
}
