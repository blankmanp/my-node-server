/*
* @Author: blankmanp
* @Date:   2016-03-26 22:05:38
* @Last Modified by:   blankmanp
* @Last Modified time: 2016-04-01 15:18:13
*/

'use strict';

let Util = {
    draw: (arr, canvas) => {
        let width = canvas.width;
        let height = canvas.height;
        let len = arr.length;
        let lineWidth = width / len;
        let lineHeight = height / 100;
        let ctx = canvas.getContext('2d');
        for (let i = 0; i < len; i ++) {
            let y = arr[i] * lineHeight;
            let xBefore = lineWidht * i;
            ctx.fillStyle = '#dddddd';
            ctx.fillRect(xBefore, 20, lineWidth - 1, y);
            ctx.fillText(arr[i], xBefore, 20);
        }
    }
}

let Sort = {
    bubble: async (arr, canvas) => {
        let len = arr.length;
        for (let i = 1; i < len; i ++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                arr[j] = key;
                j --;
                await Util.draw(arr, canvas);
            }
        }
        return arr;
    }
}
