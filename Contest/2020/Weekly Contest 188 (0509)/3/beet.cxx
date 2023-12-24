/**
 * 5.9 night
 * https://leetcode.com/contest/weekly-contest-188/problems/minimum-time-to-collect-all-apples-in-a-tree/
 * https://leetcode.com/problems/minimum-time-to-collect-all-apples-in-a-tree/  Tree
 * 
 * have to run in C++14 for decltype
 * https://en.cppreference.com/w/cpp/language/decltype
 * 
 * C++ versions
 * https://www.quora.com/What-are-the-list-of-versions-of-C++
 */
#include <iostream>
#include <vector>
using namespace std;

class Solution
{

    template <typename F>
    struct FixPoint : F
    {
        FixPoint(F &&f) : F(forward<F>(f)) {}
        template <typename... Args>
        decltype(auto) operator()(Args &&... args) const
        {
            return F::operator()(*this, forward<Args>(args)...);
        }
    };
    template <typename F>
    inline decltype(auto) MFP(F &&f)
    {
        return FixPoint<F>{forward<F>(f)};
    }

public:
    int minTime(int n, vector<vector<int>> &edges, vector<bool> &hasApple)
    {
        vector<vector<int>> G(n);
        for (auto vs : edges)
        {
            G[vs[0]].emplace_back(vs[1]);
            G[vs[1]].emplace_back(vs[0]);
        }
        int ans = 0;
        MFP([&](auto dfs, int v, int p) -> int {
            int res = hasApple[v];
            for (int u : G[v])
                if (u != p)
                    res |= dfs(u, v);
            if (res)
                ans++;
            return res;
        })
        (0, -1);
        if (ans)
            ans = (ans - 1) * 2;
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