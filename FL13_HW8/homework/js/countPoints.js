function countPoints(arr) {
    let points = 0;
    for (let count of arr) {
        let nums = count.split(':');
        if(Number(nums[0]) > Number(nums[1])) {
            points += 3;
        } else if(Number(nums[0]) === Number(nums[1])) {
            points += 1;
        }
    }
    return points;
}
console.log(countPoints(['1:1', '1:2', '2:0', '4:2', '0:1', '2:3', '1:1', '0:1', '1:1', '3:0']));