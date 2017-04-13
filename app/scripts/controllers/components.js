
	var componentInfo = [];
 // componentInfo[  'HASH'  ] = ['NAME', 'ENV', 'URL', 'LOGO', 'INFO_FRAME' ],
    componentInfo['3luD8Rvh'] = ['BEUA QA', 'qa', 'https://qa-beua-o2p.equilar.com', '', ''];
    componentInfo['46yW5Us4'] = ['BEUA STAGE', 'stage', 'https://stage-o2p-beua.equilar.com', '', ''];
    componentInfo['4NcuZtp9'] = ['BEUA PROD', 'prod', 'https://beua.equilar.com', '', ''];
    componentInfo['4aT6Puas'] = ['BoardEdge QA', 'qa', 'https://qa-aws-bsp.equilar.com', 'images/logo-boardedge.png', 'boardedge-frame'];
    componentInfo['5741xJ1r'] = ['BoardEdge STAGE', 'stage', 'https://stage-boardedge.equilar.com', 'images/logo-boardedge.png', 'boardedge-frame'];
    componentInfo['2oq3Aswp'] = ['BoardEdge PROD', 'prod', 'https://boardedge.equilar.com', 'images/logo-boardedge.png', 'boardedge-frame'];
    componentInfo['7Yiify8W'] = ['Insight QA', 'qa', 'https://qa-insight-o2p.equilar.com', 'images/logo-insight.svg', 'insight-frame'];
    componentInfo['3ocB7vZh'] = ['Insight STAGE', 'stage', 'https://stage-o2p-insight.equilar.com', 'images/logo-insight.svg', 'insight-frame'];
    componentInfo['45rOONNT'] = ['Insight DEMO', 'stage', 'https://demo-insight.equilar.com', 'images/logo-insight.svg', 'insight-frame'];
    componentInfo['3ZF6HrYu'] = ['Insight PROD', 'prod', 'https://insight.equilar.com', 'images/logo-insight.svg', 'insight-frame'];
    componentInfo['1QNUk4n1'] = ['Survey QA', 'qa', 'https://qa-survey.equilar.com', 'images/logo-survey.svg', 'insight-frame'];
    componentInfo['1iMAt9oB'] = ['Survey STAGE', 'stage', 'https://stage-survey.equilar.com', 'images/logo-survey.svg', 'insight-frame'];
    componentInfo['1vjiV2cZ'] = ['Survey PROD', 'prod', 'https://survey.equilar.com', 'images/logo-survey.svg', 'insight-frame'];
    componentInfo['703Wo6lA'] = ['Engage QA', 'qa', 'https://qa-engage.equilar.com', 'images/logo-engage.png', ''];
    componentInfo['3jPebf23'] = ['Engage STAGE', 'stage', 'https://stage-engage.equilar.com', 'images/logo-engage.png', ''];
    componentInfo['4XbyGOX2'] = ['Engage PROD', 'prod', 'https://engage.equilar.com', 'images/logo-engage.png', ''];
    
    function getCustomLoginRedirectUrl(code) {
    	if (!code) {
    		return null;
    	}
    	var key = code.substring(0, 8);
    	
    	//For insight
    	if (key === '7Yiify8W' || key === '3ocB7vZh' || key === '45rOONNT' || key === '3ZF6HrYu') {
    		return appendSuffixToUrl(code, '/app/login/login2.jsp');
    	}
    	
    	//For Survey
    	if (key === '1QNUk4n1' || key === '1iMAt9oB' || key === '1vjiV2cZ') {
    		return appendSuffixToUrl(code, '/survey/login/login2.jsp');
    	}
    	
    	//For BoardEdge
    	if (key === '4aT6Puas' || key === '5741xJ1r' || key === '2oq3Aswp') {
    		return appendSuffixToUrl(code, '/#/login2');
    	}

		return null;
    }
    
    function getForgotPwdUrl(code) {
      if (!code) {
        return null;
      }

      var key = code.substring(0, 8);
      var env = getEnvironment(key);
      var name = getAppName(key);
      var suffix = '';

      if (name.startsWith("Engage")) {
        suffix = '?isEngage=T';
      }

      if (env === 'qa' ) {
        return 'https://qa-account.equilar.com/reset' + suffix;
      }
      if (env === 'stage' ) {
        return 'https://stage-account.equilar.com/reset' + suffix;
      }
      if (env === 'prod' ) {
        return 'https://account.equilar.com/reset' + suffix;
      }

    return null;
    }

    function appendSuffixToUrl(code, urlSuffix) {
    	var appUrl = getAppUrl(code);
		if (appUrl) {
			return appUrl + urlSuffix;
		}
		return null;
    }

    function getAppName(code) {
    	return getAppData(code, 0);
    }
    
    function getEnvironment(code) {
      return getAppData(code, 1);
    }
    
    function getAppUrl(code) {
      return getAppData(code, 2);
    }
    
    function getAppLogoUrl(code) {
    	return getAppData(code, 3);
    }
    
    function getInfoFrameType(code) {
    	return getAppData(code, 4);
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
    
