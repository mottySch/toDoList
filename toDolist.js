let toDO_arr = [];
//import {sortBy} from "lodash"


const init = ()=> {
  if(localStorage["list"]){
    toDO_arr = JSON.parse(localStorage["list"]);
  }
   updateUi();
   declareEvents();

}





const declareEvents = ()=>{
   const form_input = document.querySelector("#id_form");
   form_input.addEventListener("submit", (e)=>{
      e.preventDefault();
      let time = document.querySelector("#id_time_input").value;
      const taskObj = {taskStr: document.querySelector("#id_task_input").value,time: time, deleted: false }
     // console.log("befor push", toDO_arr);
      toDO_arr.unshift(taskObj);
      //console.log( "after push",toDO_arr);
      toDO_arr = _.sortBy( toDO_arr, "time");
    //   toDO_arr.sort((a, b)=>{
    //     if(a.time > b.time && b.time != "") {
    //       console.log( "if1");
    //       return 1;
          
    //     }
    //     if(b.time == "" || (a.time < b.time && a.time != "" )) {
    //       console.log( "if2task",a.taskStr,  b.taskStr);
    //     return -1;
    //     }
    //     console.log( "if3" );
    //     return 0;
    //  });
      localStorage["list"] = JSON.stringify(toDO_arr);
      document.querySelector("#id_task_input").value = '';
      document.querySelector("#id_time_input").value = '';
      updateUi();
    });
  document.querySelector("#id_reset_btn").addEventListener("click", resetApp);
}

const resetApp = ()=>{
    localStorage["list"] = "";
    toDO_arr = [];
    updateUi();
}
const updateUi = ()=>{
    const table = document.querySelector("#id_tbody");
    table.innerHTML = "";
    toDO_arr.forEach((element, index) => {
      let line = document.createElement("tr");
      line.innerHTML =`<th scope="row">${index + 1}:</th>
      <td>${element.taskStr}</td>
      <td>${element.time}</td>
      <td>
        <svg
          id="id_delete_btn"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-check-square text-end"
          viewBox="0 0 16 16"
        >
          <path
            d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
          />
          <path
            d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"
          />
        </svg>
        <svg
          id="id_check_btn"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-trash"
          viewBox="0 0 16 16"
        >
          <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
          />
          <path
            fill-rule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
          />
        </svg>
      </td>`;
      table.append(line);
        if(element.deleted){
          line.style =  "text-decoration: line-through";
        }
     let eraceButton = line.querySelector("#id_check_btn");
     let checkButton = line.querySelector("#id_delete_btn");
     

      eraceButton.addEventListener("click", (  )=>{
        toDO_arr.splice(index,1);
        localStorage["list"] = JSON.stringify(toDO_arr);
        updateUi();
      });
      checkButton.addEventListener("click", (  )=>{
          toDO_arr[index].deleted  = toDO_arr[index].deleted == true ? false:true; 
          localStorage["list"] = JSON.stringify(toDO_arr);
          updateUi();
    });
});
}
init();