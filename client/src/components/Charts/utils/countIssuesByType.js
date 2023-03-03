export const countIssuesByType = (issues) => {
    if(issues){
        let featureCount = 0
        let bugCount = 0
        let todoCount = 0
        let designCount = 0
        
        issues.forEach(({label}) => {
            switch (label) {
                case 'Feature': featureCount++; break;
                case 'Bug': bugCount++; break;
                case 'Todo': todoCount++; break;
                case 'Design': designCount++; break;
                default:console.error('unexpected issue type'); break;
            }
        })
        return [featureCount, bugCount, todoCount, designCount]
    } else{
        return [0,0,0,0]
    }
}

