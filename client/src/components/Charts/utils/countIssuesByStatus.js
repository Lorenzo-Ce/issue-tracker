export const countIssuesByStatus = (issues) => {
    if(issues){
        let openCount = 0
        let pausedCount = 0
        let closedCount = 0
        
        issues.forEach(({status}) => {
            switch (status) {
                case 'Open': openCount++; break;
                case 'Paused': pausedCount++; break;
                case 'Closed': closedCount++; break;
                default:console.error('unexpected status type'); break;
            }
        })
        return [openCount, pausedCount, closedCount]
    } else{
        return [0,0,0]
    }
}

