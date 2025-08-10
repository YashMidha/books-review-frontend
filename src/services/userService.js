import api from "@/api/axios";

export async function addBookToUser({ isbn, status, pages, rating, review }) { 
    try {
        const res = await api.post('/users/book', { isbn, status, pages, rating, review });
        return res.data;
    } catch (err) {
        throw err;
    }
}

export async function checkUserBookStatus(isbn){
    try {
      const res = await api.get('/users/book/status', { params: { isbn } });
      return res.data;
    } catch (error) {
      throw error;
    }
};

export async function getProfileInfo(){
    try {
      const res = await api.get('/users/profile');
      return res.data;
    } catch (error) {
      throw error;
    }
};

export async function updateProfile(formData){
    try {
      const res = await api.put('/users/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
};

export async function getDashboard(){
    try {
      const res = await api.get('/users/dashboard');
      return res.data;
    } catch (error) {
      throw error;
    }
};

export async function getReading(){
    try {
      const res = await api.get('/users/reading');
      return res.data;
    } catch (error) {
      throw error;
    }
};

export async function getCompleted(){
    try {
      const res = await api.get('/users/completed');
      return res.data;
    } catch (error) {
      throw error;
    }
};

export async function getPlanned(){
    try {
      const res = await api.get('/users/planned');
      return res.data;
    } catch (error) {
      throw error;
    }
};

export async function getUserReviews(){
    try {
      const res = await api.get('/users/reviews');
      return res.data;
    } catch (error) {
      throw error;
    }
};

export async function getUserBookReview(isbn){
    try {
      const res = await api.get(`/users/book/${isbn}/review`);
      return res.data;
    } catch (error) {
      throw error;
    }
};

export async function deleteBookFromUser(isbn){
    try {
      const res = await api.delete(`/users/books/${isbn}`);
      return res.data;
    } catch (error) {
      throw error;
    }
};

export async function enhanceReview({ review, bookTitle }){
    if (!review || !bookTitle) {
      throw new Error("Review and bookTitle are required");
    }
    try {
      const res = await api.post('/gemini/enhance', { review, bookTitle });
      return res.data;
    } catch (error) {
      throw error;
    }
};

export async function getAllBooks() {
  try {
    const [readingRes, completedRes, plannedRes] = await Promise.all([
      api.get('/users/reading'),
      api.get('/users/completed'),
      api.get('/users/planned')
    ]);

    const reading = (readingRes.data.reading || []).map(book => ({ ...book, sourceList: 'reading' }));
    const completed = (completedRes.data.completed || []).map(book => ({ ...book, sourceList: 'completed' }));
    const planned = (plannedRes.data.planToRead || []).map(book => ({ ...book, sourceList: 'planned' }));

    return [...reading, ...completed, ...planned];
  } catch (error) {
    throw error;
  }
}

export async function getUserRecommendations(page = 1) {
  try {
    const res = await api.get(`/recommendation/user`, {
        params: { page }
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}
