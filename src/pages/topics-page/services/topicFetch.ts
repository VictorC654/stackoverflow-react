import { Topic } from '../models/topicModel';

export const fetchMockData = (offset: number, limit: number): Promise<Topic[]> => {
  return new Promise((resolve, reject) => {
    const mock_data: Topic[] = Array.from({ length: 45 }, (_, index) => ({
      id: index + 1,
      title: `Topic Title ${index + 1}`,
      description: `This is the question description :)`,
      tags: [`tag${index + 1}`, 'general'], 
      datecreate: Date.now() - (index * 1000000)  
    }));

    // Simulăm o cerere de rețea
    setTimeout(() => {
      try {
        resolve(mock_data.slice(offset, offset + limit));
      } catch (error) {
        reject(error);
      }
    }, 500);
  });
};
