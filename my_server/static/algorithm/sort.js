/*
* @Author: blankmanp
* @Date:   2016-03-26 22:05:38
* @Last Modified by:   blankmanp
* @Last Modified time: 2016-04-04 23:24:04
*/

'use strict';

let Util = {
    draw: function (arr, canvas) {
        console.log(arr);
        let width = canvas.width;
        let height = canvas.height;
        let len = arr.length;
        let lineWidth = width / len;
        let lineHeight = height / 100;
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < len; i ++) {
            let y = arr[i] * lineHeight;
            let xBefore = lineWidth * i;
            ctx.fillStyle = '#dddddd';
            ctx.fillRect(xBefore, 20, lineWidth - 1, y);
            ctx.font = "30px Georigia";
            ctx.fillText(arr[i], xBefore, 20);
        }
    },

    sleep: function(ms) {
        let date = new Date();
        let cur = null;
        do { cur = new Date(); }
        while (cur - date < ms);
    }
}

let Sort = {
    bubble: async function (arr, canvas) {
        Util.draw(arr, canvas);
        let len = arr.length;
        let time = 1;
        for (let i = 1; i < len; i ++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                arr[j] = key;
                j --;
                // deep clone the arr
                let temp = arr.slice();
                setTimeout(function(arr, canvas) { Util.draw( arr, canvas ) }.bind(this, temp, canvas), 1000 * time ++);
            }
        }
        return arr;
    }
}
