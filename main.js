const API_URL = 'https://api.thedogapi.com/v1/images/search?limit=4';
const API_URL_Favourite = 'https://api.thedogapi.com/v1/favourites';
const API_URL_Upload = 'https://api.thedogapi.com/v1/images/upload';
const API_KEY = '719dcbe5-1c51-4085-8ecb-220e6cef910c';

// fetch(API_URL)
//     .then(res => res.json())
//     .then(data => {
//         const img = document.querySelector('img');
//         img.src = data[0].url;
//     }
// );

async function getDogImage(){
    const res = await fetch(API_URL);
    const data = await res.json();

    // const img = document.querySelector('img');
    const img1 = document.getElementById('dog1');
    const img2 = document.getElementById('dog2');
    const img3 = document.getElementById('dog3');
    const img4 = document.getElementById('dog4');

    console.log(data);

    // img.src = data[0].url;
    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
    img4.src = data[3].url;

    const btn1 = document.getElementById('likeDog1');
    const btn2 = document.getElementById('likeDog2');
    const btn3 = document.getElementById('likeDog3');
    const btn4 = document.getElementById('likeDog4');

    btn1.onclick = () => postFavouriteDog(data[0].id);
    btn2.onclick = () => postFavouriteDog(data[1].id);
    btn3.onclick = () => postFavouriteDog(data[2].id);
    btn4.onclick = () => postFavouriteDog(data[3].id);
    // console.log(data.id);
}

async function getFavouriteDog(){
    console.log('Obtener imagenes de favoritos')
    const res = await fetch(API_URL_Favourite, {
        headers: {
            'x-api-key': API_KEY
        }
    });
    const data = await res.json();

    const imgFavourite = document.getElementById('dogFavourite');
    console.log(data);

    if (res.status!==200){
        console.log('Hubo un error', res.status)
    } else {
        const section = document.getElementById("favourite");
        section.innerHTML = '';
        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('Perros favoritos');
        h2.appendChild(h2Text);
        section.appendChild(h2);

        data.forEach(dog => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const button = document.createElement('button');
            const buttonText = document.createTextNode('Eliminar perro de la lista');

            img.src = dog.image.url;
            img.width = 150;
            button.appendChild(buttonText);
            button.onclick = () => deleteFavouriteDog(dog.id);
            article.appendChild(img);
            article.appendChild(button);
            section.appendChild(article);          
        });
    }
}

async function postFavouriteDog(id){
    console.log('Se guardo el perro')
    // console.log(id)
    const res = await fetch(API_URL_Favourite, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        },
        body: JSON.stringify({
            image_id: id
        })
    });
    console.log(res);
    getFavouriteDog();
}

async function deleteFavouriteDog(id){
    console.log('Se elimino el perro')
    // console.log(id)
    const res = await fetch(API_URL_Favourite + '/' + id, {
        method: 'DELETE',
        headers: {
            'x-api-key': API_KEY
        }
    });
    console.log(res);
    const data = res.json();
    getFavouriteDog();
}

// async function uploadDog(){
//     const form = document.getElementById('uploadingForm');
//     const formData = new FormData(form);
//     console.log(formData.get('file'));

//     const res = await fetch(API_URL_Upload, {
//         method: 'POST',
//         headers: {
//             'x-api-key': API_KEY
//         },
//         body: formData,
//     })
//     console.log(res.json());
// }

getDogImage();
getFavouriteDog();