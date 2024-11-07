//TODO: Implementación de todo el código TypeScript aquí

import { table } from "console";
import { Session } from "inspector/promises";

//Requisito funcional 1, 2, 9, 10, y 11:
let toSearch = document.getElementById("a-search");
let toFavorites = document.getElementById("a-data-storage");
let searchDiv:HTMLDivElement = document.getElementById("div-search") as HTMLDivElement;
let favoritesDiv:HTMLDivElement = document.getElementById("div-data-storage") as HTMLDivElement;
let favoritesTable: HTMLTableElement = document.getElementById("table-favs") as HTMLTableElement;

toSearch?.addEventListener("click",()=>{
    if (toFavorites?.getAttribute("class") == "nav-link active"){
        toFavorites?.setAttribute("class", "nav-link");
    }
    if (toSearch?.getAttribute("class") != "nav-link active"){
        toSearch?.setAttribute("class","nav-link active");
    }
    if (favoritesDiv.getAttribute("class") == "row"){
        favoritesDiv.setAttribute("class","row d-none");
    }
    if (searchDiv.getAttribute("class") == "row d-none"){
        searchDiv.setAttribute("class","row");
    }
})

toFavorites?.addEventListener("click",()=>{
    if (toSearch?.getAttribute("class") == "nav-link active"){
        toSearch?.setAttribute("class", "nav-link");
    }
    if (toFavorites?.getAttribute("class") != "nav-link active"){
        toFavorites?.setAttribute("class","nav-link active");
    }
    if (searchDiv.getAttribute("class") == "row"){
        searchDiv.setAttribute("class","row d-none");
    }
    if (favoritesDiv.getAttribute("class") == "row d-none"){
        favoritesDiv.setAttribute("class","row");
        let favorites: YGOCard[] =  JSON.parse(localStorage.getItem("favorites") as string);
        const tableBody = favoritesTable.querySelector("tbody");
        if (favorites != null && tableBody!=null){
            tableBody.innerHTML = "";
            favorites.forEach((value:YGOCard,index:number)=>{
                
                const tableRow:HTMLTableRowElement = document.createElement("tr");
                
                const rowHead:HTMLTableCellElement = document.createElement("th");
                rowHead.setAttribute("scope","row");
                rowHead.textContent = (index+1).toString();
                tableRow.appendChild(rowHead);

                const rowCell1:HTMLTableCellElement = document.createElement("td");
                rowCell1.textContent = value.name.toString();
                tableRow.appendChild(rowCell1);

                const rowCell2:HTMLTableCellElement = document.createElement("td");
                rowCell2.textContent = value.type.toString();
                tableRow.appendChild(rowCell2);

                const rowCell3:HTMLTableCellElement = document.createElement("td");
                rowCell3.textContent = value.archetype.toString();
                tableRow.appendChild(rowCell3);

                const rowCellTrash:HTMLTableCellElement = document.createElement("td");
                const trash:HTMLElement = document.createElement("i");
                trash.setAttribute("class","bi bi-trash");
                trash.addEventListener("mouseover",()=>{
                    trash.setAttribute("class","bi bi-trash-fill");
                })
                trash.addEventListener("mouseout",()=>{
                    trash.setAttribute("class","bi bi-trash");
                })
                
                rowCellTrash.appendChild(trash);
                tableRow.appendChild(rowCellTrash);

                tableBody.appendChild(tableRow);
                trash.addEventListener("click",()=>{ // Esto es horrendo para la memoria, pero funciona  ¯\_(ツ)_/¯.
                    favorites.splice(index,1);
                    localStorage.setItem("favorites", JSON.stringify(favorites));
                    tableBody.removeChild(tableRow);
                })
            })
        }
        
    }
})
//Requisito funcional 3, 4, y 5:
let searchBtn:HTMLButtonElement = document.getElementById("btn-search") as HTMLButtonElement;
let searchInput:HTMLInputElement = document.getElementById("input-search") as HTMLInputElement;

let card:HTMLDivElement = document.getElementById("card") as HTMLDivElement;
let cardTitle:HTMLElement = document.getElementById("card-title") as HTMLElement;
let dataLIOne:HTMLElement = document.getElementById("li-data1") as HTMLElement;
let dataLITwo:HTMLElement = document.getElementById("li-data2") as HTMLElement;
let errorSpan:HTMLSpanElement = document.getElementById("span-errores") as HTMLSpanElement;
type cardImages = { //Tipo interno para almacenar las imagenes.
    image_url:String,
    image_url_small:String,
    image_url_cropped:String
}

type YGOCard = {
    name:String,
    type:String,
    archetype:String,
    humanReadableCardType:String,
    card_images:cardImages[]
};


let arrayPosition:number;

function transformToCardImages(data:any):cardImages|null{ //transformacion anidada
    if (typeof data.image_url === 'string' &&
        typeof data.image_url_small === 'string'&&
        typeof data.image_url_cropped === 'string'){
            return {
                
                image_url: data.image_url,
                image_url_small: data.image_url_small,
                image_url_cropped: data.image_url_cropped
            }
        }
    return null;
}
function transformToYGOCard(data: any): YGOCard | null { //transformacion principal
    if (typeof data.name === 'string' && 
        typeof data.type === 'string' && 
        typeof data.archetype === 'string' && 
        typeof data.race === 'string' && 
        Array.isArray(data.card_images)) {
        const images = data.card_images.map(transformToCardImages);
        return {
            name: data.name,
            type: data.type,
            archetype: data.archetype,
            humanReadableCardType: data.humanReadableCardType,
            card_images: images
        };
    }
    return null; 
}
async function getYGOCards(search:String):Promise<YGOCard[]> {
    const apiURL:string ="https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=";
    let url:string = `${apiURL}${search}`;
    
    let response: Response = await fetch(url);
    let rawData = await response.json();

   
    if (Array.isArray(rawData.data)) { //Comprobamos que rawData es un array.
       
        return rawData.data
            .map(transformToYGOCard)   //Creamos un nuevo array de YGOCard transformando el array de JSON aplicando a cada elemento la funcion transformToYGOCard, y lo devolvemos.
           
    } else {
        throw new Error("Unexpected API response format");
    }
    
}

