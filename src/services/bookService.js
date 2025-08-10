import api from "@/api/axios";

export async function getBookByISBN(isbn) {
    try {
        const res = await api.get(`/books/${isbn}`);
        return res.data;
    } catch (err) {
        throw err;
    }
}

export async function getPopularBooks() {
    try {
        const res = await api.get(`/books/popular`);
        return res.data;
    } catch (err) {
        throw err;
    }
}

export async function getGenres() {
    try {
        const res = await api.get(`/books/genres`);
        return res.data;
    } catch (err) {
        throw err;
    }
}

export async function getBookReviews(isbn, page) {
    try {
        const res = await api.get(`/books/${isbn}/reviews`, {
            params: { page }
        });
        return res.data;
    } catch (err) {
        throw err;
    }
}

export async function getBookRecommendation(isbn, page) {
    try {
        const res = await api.get(`/recommendation/book/${isbn}`);
        return res.data;
    } catch (err) {
        throw err;
    }
}

export async function getBooksByAuthor(isbn) {
    try {
        const res = await api.get(`/books/${isbn}/author`);
        return res.data;
    } catch (err) {
        throw err;
    }
}

export async function getSearchResult(searchTerm, selectedGenre, page) {
    try {
        const params = { page };

        if (searchTerm) {
            params.searchTerm = searchTerm;
        } else if (selectedGenre) {
            params.selectedGenre = selectedGenre;
        }
        
        const res = await api.get("/books/search", { params });
        return res.data;
    } catch (err) {
        throw err;
    }
}


