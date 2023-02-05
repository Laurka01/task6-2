function destroyPopup(popup) {
    //let myPopup = popup;
    popup.classList.remove('open');
    popup.remove();
    popup = null;    
}
function nextupload(options) {
    return new Promise(resolve => {
        const popup = document.createElement('form');
        popup.classList.add('popup');
        popup.insertAdjacentHTML(
            'afterbegin',
            `<form method="post" enctype="multipart/form-data">
            <div>
            <label for="file">${options.title}</label>
<input type="file" name="input" style= "width:150px" />
<button type="submit">Submit</button>
</div>
`
        );       
        popup.addEventListener('submit', function (event) {
            event.preventDefault();
            resolve(event.target.input.value);
            destroyPopup(popup);
            console.log(popup)
        }, {once:true});

        document.body.appendChild(popup);   
        popup.classList.add('open');
        

    })
}
const questions = [
    {
        title: 'Upload a first file',
    },
    {
        title: 'Upload a second file',
    },
    {
        title: 'Upload a third file',
    },
];

async function uploadMany() {
    for (const question of questions) {
        const answer = await nextupload(question);
        console.log(answer)
    }
    alluploaded()
}
function alluploaded(){
    let parent = document.querySelector('body');
    let child1 = document.querySelector('p');
    let child2 = document.querySelector('button');
    parent.removeChild(child1);
    parent.removeChild(child2);
    const para = document.createElement("p");
    para.innerText = "All files uploaded!";
    document.body.appendChild(para);    
}
