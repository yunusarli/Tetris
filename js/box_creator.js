//tetris için kutucukların oluşturulması

const container = document.querySelector('.container');

//eksenlerdeki kutu sayıları
const X_ROW = 10
const Y_ROW = 10

function create_box(){
    let box;
    for (let i=0;i<X_ROW;i++){
        for (let j=0;j<Y_ROW;j++){
            box = document.createElement('div');
            box.setAttribute('id',`box_${i}${j}`);
            box.setAttribute('data-index',`${i}${j}`);//indexleri tutmak için
            box.classList.add('box');
            container.appendChild(box);
        }  
    }
}

create_box();