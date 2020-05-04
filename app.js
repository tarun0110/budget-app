var inpIncome=[];
var inpExpense=[]; 
var expense=0,income=0,budget=0;
var i=0;
var j=0;
var uiModule = (function(){
    var domStrings = {
        inputType : '.add__type',
        inputDescription : '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        budIncome : '.budget__income--value',
        budExpenses : '.budget__expenses--value',
        budget : '.budget__value',
        itDes : 'item__description',
        rightClearfix : 'right clearfix',
        itemValue : 'item__value',
        itemDel : 'item__delete',
        delBtn : 'item__delete--btn',
        closeBtn : 'ion-ios-close-outline',
        incomeList : '.income__list',
        expenseList : '.expenses__list',
        itemClearfix : 'item clearfix',
        itemPer : 'item__percentage',
        conClrfix : '.container',
        budPercent : 'budget__expenses--percentage',
        month : '.budget__title--month'
    };
    var item = function(sign, discription, value, id) {
        this.discription = discription;
        this.value = value;
        this.sign = sign;
        this.id=id;
    }
    var s=document.querySelector(domStrings.inputType).value;
    var d=document.querySelector(domStrings.inputDescription).value;
    var v=parseFloat(document.querySelector(domStrings.inputValue).value);
    
    
    return {
        updateDate : function(){
            var now, year, month, months;
            now = new Date();
            year = now.getFullYear();
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();
            document.querySelector(domStrings.month).textContent = months[month] + ' ' + year;
        },
        addItem : function(){
            if(s=='exp')
                inpExpense.push(new item(s,d,v,j));
            else 
                inpIncome.push(new item(s,d,v,i));
        },
        delItem : function(type, ID, item){
            var inde = -1;
            if (type =='exp')
            {
                for (var l=0;l<inpExpense.length;l++)
                {
                    if (inpExpense[l].id === ID)
                    {
                        inde = l;
                        expense -= inpExpense[l].value;
                        break;
                    }
                }
                if (inde!=-1)
                {
                    inpExpense.splice(inde,1);
                }
                item.remove();
            }
            else if(type == 'inc')
            {
                for (var l=0;l<inpIncome.length;l++)
                {
                    if (inpIncome[l].id === ID)
                    {
                        inde = l;
                        income-=inpIncome[l].value;
                        break;
                    }
                }
                if (inde!=-1)
                {
                    inpIncome.splice(inde,1);
                }
                item.remove();
            }
            
        },
        getDomString : function(){
            return domStrings;
        },
        getInput : function()
        {
            return {
                type : document.querySelector(domStrings.inputType).value,
                description : document.querySelector(domStrings.inputDescription).value,
                value : parseInt(document.querySelector(domStrings.inputValue).value)
            }
        },
        clear : function(){
            document.querySelector(domStrings.inputDescription).value=null;
            // document.querySelector(domStrings.inputDescription).textContent=-1;
            document.querySelector(domStrings.inputValue).value=null;
            document.querySelector(domStrings.inputDescription).focus();
        },
        make : function(){
            var div2;
            var div3;
            var btn;
            var makeUI= function(){

                var div1 = document.createElement('div');
                div0.appendChild(div1);
                div1.className=domStrings.itDes;
                div1.textContent=d;
                div2=document.createElement('div');
                div0.appendChild(div2);
                div2.className=domStrings.rightClearfix;
                div3= document.createElement('div');
                div2.appendChild(div3);
                div3.className=domStrings.itemValue;
                
                var div4 =document.createElement('div');
                div4.className=domStrings.itemDel;
                div2.appendChild(div4);
                btn = document.createElement("BUTTON");
                div4.appendChild(btn);
                btn.className=domStrings.delBtn;     
                var i=document.createElement('i');
                i.className=domStrings.closeBtn;
                btn.appendChild(i);     
            }
            var strManipulation = function(){
                var val = parseInt(v);
                v=v.toFixed(2);
                var sp;
                sp = v.toString().split('.');
                var v1=[];
                while(val>999)
                {
                    v1.push(val%1000);
                    if (v1[v1.length-1]==0)
                    {
                        v1[v1.length-1]='000';
                    }
                    val=parseInt(val/1000);
                }
                v1.push(val%1000);
                if (v1[v1.length-1]==0)
                {
                    v1[v1.length-1]='000';
                }
                if (s=='inc')
                var te = '+ ';
                else var te = '- '
                te +=v1[v1.length-1];
                for (var l=v1.length-2;l>=0;l--)
                {
                    te +=','+ v1[l];
                }
                div3.textContent = te +'.'+sp[1];
            }
            if (s=='inc')
            {
                income+=v;
                document.querySelector(domStrings.budIncome).textContent=income;
                var div0 = document.createElement('div');
                document.querySelector(domStrings.incomeList).appendChild(div0);
                div0.className=domStrings.itemClearfix;
                div0.id='inc-'+i;
                
                makeUI();
                strManipulation();
                
                btn.id='inc-'+i;
                i++;
            }
            else 
            {
                expense+=v;
                document.querySelector(domStrings.budExpenses).textContent=expense;
                var div0 = document.createElement('div');
                document.querySelector(domStrings.expenseList).appendChild(div0);
                div0.className=domStrings.itemClearfix;
                div0.id='exp-'+j;
                makeUI();
                strManipulation();

                var div5=document.createElement('div');
                div5.className = domStrings.itemPer;
                if (income!=0){
                    div5.textContent=Math.round(v/income*100)+'%';
                }
                else
                {
                    div5.textContent=-1;
                } 
                div2.appendChild(div5);
                btn.id='exp-'+j;
                j++;
            }
        },
        budUpdate : function(){
            budget = income-expense;
            document.querySelector(domStrings.budget).textContent=Math.round(budget);
            document.querySelector(domStrings.budExpenses).textContent=Math.round(expense);
            document.querySelector(domStrings.budIncome).textContent=Math.round(income);
            if (income !=0)
                document.querySelector('.'+domStrings.budPercent).textContent = Math.round(expense/income*100)+'%';
            else    
                document.querySelector('.'+domStrings.budPercent).textContent = '---';
        },
        changeStyle : function(){
            var fields = document.querySelectorAll(
                domStrings.inputType + ','+ domStrings.inputDescription +','+ domStrings.inputValue
            );
            for (var l =0;l<fields.length;l++)
            {
                fields[l].classList.toggle('red-focus');
            }
            document.querySelector(domStrings.inputBtn).classList.toggle('red');
        }
    }
});