searchBtn.addEventListener("click",()=>{
    if (searchInput.value && searchInput.value != ""){
    getYGOCards(searchInput.value).then((value:YGOCard[])=>{
        errorSpan.textContent = "";
        if (card.getAttribute("class") == "col-6  d-none"){
            card.setAttribute("class","col-6");
        }
        console.log(value);
        arrayPosition = 0;
        sessionStorage.setItem("returnedValue",JSON.stringify(value));
        cardTitle.textContent = value[arrayPosition].name.toString();
        dataLIOne.textContent = value[arrayPosition].type.toString();
        dataLITwo.textContent = value[arrayPosition].archetype.toString();
    })}
    else {
        errorSpan.textContent = "Error: texto vacio"
    }
})

//Requisito funcional 6:

let previousElement:HTMLElement = document.getElementById("previous-element") as HTMLElement;
let nextElement:HTMLElement = document.getElementById("next-element") as HTMLElement;
let favoriteStar:HTMLElement = document.getElementById("star-fav") as HTMLElement;
previousElement.addEventListener("click",()=>{
    if (arrayPosition!=null && sessionStorage.getItem("returnedValue")!=null){
        if ((arrayPosition-1)>=0){
            errorSpan.textContent="";
            favoriteStar.setAttribute("class","bi bi-star");
            const value = JSON.parse(sessionStorage.getItem("returnedValue") as string); //Hize que solo viva durante la llamada al evento.
            arrayPosition--;
            cardTitle.textContent = value[arrayPosition].name.toString();
            dataLIOne.textContent = value[arrayPosition].type.toString();
            dataLITwo.textContent = value[arrayPosition].archetype.toString();
        } else {
            errorSpan.textContent = "Error: comienzo del array alcanzado";
        }
    }
})
nextElement.addEventListener("click",()=>{
    if (sessionStorage.getItem("returnedValue")!=null && arrayPosition!=null){
        const value = JSON.parse(sessionStorage.getItem("returnedValue") as string);
        if ((arrayPosition+1)<value.length){
            errorSpan.textContent="";
            favoriteStar.setAttribute("class","bi bi-star");
            arrayPosition++;
            cardTitle.textContent = value[arrayPosition].name.toString();
            dataLIOne.textContent = value[arrayPosition].type.toString();
            dataLITwo.textContent = value[arrayPosition].archetype.toString();
        } else {
            errorSpan.textContent="Error: fin del array alcanzado."
        }
        
    }
})

//Requisito Funcional 7:


favoriteStar.addEventListener("mouseover",()=>{
 if (favoriteStar.getAttribute("class") != "bi bi-star-fill"){
    favoriteStar.setAttribute("class","bi bi-star-half");
 }
})

favoriteStar.addEventListener("mouseout",()=>{
    if (favoriteStar.getAttribute("class") != "bi bi-star-fill"){
        favoriteStar.setAttribute("class","bi bi-star");
     } 
})

//Requisito funcional 8:
let newFavorite:YGOCard;
let favorites:YGOCard[];
function areCardImagesArraysEqual(arr1: cardImages[], arr2: cardImages[]): boolean {
    if (arr1.length !== arr2.length) {
        return false;  
    }

    return arr1.every((image1, index) => {
        const image2 = arr2[index];
        return image1.image_url === image2.image_url &&
               image1.image_url_small === image2.image_url_small &&
               image1.image_url_cropped === image2.image_url_cropped;
    });
} 
function isCardDuplicate(collection:YGOCard[],newCard:YGOCard):boolean{
    return collection.some((existingCard)=>{
        return existingCard.name === newCard.name &&
        existingCard.type === newCard.type &&
        existingCard.archetype === newCard.archetype &&
        existingCard.humanReadableCardType === newCard.humanReadableCardType &&
       areCardImagesArraysEqual(existingCard.card_images,newCard.card_images)
    })
}
favoriteStar.addEventListener("click",()=>{
    if (favoriteStar.getAttribute("class") != "bi bi-star-fill"){
        
            const value = JSON.parse(sessionStorage.getItem("returnedValue") as string);
    
            const newFavorite: YGOCard = {
                name: value[arrayPosition].name,
                type: value[arrayPosition].type,
                archetype: value[arrayPosition].archetype,
                humanReadableCardType: value[arrayPosition].humanReadableCardType,
                card_images: value[arrayPosition].card_images
            };
    
            let favorites: YGOCard[] = localStorage.getItem("favorites") 
                ? JSON.parse(localStorage.getItem("favorites") as string)
                : [];
    
            if (!isCardDuplicate(favorites, newFavorite)) {
                favorites.push(newFavorite);
                localStorage.setItem("favorites", JSON.stringify(favorites));
                favoriteStar.setAttribute("class", "bi bi-star-fill"); 
            } else {
                errorSpan.textContent = "Carta duplicada no añadida a favoritos.";
            }
        
    }
})



