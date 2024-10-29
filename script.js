questions = [];
questionsCards = [null,null,null,null,null,null,null,null,null,null];
questionCurrent = 0;

async function monJSONParser(url) {
    try{
        const reponse = await fetch(url);
        //console.log(reponse);

        if(!reponse.ok) throw new Error("Le fichier JSON n'a pu être trouvé");
        questions = await reponse.json();
    }catch(error){
        console.log(error);
    }
}

function createHeader(){
    const header = document.createElement("header");
    header.setAttribute('id','header');
    header.setAttribute('class','h-24 text-center text-7xl');
    //header.style.backgroundColor = "blue";
    header.style.width = "100%";

    const title = document.createElement("h1");
    title.innerHTML = "QUIZ";

    header.appendChild(title);
    document.body.appendChild(header);
}

function createNav(){
    const nav = document.createElement("nav");
    nav.setAttribute('id','nav');
    nav.setAttribute('class','mx-6')

    document.body.appendChild(nav);

    //Nav elements
    const navList = document.createElement("ul");
    navList.setAttribute('class','flex flex-row gap-1 px-1');
    for(let i=0; i<10; i++){
        const navItem = document.createElement("li");
        navItem.setAttribute('id',`navItem${i}`);
        navItem.setAttribute('class','flex-1 skew-x-[45deg] bg-[#a8a29e] hover:bg-[#fbbf24]');
        navItem.setAttribute('onclick',`getQuestion(${i})`);

        navItem.style.listStyle = "none";
        navItem.style.width = "10%";
        navItem.style.height = "50px"

        navList.appendChild(navItem);
    }

    nav.appendChild(navList);
}

function createMain(){
    const main = document.createElement("main");
    main.setAttribute('id','main');
    main.setAttribute('class','h-72 mt-24');

    document.body.appendChild(main);
}

async function initApp(){
    //Récupération du questionnaire
    await monJSONParser("questions.json");
    //Création du DOM
    createHeader();
    createNav();
    createMain();

    console.log(questions);
}

// fonctions relative a la creation et l'affichage des questions
function getQuestion(i){
    console.log("Question "+i+": "+questions[i]["question"]);
    if(questionsCards[i] === null){
        createCard(i);
    }else{
        printCard(i);
    }
}
function createCard(i){
    console.log("creation des éléments de la question "+i);
    // Informations relatives a la question
    const num = questions[i]["number"] +1;
    const intitule = questions[i]["question"];
    const reponses1 = questions[i]["reponses"][0];
    const reponses2 = questions[i]["reponses"][1];
    const reponses3 = questions[i]["reponses"][2];
    const reponses4 = questions[i]["reponses"][3];

    const card = document.createElement('section');
    card.setAttribute('class','size-3/5 text-2xl mx-auto p-2.5 bg-[#9ca3af] rounded-xl');
    const cardNum = document.createElement('h1');
    cardNum.innerHTML = num;
    const cardQuestion = document.createElement('h3');
    cardQuestion.innerHTML = intitule;
    const reponsesContainer = document.createElement('div');
    reponsesContainer.setAttribute('class','grid grid-cols-2');
    const rep1 = document.createElement('p');
    rep1.innerHTML = reponses1;
    const rep2 = document.createElement('p');
    rep2.innerHTML = reponses2;
    const rep3 = document.createElement('p');
    rep3.innerHTML = reponses3;
    const rep4 = document.createElement('p');
    rep4.innerHTML = reponses4;

    reponsesContainer.appendChild(rep1);
    reponsesContainer.appendChild(rep2);
    reponsesContainer.appendChild(rep3);
    reponsesContainer.appendChild(rep4);

    card.appendChild(cardNum);
    card.appendChild(cardQuestion);
    card.appendChild(reponsesContainer);

    document.getElementById('main').appendChild(card);

    questionsCards[i] = card;
    printCard(i);
}
function printCard(i){
    console.log("affichage de la question "+i);
    // La question courante est masqué
    if(questionsCards[questionCurrent] !== null){
        questionsCards[questionCurrent].style.display = 'none';
    }
    questionCurrent = i;
    questionsCards[i].style.display = 'block';
    // la nouvelle question est affiché
}

initApp();
