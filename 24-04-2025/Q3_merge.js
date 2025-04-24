/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    let p = m-1;
    let q = n-1;
    let check = m+n-1;
    while(p>=0 && q>=0){
        if(nums1[p]>nums2[q]){
            nums1[check] = nums1[p];
            p--;
        }else{
            nums1[check] = nums2[q];
            q--;
        }
        check--;
    }
    while(q >= 0){
        nums1[check] = nums2[q];
        q--;
        check--;
    }
};
