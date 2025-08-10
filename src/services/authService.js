import api from "@/api/axios";

export async function signupService(formData) {
    try {
        const res = await api.post('/auth/signup', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return res.data;

    } catch (err){
        throw err;
    }
}

export async function loginService(formData){
    try{
        const res = await api.post('/auth/login', formData);
        return res.data;
        
    } catch(err){
        throw err;
    }

}