var controller= (function(){

    var updatePer = function(){
        for (var l=0;l<inpExpense.length;l++)
        {
            if (income !=0){
                document.querySelector('#exp-'+inpExpense[l].id).childNodes[0].nextSibling.childNodes[0].nextSibling.nextSibling.textContent=Math.round(inpExpense[l].value/income*100)+'%';
            }   
            else{
                document.querySelector('#exp-'+inpExpense[l].id).childNodes[0].nextSibling.childNodes[0].nextSibling.nextSibling.textContent='---';
            } 
        }
    }

    var ctrlAddItem = function(){
        var runUI = uiModule();
        var input = runUI.getInput();
        if (input.description!=="" && !isNaN(input.value))
        {
            runUI.addItem();    
            runUI.make();
            runUI.budUpdate();
        }
        runUI.clear();
        updatePer();
    }

    var ctrlDelItem = function(event){
        var itemId;
        var splitId, type, ID;
        itemId= event.target.parentNode.parentNode.parentNode.parentNode.id;
        item=event.target.parentNode.parentNode.parentNode.parentNode;
        // console.log(itemId);
        if (itemId)
        {
            splitId = itemId.split('-');
            type = splitId[0];
            ID =  parseInt(splitId[1]);
        }
        var runUI = uiModule();
        runUI.delItem(type, ID, item);
        
        runUI.budUpdate();
        updatePer();
        // item.remove();
    }

    var setUpEventListner = function(){
        var runUI = uiModule(); 
        var domStrings = runUI.getDomString();
        document.querySelector(domStrings.inputBtn).addEventListener('click',function(){
            ctrlAddItem();
        });
        document.addEventListener('keypress',function(event){
            if (event.keyCode===13||event.which===13)
            {
                ctrlAddItem();
            }
        });
        document.querySelector(domStrings.conClrfix).addEventListener('click',ctrlDelItem);
        document.querySelector(domStrings.inputType).addEventListener('change', runUI.changeStyle);
    };



    return {
        init : function(){
            var runUI = uiModule(); 
            var domStrings = runUI.getDomString();
            runUI.updateDate();     
            console.log('Application starts');
            document.querySelector(domStrings.budExpenses).textContent=0;
            document.querySelector(domStrings.budIncome).textContent=0;
            document.querySelector(domStrings.budget).textContent=0;
            // document.querySelector(domStrings.inputDescription).textContent=-1;
            document.querySelector(domStrings.inputValue).value=null;
            document.querySelector(domStrings.inputDescription).focus();
            document.querySelector('.'+domStrings.budPercent).textContent = '---';
            setUpEventListner();
        }
    };
})();

controller.init();
