
	var componentInfo = [];
 // componentInfo[ 'HASH'] = ['NAME', 'URL', 'LOGO' ],
    componentInfo['3luD8Rvh'] = ['BEUA QA', 'https://qa-beua.equilar.com', ''];
    componentInfo['46yW5Us4'] = ['BEUA STAGE', 'https://stage-beua.equilar.com', ''];
    componentInfo['5gIMTdT1'] = ['BEUA DEMO', 'https://demo-beua.equilar.com', ''];
    componentInfo['4NcuZtp9'] = ['BEUA PROD', 'https://beua.equilar.com', ''];
    componentInfo['4aT6Puas'] = ['BoardEdge QA', 'https://qa-aws-bsp.equilar.com', 'images/logo-boardedge.svg'];
    componentInfo['5741xJ1r'] = ['BoardEdge STAGE', 'https://stage-boardedge.equilar.com', 'images/logo-boardedge.svg'];
    componentInfo['2oq3Aswp'] = ['BoardEdge PROD', 'https://boardedge.equilar.com', 'images/logo-boardedge.svg'];
    componentInfo['7Yiify8W'] = ['Insight QA', 'https://qa-insight.equilar.com', 'images/logo-insight.svg'];
    componentInfo['3ocB7vZh'] = ['Insight STAGE', 'https://stage-insight.equilar.com', 'images/logo-insight.svg'];
    componentInfo['45rOONNT'] = ['Insight DEMO', 'https://demo-insight.equilar.com', 'images/logo-insight.svg'];
    componentInfo['3ZF6HrYu'] = ['Insight PROD', 'https://insight.equilar.com', 'images/logo-insight.svg'];
    componentInfo['1QNUk4n1'] = ['Survey QA', 'https://qa-survey.equilar.com', 'images/logo-survey.svg'];
    componentInfo['1iMAt9oB'] = ['Survey STAGE', 'https://stage-survey.equilar.com', 'images/logo-survey.svg'];
    componentInfo['1vjiV2cZ'] = ['Survey PROD', 'https://survey.equilar.com', 'images/logo-survey.svg'];
    
    function getAppName(code) {
    	return getAppData(code, 0);
    }
    
    function getAppUrl(code) {
    	return getAppData(code, 1);
    }
    
    function getAppLogoUrl(code) {
    	return getAppData(code, 2);
    }
    
    function getAppData(code, index) {
    	if (!code) {
    		return null;
    	}
    	var key = code.substring(0, 8);
    	var appData = componentInfo[key];
    	if (!appData) {
    		return null;
    	}
    	return appData[index];
    }
    
    function getAppCode(appObj) {
    	$.each(appObj, function(key, value) {
       	   return key;
         });
    	return null;
    }
    
