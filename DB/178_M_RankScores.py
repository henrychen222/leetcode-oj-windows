"""
08/20/26 afternoon
https://leetcode.com/problems/rank-scores/
"""

import pandas as pd

# Accepted
def order_scores1(scores: pd.DataFrame) -> pd.DataFrame:
    data = scores.to_dict()['score']
    sortData = sorted(data.items(), key=lambda item: item[1], reverse=True)
    # print(data)
    # print(sortData)
    ranks = []
    pre = -1
    rank = 0
    rankScores = []
    for item in sortData:
        vals = item[1]
        rankScores.append(vals)
        if vals != pre:
            rank += 1
        ranks.append(rank)
        pre = vals
        # print(f'vals: {vals}, pre: {pre}, rank: {rank}')
    rankScores.sort(reverse=True)
    res = {'score': rankScores, 'rank': ranks}
    return pd.DataFrame(res)

# Accepted https://leetcode.com/problems/rank-scores/solutions/6405523/easy-pandas-by-scsharma92-g94d/
def order_scores(scores: pd.DataFrame) -> pd.DataFrame:
    scores['rank'] = scores.score.rank(ascending=False, method='dense')
    res = scores[["score", "rank"]].sort_values(by=["rank"], ascending=True) # 按排名升序排序
    return res

if __name__ == '__main__':
    scores = {
        'id': [1, 2, 3, 4, 5, 6],
        'score': [3.5, 3.65, 4, 3.85, 4, 3.65]
    }
    print(order_scores(pd.DataFrame(scores)))
