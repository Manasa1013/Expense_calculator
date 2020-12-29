
            let totalExpense = 0;
            //reading or giving ref to elementsHTML
            const headingEl = document.querySelector("#headingTotal");
            headingEl.textContent =`Welcome to Manasa Xperse WebApp`;
            //second ref to div ele
            const expTable = document.querySelector("#expenselabel");
            let allExpense = [];
            let inputDesc=document.querySelector("#expensedesc");
            let inputamt = document.querySelector("#expenseamt");
            /*format for getting date in US way 
            let todayDate = new Date();
            let options = {year:'numeric' , month:'long' , day:'numeric'};
            todayDate.toLocaleDateString('en-US' , options);
            */
            //function is to create ctrl func to
            //calc totalExpense with arg as input amount
            function afterDeleteTotalExpense(expense){
                if(totalExpense>=0){
                    totalExpense = totalExpense - expense;
                    headingEl.textContent  = `Total@end:${totalExpense}`;
                }
            }
            //this func is to calculate the expense
            function addExpenseTotal(){
                let textDesc = inputDesc.value;
                let expense = inputamt.value;
                expense = parseInt(expense,10);
                //eXpense is a datastructure and an object
                let eXpense = {};
                eXpense.desc = textDesc;
                eXpense.amt = expense;
                //adding even date to the eXpense ds or obj
                eXpense.moment = new Date();
                totalExpense = totalExpense + expense;
                headingEl.textContent  = `Total @end:${totalExpense}`;
                allExpense.push(eXpense);
                console.clear();
                console.table(allExpense);
                toRenderList(allExpense);
                /*const data1 = allExpense[0];
                const data2 = allExpense[1];
                const datatxt1 = `Expense ${data1.amt} :: Description ${data1.desc}`;
                const datatxt2 = `Expense ${data2.amt} :: Description ${data2.desc}`;
                const tableCont = `
                    <div>${datatxt1}</div>
                    <div>${datatxt2}</div>
                    `
                expTable.innerHTML = tableCont;*/
            }
            //button ref
            const ele = document.querySelector("#buttonid");
            ele.addEventListener("click", addExpenseTotal , false);
            ele.addEventListener("click",resetData,false);
           
            //Controller functions

            //resetData is to reset the data on clicking add button to allow user to easily enter the next list items.
            function resetData(){
              document.querySelector("#expensedesc").value = "";
              document.querySelector("#expenseamt").value = "";
            }
            //creating funcn to limit html code from script
            //that is destructuring ...read more in mdn docs
            //this is View layer i.e..eliminating any code in this function
            function createListItem({desc,amt,moment}){
                return `<li class="list-group-item d-flex justify-content-between">
                            <div class="d-flex flex-column">
                              ${desc}
                              <small class="text-muted">${getDateString(moment)}</small>
                            </div>
                            <div >
                              <span class="px-5">
                                ${amt}
                              </span>
                              <button type="button" class="btn btn-outline-danger btn-sm"
                              onclick = "DeleteItem(${moment.valueOf()})">
                                <i class="fas fa-trash-alt"></i>
                              </button>
                            </div>
                          </li>`
            }
            //writing func to get dateformat in US way
            //here mom is just reference varibale ..it can be any
            function getDateString(mom){
                return `${mom.toLocaleDateString('en-US' , {year:'numeric' , month:'long' , day:'numeric'})}`
            }
            //toRenderList func is to render the list group format of taken array whether 'allExpense' or 'filteredArray'
            function toRenderList(renderList){
                const expTableEl = renderList.map(xp => createListItem(xp) 
                   //return `<div>Rs${xp.amt} :: ${xp.desc}</div>`
                );
                const joinedexpenseEl =  expTableEl.join("");
                //console.log(joinedexpenseEl);
                expTable.innerHTML = joinedexpenseEl;
            }
            function DeleteItem(dateValue){
                /*verbose way of doing using for loop
                    let filteredArray = [];
                     filteredArray = allExpense;
                    console.log("Items were deleted"+dateValue);*/
                    for(let i=0;i<allExpense.length;i++){
                        //here === checks equality and !== non-equality
                        if(allExpense[i].moment.valueOf() === dateValue){
                            afterDeleteTotalExpense(allExpense[i].amt);
                            let removed = allExpense.splice(i,1);
                            //console.log(filteredArray);
                        }
                    }
                    
                    /*
                    const filteredArray  = allExpense.filter((expenseObj) => {
                        if(expenseObj.moment.valueOf() === dateValue){
                        return `${afterDeleteTotalExpense(expenseObj.amt)}
                                ${expenseObj}`
                        }
                    });
                    */
                    toRenderList(allExpense);
                    
            }
            