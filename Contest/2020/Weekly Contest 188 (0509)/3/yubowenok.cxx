/**
 * 5.9 night
 * https://leetcode.com/contest/weekly-contest-188/problems/minimum-time-to-collect-all-apples-in-a-tree/
 * https://leetcode.com/problems/minimum-time-to-collect-all-apples-in-a-tree/  Tree
 */
#include <iostream>
#include <vector>
using namespace std;

typedef long long ll;
typedef vector<int> VI;
typedef pair<int, int> PII;

#define REP(i, s, t) for (int i = (s); i < (t); i++)
#define FILL(x, v) memset(x, v, sizeof(x))

const int INF = (int)1E9;
#define MAXN 100005

VI child[MAXN];
class Solution
{
public:
    vector<bool> hasApp;
    int dfs(int x)
    {
        int sol = 0;
        REP(i, 0, child[x].size())
        {
            int y = child[x][i];
            int cc = dfs(y);
            if (cc != 0)
            {
                sol += 2;
                if (cc > 0)
                    sol += cc;
            }
        }
        if (sol == 0 && hasApp[x])
            return -1;
        return sol;
    }
    int minTime(int n, vector<vector<int>> &es, vector<bool> &app)
    {
        REP(i, 0, n)
        child[i].clear();
        hasApp = app;
        REP(i, 0, es.size())
        child[es[i][0]].push_back(es[i][1]);
        int ans = dfs(0);
        if (ans == -1)
            return 0;
        return ans;
    }
};

int main()
{
    Solution s;

    // Example One
    int n = 7;
    vector<vector<int>> edges;
    vector<int> edge1_exampleOne;
    edge1_exampleOne.push_back(0);
    edge1_exampleOne.push_back(1);
    vector<int> edge2_exampleOne;
    edge2_exampleOne.push_back(0);
    edge2_exampleOne.push_back(2);
    vector<int> edge3_exampleOne;
    edge3_exampleOne.push_back(1);
    edge3_exampleOne.push_back(4);
    vector<int> edge4_exampleOne;
    edge4_exampleOne.push_back(1);
    edge4_exampleOne.push_back(5);
    vector<int> edge5_exampleOne;
    edge5_exampleOne.push_back(2);
    edge5_exampleOne.push_back(3);
    vector<int> edge6_exampleOne;
    edge6_exampleOne.push_back(2);
    edge6_exampleOne.push_back(6);
    edges.push_back(edge1_exampleOne);
    edges.push_back(edge2_exampleOne);
    edges.push_back(edge3_exampleOne);
    edges.push_back(edge4_exampleOne);
    edges.push_back(edge5_exampleOne);
    edges.push_back(edge6_exampleOne);
    vector<bool> hasApple;
    hasApple.push_back(false);
    hasApple.push_back(false);
    hasApple.push_back(true);
    hasApple.push_back(false);
    hasApple.push_back(true);
    hasApple.push_back(true);
    hasApple.push_back(false);

    // Example Two
    vector<bool> hasApple2;
    hasApple2.push_back(false);
    hasApple2.push_back(false);
    hasApple2.push_back(true);
    hasApple2.push_back(false);
    hasApple2.push_back(false);
    hasApple2.push_back(true);
    hasApple2.push_back(false);

    // Example Three
    vector<bool> hasApple3;
    hasApple3.push_back(false);
    hasApple3.push_back(false);
    hasApple3.push_back(false);
    hasApple3.push_back(false);
    hasApple3.push_back(false);
    hasApple3.push_back(false);
    hasApple3.push_back(false);

    cout << s.minTime(n, edges, hasApple) << endl;  // 8
    cout << s.minTime(n, edges, hasApple2) << endl; // 6
    cout << s.minTime(n, edges, hasApple3) << endl; // 0
}