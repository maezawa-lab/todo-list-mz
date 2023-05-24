let taskId = 0

function getTaskTitleInput() {
    return document.getElementById("taskTitleInput").value
}

function clearTaskTitleInput() {
    document.getElementById("taskTitleInput").value = ""

}

let onSubmitAddTaskForm = function (event) {

    event.preventDefault();

    console.log("created new task: " + getTaskTitleInput());

    if (getTaskTitleInput() == "") {
        window.alert("なんか書け")
    } else {
        addTask(getTaskTitleInput())
    }

    clearTaskTitleInput()
}

document.getElementById("addTaskForm").addEventListener('submit', onSubmitAddTaskForm)


// // 指定されたtaskを画面上のリストに追加する
// function addTask(task) {
//     document.getElementById("taskList").innerHTML +=
//         '<li> ' + task + '</li>'
// }

// 目標：
// <input type="checkbox" id="taskDoneCheckbox_1" checked>
// <label for="taskDoneCheckbox_1">みそきん買う</label>
//
// jsのDOM制御に書き換えた クール・バージョン

function addTask(task) {
    let onChangeCheckBox = function (event) {
        let labelHTML = event.target.nextElementSibling
        let span1stHTML = labelHTML.children[0]
        let span2ndHTML = labelHTML.children[1]

        if (event.target.checked) {
            span1stHTML.setAttribute('class', 'done')
            span2ndHTML.setAttribute('class', "")
        } else {
            span1stHTML.setAttribute('class', "")
            span2ndHTML.setAttribute('class', 'hidden')
        }
    }

    let onDeleteButtonClick = function (event) {
        event.stopPropagation();
        
        let deleteListHTML =  event.currentTarget.parentElement.parentElement
        deleteListHTML.remove()
    }

    taskId++
    let checkBoxId = 'taskDoneCheckbox_' + taskId       // taskDoneCheckbox_1

    // inputタグ （＝チェックボックス自体）
    let checkBoxHtml = document.createElement('input')  // ただのinputタグを作る
    checkBoxHtml.setAttribute('type', 'checkbox')       // つくった新しいinputタグの「type」属性に "checkbox" を指定
    checkBoxHtml.setAttribute('id', checkBoxId)         // つくった新しいinputタグの「id」属性に "checkbox" を指定
    checkBoxHtml.checked = false                        // つくった新しいinputタグの「checked」属性に true を指定

    // やりたいこと
    // 1. チェックボックスが変更されたことを検知
    // 2. チェックボックスの状態を取得。
    // 2. 対応するlabelも取得（制御したいから）
    // 3. チェックが入ってたら、class属性に"done"を設定
    // 3. 入ってなかったら、class属性に""を設定

  
    checkBoxHtml.addEventListener("change", onChangeCheckBox)

    // labelタグ （＝チェックボックスの隣にある文字）
    let checkBoxLabelHtml = document.createElement('label') // ただのlabelタグを作る

    let spanHTML = document.createElement('span')
    spanHTML.innerHTML = task

    let doneMassageHTML = document.createElement('span')
    doneMassageHTML.innerHTML = "[完了]"
    doneMassageHTML.setAttribute('class', 'hidden')

    let deleteButtonHTML = document.createElement('button')
    let trashIconHTML = document.createElement('i')
    trashIconHTML.setAttribute('class', 'fa-solid fa-trash')
    deleteButtonHTML.appendChild(trashIconHTML)


    deleteButtonHTML.addEventListener('click', onDeleteButtonClick)

    checkBoxLabelHtml.appendChild(spanHTML)
    checkBoxLabelHtml.appendChild(doneMassageHTML)
    checkBoxLabelHtml.appendChild(deleteButtonHTML)

    // checkBoxLabelHtml.innerText = task                   // 作った新しいlabelタグで囲われた中のテキストを「みそきん買う」を指定
    checkBoxLabelHtml.setAttribute('for', checkBoxId)       // 作った新しいinputタグの「id」属性に "checkbox" を指定

    let listHtml = document.createElement('li')
    // <li>
    // </li>

    listHtml.appendChild(checkBoxHtml)
    // <li>
    //     <input type="checkbox" id="taskDoneCheckbox_1" checked></input>
    // </li>

    listHtml.appendChild(checkBoxLabelHtml)
    // <li>
    //     <input type="checkbox" id="taskDoneCheckbox_1" checked></input>
    //     <label for="taskDoneCheckbox_1">みそきん買う</label>
    // </li>  

    document.getElementById("taskList").appendChild(listHtml)
    console.log("added list html:", listHtml)
}


addTask("みそきん買う")


