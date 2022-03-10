document.addEventListener("DOMContentLoaded", () => {
    const dataLoader = new DataLoader()
    const onlineContentPrice = dataLoader.getOnlineContentPrice()
    const board = new Board(onlineContentPrice)
    
    const onChangeTabId = (tabId) =>{
        board.renderViewData(tabId)
    }
    const tabController = new TabController(onChangeTabId)
    tabController.addTab()

    addEventQuotationInfo(board)
});

function addEventQuotationInfo(board){
    send_quotation_info = document.getElementById('send_quotation_info')
    send_quotation_info.addEventListener('click',()=>{
        data = board.getData()
        //send data
    })
}


class DataLoader{
    #contentPrice = {}

    constructor(){
        this.#loadContentPrice()
    }

    #loadContentPrice(){
        const contentPrice = [
            {
                "id": 1,
                "spec": "광고 영상",
                "detail": "15초 이하",
                "price": 5000000
            },
            {
                "id": 2,
                "spec": "광고 영상",
                "detail": "16 ~ 30초",
                "price": 9000000
            },
            {
                "id": 5,
                "spec": "온라인콘텐츠",
                "detail": "3분 초과 10분 이하",
                "price": 7000000
            },
            {
                "id": 6,
                "spec": "온라인콘텐츠",
                "detail": "10분 초과 20분이하",
                "price": 9000000
            }
        ]
        contentPrice.map(price =>{
            if(!this.#contentPrice[price.spec]){
                this.#contentPrice[price.spec]=[]
            }
            this.#contentPrice[price.spec].push(price)
        })
    }
    
    getOnlineContentPrice(){
        return this.#contentPrice['온라인콘텐츠']
    }
}

class TabController{
    #tabList = document.getElementById('tab_list')
    #currentTabId =0
    #tabNumber = 0
    #tabTemplate
    #onChangeTabId

    constructor(onChangeTabId){
        const tab = tab_list.children[0]
        this.#tabTemplate = tab.cloneNode(true)
        this.#changeTabNumberAndAddEvent(tab)
        this.#onChangeTabId = onChangeTabId
        this.#onChangeOrderAndActive()
    }
    
    addTab(){
        let tab = this.#tabTemplate.cloneNode(true)
        tab = this.#changeTabNumberAndAddEvent(tab)
        this.#tabList.appendChild(tab)
        this.#onChangeOrderAndActive()
    }

    #changeTabNumberAndAddEvent(tab){
        tab.dataset['id'] = this.#tabNumber
        tab.children[0].id = this.#tabNumber
        tab.children[0].dataset['id'] = this.#tabNumber
        tab.addEventListener('click',(e)=>{
            const id = e.target.dataset['id']
            this.#currentTabId= id
            this.#onChangeTabId(id)
            this.#onChangeOrderAndActive()
        })
        this.#tabNumber += 1
        return tab
    }

    #onChangeOrderAndActive(){
        const tabOrders = document.getElementsByClassName('tabOrder')
        Array.from(tabOrders).map((order, idx)=>{
            const tab = order.parentElement
            tab.dataset['id'] == this.#currentTabId ? tab.classList.add('active') :tab.classList.remove('active')
            order.innerText=idx+1
        })
    }
}

class Board{
    #data = [
        {'adCheckbox':true, 'onlineCheckbox':true},
        {'adCheckbox':false, 'onlineCheckbox':false}
    ]
    #currentTabId

    constructor(onlineContentPrice){
        this.#initData(onlineContentPrice)
        this.#initEvent()
        this.#currentTabId =0
        this.renderViewData(this.#currentTabId)
    }

    renderViewData(tabId){
        const data = this.#data[tabId];
        for(const key in data){
            if(key == 'adCheckbox'){
                data[key] ? this.#onSpecAdvertisement() : this.#offSpecAdvertisement()
            }
        }
    }
    
    #initData(onlineContentPrice){
        // option tamplate 미리 생성 등등
    }
    
    #initEvent(){
        const adSpecCheckbox = document.getElementById('tab01_QT_spec_1')
        adSpecCheckbox.addEventListener('click',()=>{
            this.#togleSpecAdvertisement()
        })
    }
    
    #togleSpecAdvertisement(){
        const detail = document.getElementById('tab01_QT_spec_1_detail')
        if(detail.style.display =='block'){
            detail.style.display='none'
            this.#data[this.#currentTabId]['adCheckbox'] = false
        }else{
            detail.style.display='block'
            this.#data[this.#currentTabId]['adCheckbox'] = true
        }
    }
    #onSpecAdvertisement(){
        const detail = document.getElementById('tab01_QT_spec_1_detail')
        detail.style.display='block'
    }
    #offSpecAdvertisement(){
        const detail = document.getElementById('tab01_QT_spec_1_detail')
        detail.style.display='none'
    }

    getData(){
        return this.#data
    }
}


    