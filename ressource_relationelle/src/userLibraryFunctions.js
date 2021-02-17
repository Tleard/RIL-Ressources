import auth from "./auth";

class UserLibraryFunctions {

    saveInLibrary(idResource) {
        const payload = {
            id : idResource
        }

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

    removeFromLibrary(idResource) {
        const payload = {
            id : idResource
        }

        fetch(`${global.api}/api/user/removeFromLib`, {
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

    postReactionLike(idResource){
        const payload = {
            reaction : "like"
        }
        console.log(idResource);

        fetch(`${global.api}/api/resources/reaction/${idResource}`, {
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

    reportResource(idResource){
        const payload = {
            id : idResource
        }

        fetch(`${global.api}/api/user/report_ressource`, {
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

    reportUser(idUser){
        console.log(idUser)
        const payload = {
            id : idUser
        }

        fetch(`${global.api}/api/user/report_user`, {
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

export default new UserLibraryFunctions();
