const BASE_URL = 'https://lamansysfaketaskmanagerapi.onrender.com/api';

const header = {
    'Content-Type': 'application/json',
    'auth': localStorage.getItem('token')
}

export const get = (url, setElements) => {
        const response = fetch(`${BASE_URL}${url}`
            ,{
                method: 'GET',
                headers: header,
            })
            .then((response) => {
                return response.json()})
                .then((data) => {
                    console.log('Respuesta de la API:', data);
                
                    if (data.data) {
                    setElements(data.data);
                    } else {
                    setElements(data);
                    }
                })
            .catch((error) => {
            console.error('Error:', error);
            });
            ;
        return response;
}

export const post = (url, body) => {
    const response = fetch(`${BASE_URL}${url}`
        ,{
            method: 'POST',
            headers: header,
            body: JSON.stringify(body),
        })
        .then((response) => {
            return response.json()}
        );
    return response;
}

export const patch = (url, body) => {
    const response = fetch(`${BASE_URL}${url}`
        ,{
            method: 'PATCH',
            headers: header,
            body: JSON.stringify(body),
        })
        .then((response) => {
            return response.json()}
        );
    return response;
}


export const deleteFunc = (url) => {
    const response = fetch(`${BASE_URL}${url}`
        ,{
            method: 'DELETE',
            headers: header,
        })
        .then((response) => {
            return response.json()}
        );
    return response;

}