export const countIssuesByPriority = (issues) => {
    if(issues){
        let criticalCount = 0
        let importantCount = 0
        let normalCount = 0
        let lowCount = 0
        
        issues.forEach(({priority}) => {
            switch (priority) {
                case 'Critical': criticalCount++; break;
                case 'Important': importantCount++; break;
                case 'Normal': normalCount++; break;
                case 'Low': lowCount++; break;
                default:console.error('unexpected priority type'); break;
            }
        })
        return [criticalCount, importantCount, normalCount, lowCount]
    } else{
        return [0,0,0,0]
    }
}

