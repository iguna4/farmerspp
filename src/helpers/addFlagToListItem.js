

export const addFlagToListItem = (list, flag)=>{

        return list?.map((item)=>{
                item['flag'] = flag;
            return item;
        })

}