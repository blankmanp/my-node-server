# -*- coding: utf-8 -*-
# @Author: blankmanp
# @Date:   2016-03-20 15:47:30
# @Last Modified by:   blankmanp
# @Last Modified time: 2016-03-26 21:29:19
def fib(n):
    result = [0, 1]
    for i in range(n - 2):
        result.append(result[-2] + result[-1])
    return result
