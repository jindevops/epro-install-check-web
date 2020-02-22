/** 기기 정보 */
var DEVICE_TYPE = {
    ANDROID: 'android',
    IPHONE: 'iphone',
    ETC: 'etc'
}

/** 
 * 안드로이드 버전 문턱 값
 */
var ANDROID_THRESHOLD = {
    type: DEVICE_TYPE.ANDROID,
    version: 5
};

/**
 * 아이폰 버전 문턱 값
 */
var IPHONE_THRESHOLD = null;
// var IPHONE_THRESHOLD = {
//     type: DEVICE_TYPE.IPHONE,
//     version: '10_1'
// };

function getDeviceInfo() {
    var userAgent = navigator.userAgent.toLocaleLowerCase(); 
    var result = {
        type: null,
        version: null,
        userAgent: null,
        isAvailable: null
    }
    if ( userAgent.indexOf(DEVICE_TYPE.ANDROID) >= 0 ) { 
        var androidVersion = userAgent.slice(userAgent.indexOf("android")+8).split(';')[0]; 
        result.type = DEVICE_TYPE.ANDROID;
        result.version = parseFloat(androidVersion);
        result.isAvailable = checkAndroid(result);
        result.userAgent = userAgent;
    } else if ( userAgent.indexOf(DEVICE_TYPE.IPHONE) >= 0 ) {
        var iPhoneVerion =  userAgent.slice(userAgent.indexOf("iphone os ")+10).split(' ')[0];
        result.type = DEVICE_TYPE.IPHONE;
        result.version = iPhoneVerion;
        result.isAvailable = checkIPhone(result);
        result.userAgent = userAgent;
    } else {
        result.type = DEVICE_TYPE.ETC;
        result.version = '미분류';
        result.useAgent = userAgent;
        result.isAvailable = false;
    }

    return result;
}

function checkAndroid(result) {
    var isAvailable = false;
    var threshold = ANDROID_THRESHOLD;
    if (threshold && threshold.type === result.type) {
        if (result.version - threshold.version >= 0) {
            isAvailable = true;
        }
    }
    return isAvailable;
}

function checkIPhone(result) {
    var isAvailable = false;
    var threshold = IPHONE_THRESHOLD;
    if (threshold && threshold.type === result.type) {
        var resultVerSplit = result.version.split('_').map(elem => parseInt(elem));
        var thresholdVerSplit = threshold.version.split('_').map(elem => parseInt(elem));
        // 앞자리 큰 경우
        if (resultVerSplit[0] - thresholdVerSplit[0] > 0) {
            isAvailable = true;
        }
        // 앞자리 같은 경우
        else if (resultVerSplit[0] === thresholdVerSplit[0] && resultVerSplit[1] - thresholdVerSplit[1] >= 0) {
            isAvailable = true;
        }
    }
    return isAvailable;
}
