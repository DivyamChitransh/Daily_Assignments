var lengthOfLongestSubstring = function (s) {
    let map = new Array(256).fill(-1);
    let length = 0, left = 0, right = 0, n = s.length;

    while (right < n) {
        if (map[s.charCodeAt(right)] !== -1) {
            left = Math.max(map[s.charCodeAt(right)] + 1, left);
        }
        map[s.charCodeAt(right)] = right;
        length = Math.max(length, right - left + 1);
        right++;
    }
    return length;
};