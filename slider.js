const STORAGE_KEY="AdressBook";


function addContact()
// Fonction qui affiche le formulaire contact
{
	var form=document.querySelector("#JS-contact-form");
	form.classList.remove("hide");
}

function canceladdContact()
// Fonction qui enleve le formulaire contact
{
	var form=document.querySelector("#JS-contact-form");
	form.classList.add("hide");
}

function saveContact()
// Fonction qui sauvegarde les données du contact
{
	// 1 - On récupère les valeurs des champs
	var name=getFormFieldValue("#JS-contact-form","name");
	var surname=getFormFieldValue("#JS-contact-form","surname");
	var title=getFormFieldValue("#JS-contact-form","title");
	var tel=getFormFieldValue("#JS-contact-form","tel");

	// 2 - On créé un objet Contact dans lequel on insère les valeurs d'UN contact
	var contact=createContactObject(name, surname, title, tel);
	console.log(contact);

	// 3 - On récupère la liste stockée
	var contactList = loadDataFromDomStorage(STORAGE_KEY);
	console.log(contactList);

	// 4 - On place le contact dans la liste stockée
	contactList.push(contact);

	// 5 - On enregistre la liste
	saveDataToDomStorage(STORAGE_KEY,contactList);

	// 6 - on réaffiche la liste des contacts
	refreshAdressBook();

	// 7 - On arrete l'affichage de du formulaire
	canceladdContact();

	// 8 - on supprime les valeurs encore stockées dans le formulaire
	document.querySelector("#JS-contact-form").reset();


}

function getFormFieldValue(selector,fieldName)
{
	var form=document.querySelector(selector);
	var field=form.elements.namedItem(fieldName);
	return field.value;
}

function createContactObject(name, surname, title, tel)
{
	var contact=new Object;
	contact.name=name.toUpperCase(); // le Nom en majuscule
	contact.surname=surname;
	contact.title=title;
	contact.tel=tel;
	return contact;
}

function loadDataFromDomStorage(key)
{
	var list = window.localStorage.getItem(key);
	list = JSON.parse(list); // on transforme chaine de caratere en une chaine en objet 
	if (list==null)
		list=[];
	return list;
}

function saveDataToDomStorage(Key,value)
{
	value= JSON.stringify(value); // on transforme une chaine en objet en chaine de caratere
	window.localStorage.setItem(Key,value);
}

function refreshAdressBook()
{
	// 1 - Récupérer la liste en local storage
	var list = loadDataFromDomStorage(STORAGE_KEY);
	var elem = document.querySelector("#JS-contact-list");
	elem.innerHTML=null;
	for (var i = 0; i < list.length; i++) 
	{
		elem.innerHTML+="<li data-index="+i+"><img src='images/croix.png' alt='croix'>"+list[i].surname+" "+list[i].name+"</li>";
	};

	installEventHandlers("#JS-contact-list li","click",	displayContentDetails);
	installEventHandlers("#JS-contact-list li img","click",	deleteContact);

}

function displayContentDetails()
{
	var index=this.dataset.index;
	var list= loadDataFromDomStorage(STORAGE_KEY);
	console.log(list[index]);
	var elem = document.querySelector("#JS-result-contact");
	elem.innerHTML=null;
	elem.innerHTML+="<p> Titre : "+list[index].title+" </p> "+
					"<p> Nom : "+list[index].name+" </p> "+
					"<p> prénom : "+list[index].surname+" </p> "+
					"<p> Tel : "+list[index].tel+" </p> ";
}

function deleteAdressBook()
{
	saveDataToDomStorage(STORAGE_KEY,[]);
	refreshAdressBook();
}

function deleteContact(e)
{
	// Recupère l'index
	var index=this.dataset.index;

	// On charge la liste des contacts
	var list = loadDataFromDomStorage(STORAGE_KEY);
	console.log(list[index]);

	//faut parcourir la liste de contact
	list.splice(index,1);


	//recharge la liste dans le dataFromStorage
	saveDataToDomStorage(STORAGE_KEY,list);

	refreshAdressBook();

	console.log(list);

	e.stopPropagation(); // arrete la propagation de l'evenement
}
