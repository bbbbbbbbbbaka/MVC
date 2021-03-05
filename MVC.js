class MVCS{
	constructor(parms){
		this.Clear = this.myCreateElement('span',{class:'Clear'},['Clear Templeted'])
		this.Completed = this.myCreateElement('li',{class:'Completer',status:'false'},['Completer'])
		this.Active = this.myCreateElement('li',{class:'Active',status:'false'},['Active'])
		this.All = this.myCreateElement('li',{class:'All',status:'true'},['All'])
		this.zhuangtai = this.myCreateElement('ul',{class:'zhuangtai'},[
			this.All,
			this.Active,
			this.Completed,
		])
		this.strong = this.myCreateElement('strong',{style:"padding-right: 3px; color: rgb(145, 144, 144);"})
		this.items = this.myCreateElement('span',{class:'items'},[this.strong,'items left'])
		this.menu = this.myCreateElement('div',{class:'menu'},[
			this.items,
			this.zhuangtai,
			this.Clear
		])
		this.header = this.myCreateElement('input',{type:"text",class:"header",placeholder:"What needs to be done?"})
		this.MVCspan = this.myCreateElement('span',{class:'MVCspan',index:'0'},['↓'])
		this.MVCc = this.myCreateElement('div',{class:'MVC'},[
			this.MVCspan,
			this.header
		])
		this.MVCfather = this.myCreateElement('div',{class:'MVCfather'},[
			this.MVCc,
			this.menu,

		])
		this.logo = this.myCreateElement('h1',{class:"logo"},['todos'])
		this.father = this.myCreateElement('div',{class:'father'},[
			this.logo,
			this.MVCfather
		])
		document.body.appendChild(this.father)
		this.arr =[]
		this.is = 0
		this.data =[this.All,this.Active,this.Completed]
		this.datas = 0
		this.initia()

	 }

			initia(){
			// 获取localStorage里面的数据赋值给arr
			if(JSON.parse(localStorage.getItem('item')) !== null) {
				JSON.parse(localStorage.getItem('item')).forEach((item,index)=>{
					this.arr.push(item)
				})
				this.strong.innerText = this.arr.length
			
			}

			if(JSON.parse(localStorage.getItem('data')) !== null){
				this.datas = JSON.parse(localStorage.getItem('data'))
				this.data.forEach(item=>{
					if(this.datas == item.getAttribute('class')){
						item.setAttribute('status',true)
						item.style.border ='1px solid #ccc'

					}else{
						item.setAttribute('status',false)
					}
				})
			}
		// console.log(typeof data[0].getAttribute('status'));

		
			//通过arr在页面打开或刷新时生成dom节点 
			this.arr.forEach((item,index)=>{
				this.MVCc.appendChild(this.GenerateForm(this.header,item))
			})

	// 当在header里面敲击回车时生成dom节点
	this.header.addEventListener('keyup',e=>{
		if(e.keyCode == 13 && this.header.value != ''){
			this.MVCc.appendChild(this.GenerateForm(this.header))			
			this.header.value =''
		}
		this.strong.innerText = this.arr.length
	})

		 
	this.arr.forEach((item,index)=>{
			 if(this.is<item.id){
				this.is = item.id
			 }
			 this.is++
		 })

		 // 全选和取消全选
		this.MVCspan.addEventListener('click',e=>{
			var everyCheckbox = document.querySelectorAll('.check')
			var index =  this.MVCspan.getAttribute('index')
			if(index == 0){
				everyCheckbox.forEach((item,i)=>{
					item.checked = true
					this.MVCspan.setAttribute('index',1)
				})
				this.arr.forEach((item,index)=>{
					this.arr[index].completed = true;
				})
				localStorage.setItem('item',JSON.stringify( this.arr))
			}else if(index == 1){
				everyCheckbox.forEach((item,i)=>{
					item.checked = false
					this.MVCspan.setAttribute('index',0)
				})
				this.arr.forEach((item,index)=>{
					this.arr[index].completed = false
				})
				localStorage.setItem('item',JSON.stringify( this.arr))
			}
		})

		//显示全部
		this.All.addEventListener('click',e=>{
			var son = document.querySelectorAll('.son');
			son.forEach((item,index)=>{
				item.style.display = 'block'
			})
			this.xuanzhong(this.All)
		})

		//显示未选中
		this.Active.addEventListener('click',e=>{
			var son = document.querySelectorAll('.son');
			son.forEach((item,index)=>{
				if(item.children[0].checked !== false){
					item.style.display = 'none'
				}else{
					item.style.display = 'block'
				}
			})
			this.xuanzhong( this.Active)
		})
		// 显示选中
		this.Completed.addEventListener('click',e=>{
			var son = document.querySelectorAll('.son');
			son.forEach((item,index)=>{
				if(item.children[0].checked !== true){
					item.style.display = 'none'
				}else{
					item.style.display = 'block'
				}
			})
			this.xuanzhong( this.Completed)
		})
		// 删除选中
		this.Clear.addEventListener('click',e=>{
			var son = document.querySelectorAll('.son')
			var k = 0;
			son.forEach((item,index)=>{
				if(item.children[0].checked == true){
					this.arr.splice(index-k,1)
					item.remove()
				}
				k++
			})
			this.strong.innerText =  this.arr.length
			localStorage.setItem('item',JSON.stringify( this.arr));
		})
		}

			//  生成dom节点
			// header:默认存在的输入框，用来给产生的dom节点赋值
			// creatDom：当页面打开或刷新时要生成的节点数
				GenerateForm(header,creatDom){
				var son = document.createElement('div')
				son.setAttribute('class','son')
				son.setAttribute('id',this.is)
				var checkbox = document.createElement('input')
				checkbox.setAttribute('type','checkbox')
				checkbox.setAttribute('class','check')
				// var status = Completed.getAttribute('status')
				
				son.appendChild(checkbox)
				var div = document.createElement('div')
				div.setAttribute('class','content')
				div.innerText = header.value
			
				son.appendChild(div)
				var text = document.createElement('input')
				text.setAttribute('type','input')
				text.setAttribute('class','texted')
				text.setAttribute('style','display: none')
				son.appendChild(text)
				var span = document.createElement('span')
				span.setAttribute('class','delete')
				span.innerText = 'x'
				son.appendChild(span)
	
				if(creatDom !== undefined){
					// arr.push({'title':creatDom.title,'completed':creatDom.completed,'id':creatDom.id},)
					div.innerText = creatDom.title;
					checkbox.checked = creatDom.completed
					son.setAttribute('id',creatDom.id)
				}else{
					this.arr.push({'title':div.innerText,'completed':checkbox.checked,'id':this.is++},)		
				}
				localStorage.setItem('item',JSON.stringify(this.arr))
	
				// 页面进入或刷新时显示
				if(this.Completed.getAttribute('status') == 'true'&& checkbox.checked ==false ){
					son.style.display = 'none'
				}else if(this.Active.getAttribute('status') == 'true' && checkbox.checked == true){
					son.style.display = 'none'
				}
				
				// 复选框的点击事件
				checkbox.addEventListener('click',e=>{
					var local = JSON.parse( localStorage.getItem('item',this.arr))
						local.forEach((item,index)=>{
							if(local[index].id ==  checkbox.parentNode.getAttribute('id')){
								this.arr[index].completed = !local[index].completed;
								localStorage.setItem('item',JSON.stringify(this.arr));
							}
						})
						// 当复选框为未选中状态而Completed这个标签属于选中状态则将当前复选框隐藏
						var status = this.Completed.getAttribute('status')
						if(status == 'true' && checkbox.checked == false){
								checkbox.parentNode.style.display = 'none'
							} 
				})
			
				// 双击content这个标签的时候将本身隐藏再将下面的input显示出来，并把值传给arr localStorage 和下面的input
				div.addEventListener('dblclick',e=>{
					text.value = div.innerText;
					div.style.display = 'none'
					text.style.display = 'block'
					text.focus();
				})
				// 当回车敲击texted这个类时将他本身隐藏再将上面的div显示出来，并把值传给 arr localStorage和上面的div
				text.addEventListener('keyup',e=>{
					if(e.keyCode == 13){
						div.innerText = text.value;
						text.style.display = 'none'
						div.style.display = 'block'
						var local = JSON.parse( localStorage.getItem('item',arr))
						local.forEach((item,index)=>{
							if(local[index].id ==  checkbox.parentNode.getAttribute('id')){
								arr[index].title = div.innerText;
								localStorage.setItem('item',JSON.stringify(arr));
							}
						})
						text.blur();
					}
				})
				//  当texted这个类的焦点失去时将他本身隐藏再将上面的div显示出来，并把值传给 arr localStorage和上面的div
				text.addEventListener('blur',e=>{
					div.innerText = text.value;
						text.style.display = 'none'
						div.style.display = 'block'
						var local = JSON.parse( localStorage.getItem('item', this.arr))
						local.forEach((item,index)=>{
							if(local[index].id ==  checkbox.parentNode.getAttribute('id')){
								this.arr[index].title = div.innerText;
								localStorage.setItem('item',JSON.stringify( this.arr));
							}
						})
						text.blur();
				})
				// 单个删除
				span.addEventListener('click',e=>{
				var local = JSON.parse( localStorage.getItem('item',this.arr))
						local.forEach((item,index)=>{
							if(local[index].id ==  checkbox.parentNode.getAttribute('id')){
								span.parentNode.remove()
								this.arr.splice(index,1)
								localStorage.setItem('item',JSON.stringify(this.arr));
								this.strong.innerText = this.arr.length
							}
						})
				})
				return son
			}

			xuanzhong(btn){
		
			 this.data.forEach((item,index)=>{
				// if(item == btn){
				// 	console.log(item);
				// 	item.setAttribute('status',true)
					
				// }else{
				// 	item.setAttribute('status',false)
				// }
					// console.log(item.getAttribute('status'));
					// console.log(btn);
				if(item==btn){
				item.setAttribute('status',true);
				this.datas= btn.getAttribute('class')
				localStorage.setItem('data',JSON.stringify( this.datas))
				btn.style.border = '1px solid #ccc'
				}else{
					this.data[index].setAttribute('status',false)
					item.style =''
				}
			})
			
			
		}

	myCreateElement(dom, arr, son) {
		var div = document.createElement(dom)
		var on = /^on/

		if (arr !== null && arr !== undefined) {
			Object.keys(arr).forEach((k, index) => {
				console.log()
				if (on.test(k)) {
					div.addEventListener(k.substring(2, k.length + 1), (e) => {
						console.log(parseInt(arr[k] + '()'))
					})
				} else {
					div.setAttribute(k, arr[k])
				}
			})
		}
		if ((son !== null) & (son !== undefined)) {
			son.forEach((c, index) => {
				if (typeof c === 'string') {
					var text = document.createTextNode(c)
					text.data = c
					div.appendChild(text)
				} else {
					div.appendChild(c)
				}
			})
		}
		return div
	}
}
var n = new MVCS({
})

