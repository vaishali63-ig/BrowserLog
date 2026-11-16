const HistoryFilters = ({profiles,filters,setFilters})=>{
    return(
        <div>
            <select name="" id="profile" value={filters?.historyPath}>
                {
                    profiles.map((p)=>{
                        return <option value={p.historyPath}>p.name</option>
                    })
                }
            </select>
            <input value={filters?.searchString} type="text" placeholder="enter search text" />
            <input value={filters?.limit} type="text" placeholder="enter limit" />
            <input value={filters?.offset} type="text" placeholder="enter offset" />
        </div>
    )
}

export default HistoryFilters;