import auth from "./auth";

class UserLibrary {

    saveInLibrary(idResource) {
        console.log(idResource);
        const payload = {
            id : idResource
        }

        console.log(payload);

        fetch(`${global.api}/api/user/saveResInLib`, {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-type':'application/json',
                Authorization: `Bearer ${auth.getToken()}`,
            },
            body: JSON.stringify(payload)
        })
        .then(res=>res.json())
        .then((data)=>{
            console.log(data);
        })
    }

}

export default new UserLibrary();