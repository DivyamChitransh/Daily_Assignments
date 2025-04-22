// Binary Search 

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(arr, k) {
    let left = 0
    let right = arr.length-1

    while(left<=right){
        let mid = Math.floor((left+right)/2);
        if(arr[mid] === k){
            return mid;
        }
        if(arr[left]<=arr[mid]){
            if(arr[left]<=k && k<arr[mid]){
                right = mid-1;
            }else{
                left = mid+1;
            }
        }else{
            if(arr[mid]<k && k<=arr[right]){
                left = mid+1;
            }else{
                right = mid-1;
            }
        }
    }
    return -1;
};