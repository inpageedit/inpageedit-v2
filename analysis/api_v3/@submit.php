<?php
/**
 * 录入数据函数
 * @param blahblah 懒得写，参数都是字面意思
 * Logs:
 * - 2020年4月22日
 *   - 初次发布
 * - 2020年4月23日
 *   - [破坏性更新]改变数据结构
 */
function _submit($data)
{
    ## 调用封装库
    require_once('util.mongodb.class.php');
    $mongoLib = m_mgdb::i("inpageedit");
    $collection = 'analysis';
    $collection_date = 'date';

    ## 变量
    $command = [];
    $insert = [];
    $msg = [];
    $finalResult = [];
    $today = date('Y-m-d');
    $url = $data['url'];
    $sitename = $data['sitename'];
    $username = $data['username'];
    $function = $data['function'];
    $limit = $data['limit'] || 'max';
    $from = $data['from'] || 0;
    if ($limit === 'max'|| $limit > 25) {
        $limit = 25;
    }

    ## 参数有误
    if (!$url||!$sitename||!$username||!$function) {
        $finalResult['status'] = false;
        $msg = 'Missing param(s):';
        if (!$url) {
            $msg = $msg . ' url ';
        }
        if (!$sitename) {
            $msg = $msg . ' sitename ';
        }
        if (!$username) {
            $msg = $msg . ' user ';
        }
        if (!$function) {
            $msg = $msg . ' function';
        }
        $msg = trim($msg) . '.';
        $finalResult['msg'][0] = 'FAIL';
        $finalResult['msg'][1] = $msg;
        $finalResult['submit'] = [];
        return $finalResult;
    }

    ## 查询 Wiki
    $query = $mongoLib->command([
      'find'=>$collection,
      'filter' => [
        '_id' => $url
      ]
    ], []);
    $query = $query->toArray();

    if (empty($query)) {
        ## Wiki不存在，增设该数据表
        $insert = array(
            '_id' => $url,
            'url' => $url,
            'sitename' => $sitename,
            '_total' => 1,
            'date' => array(
                $today => array(
                    '_total' => 1,
                    $function => 1
                )
            ),
            'functions' => array(
                $function => 1
            ),
            'users' => array(
                $username => array(
                    '_total' => 1,
                    'date' => array(
                        $today => array(
                            '_total' => 1,
                            $function => 1
                        )
                    ),
                    'functions' => array(
                        $function => 1
                    )
                )
            )
        );

        $dbres = $mongoLib->insert($collection, [$insert]);
        $msg[0] = 'SUCCESS';
        $msg[] = 'New Wiki inserted.';
        $finalResult['submit'] = $insert;
        $finalResult['status'] = true;
    } else {
        ## Wiki存在，下一步
        $query = $query[0];
        $times = 0;
        $settingdata = [];
        $msg = [];
        $msg[0] = 'SUCCESS';
        ## 蛇皮操作转换数组，防止抑郁
        $query = json_encode($query);
        $query = json_decode($query, true);

        /** 先把总数加一 **/
        $query['_total']++;

        /** date环节 **/
        ## 当日是否[未]被记录
        if (!isset($query['date'][$today])) {
            ## 未记录，初始化
            $msg[] = 'New date logged.';
            $query['date'][$today]['_total'] = 0;
            $query['date'][$today][$function] = 0;
        }
        if (!isset($query['date'][$today][$function])) {
            $msg[] = 'New date → function logged.';
            $query['date'][$today][$function] = 0;
        }
        ## 喜加一
        $query['date'][$today]['_total']++;
        $query['date'][$today][$function]++;

        /** functions环节 */
        ## 该功能是否[未]被记录
        if (!isset($query['functions'][$function])) {
            ## 未记录，初始化
            $msg[] = 'New function logged.';
            $query['functions'][$function] = 0;
        }
        ## 喜加一
        $query['functions'][$function]++;

        /** users环节 **/
        ## 该用户是否[未]被记载
        if (!isset($query['users'][$username])) {
            ## 未记载该用户，初始化
            $msg[] = 'New user added.';
            $query['users'][$username] = array(
                '_total' => 0,
                'date' => array(
                    $today => array(
                        '_total' => 0,
                        $function => 0
                    )
                ),
                'functions' => array(
                    $function => 0
                )
            );
        }
        ## 该用户当日是否[未]被记载
        if (!isset($query['users'][$username]['date'][$today])) {
            ## 当日未记载，初始化
            $msg[] = 'New user → date logged.';
            $query['users'][$username]['date'][$today] = array(
                '_total' => 0,
                $function => 0
            );
        }
        if (!isset($query['users'][$username]['date'][$today][$function])) {
            $msg[] = 'New user → date → function logged.';
            $query['users'][$username]['date'][$today][$function] = 0;
        }
        ## 该用户是否[未]使用过该功能
        if (!isset($query['users'][$username]['functions'][$function])) {
            ## 没使用过，初始化
            $msg[] = 'New user → function logged.';
            $query['users'][$username]['functions'][$function] = 0;
        }
        ## users开始疯狂喜加一
        $query['users'][$username]['_total']++;
        $query['users'][$username]['date'][$today]['_total']++;
        $query['users'][$username]['date'][$today][$function]++;
        $query['users'][$username]['functions'][$function]++;

        ## 设定查询参数
        # 更新数据
        // $settingdata = [$query]; // 不太好用
        $settingdata = [
            '_total' => $query['_total'],
            'date' => $query['date'],
            'functions' => $query['functions'],
            'users' => $query['users']
        ];
        # 查询语句
        $updates = [
            [
                'q' => ['_id' => $url],
                'u' => ['$set'=>
                    $settingdata
                ]
            ]
        ];
        # 走你
        $mongoLib->update($collection, $updates);

        $finalResult['submit'] = $settingdata;
    }

    /** 记录本日次数 **/
    $queryDate = $mongoLib->command([
        'find'=> $collection_date,
        'filter' => [
          '_id' => $today
        ]
    ], []);
    $queryDate = $queryDate->toArray();
    $queryDate = $queryDate[0];

    ## 当日是否为空
    if (empty($queryDate)) {
        ## 建立一个
        $msg[] = 'Insert new date to date collection.';
        $mongoLib->insert($collection_date, [
            [
                '_id' => $today,
                'date' => $today,
                'times' => 1
            ]
        ]);
    } else {
        ## 蛇皮操作转换数组，防止抑郁
        $queryDate = json_encode($queryDate);
        $queryDate = json_decode($queryDate, true);
        $queryDate['times']++;
        $mongoLib->update($collection_date, [
            [
                'q' => ['_id' => $today],
                'u' => ['$set'=>
                    [
                        'times' => $queryDate['times']
                    ]
                ]
            ]
        ]);
    }

    $msg[] = 'All data submitted.';
    $finalResult['status'] = true;

    ## 完事，我爱MongoDB
    $finalResult['msg'] = $msg;
    return $finalResult;
}

# 作者的话：终于在一宿没睡，2020年4月22日凌晨7点整搞定了这个模块
# 最大的坎卡在了查询语句上，万万没想到mgdb是直接用{'data.foo.bar':'value'}
# 这样的方式给子元素赋值，我特么试了好久的json！坑死我了。
# 就是这个坎，卡了我好久，一迈过去瞬间整个人都舒服了。
# 真的，当发现数据库里的数据终于如我所愿的变化的一瞬间，
# 我差点就哭了。另外，我感觉我的头发又少了许多……
