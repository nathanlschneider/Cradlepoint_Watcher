if (newArr.length > expiredData ) {
changeType = 'gained';
diff(newArr, expiredData);
} else {
changeType = 'lost';
diff (expiredData, newArr);
}



function diff(biggerArr, smallerArr){
biggerArr.forEach(function(slice){
    var resulter = smallerArr.includes(slice);
	if (changeType === 'gained') {
		add yellowborder class
    } else {
		add opcity class
}
})
}
