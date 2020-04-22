<?php
/**
 * 录入数据函数
 * @param blahblah 懒得写，参数都是字面意思
 */
function _submit($url, $sitename, $username, $function)
{
    ## 调用封装库
    require_once('util.mongodb.class.php');
    $mongoLib = m_mgdb::i("inpageedit");
    $collection = 'analysis';


    ## 变量
    $command = [];
    $insert = [];
    $finalResult = [];

    ## 参数有误
    if (!$url||!$sitename||!$username||!$function) {
        $finalResult['status'] = false;
        $msg = 'Missing param(s):';
        if (!$url) { $msg = $msg . ' url '; }
        if (!$sitename) { $msg = $msg . ' sitename '; }
        if (!$username) { $msg = $msg . ' user '; }
        if (!$function) { $msg = $msg . ' function'; }
        $finalResult['msg'] = $msg . '.';
        return $finalResult;
    }

    ## 查询
    $query = $mongoLib->command([
      'find'=>$collection,
      'filter'=> [
        'url'=>$url
      ]
    ],[]);
    $query = $query->toArray();

    if (empty($query)) {
        ## Wiki不存在，增设该数据表
        $insert = array(
            'url' => $url,
            'sitename' => $sitename,
            'date' => array(
                date('Y-m-d') => array(
                    $username => array(
                        $function => 1
                    )
                )
            )
        );

        $dbres = $mongoLib->insert($collection, [$insert]);
        $finalResult['msg'] = 'New Wiki inserted.';
        $finalResult['submit'] = $insert;
        $finalResult['status'] = true;

    } else {
        ## Wiki存在，下一步
        $query = $query[0];
        $times = 0;
        $settingdata = [];
        ## 蛇皮操作转换数组，防止抑郁
        $query = json_encode($query);
        $query = json_decode($query, true);

       ## 是否含有该用户使用该功能的数据
       if ( isset($query['date'][date('Y-m-d')][$username][$function]) ) {
           ## 有数据，喜加一
           $finalResult['msg'] = 'Ok.';

           $times = $query['date'][date('Y-m-d')][$username][$function];
           $times = $times + 1;
           $query['date'][date('Y-m-d')][$username][$function] = $times;

       } else {
           ## 没有该用户该功能的数据，次数初始化为1
           $times = 1;
           $msg = '';
           if ( !isset($query['date'][date('Y-m-d')]) ) {$msg = 'New date logged.';}
           if ( !isset($query['date'][date('Y-m-d')][$username]) ) {$msg = $msg . ' New user added. ';}
           if ( !isset($query['date'][date('Y-m-d')][$username][$function]) ) {$msg = $msg . ' New function logged.';}
           $finalResult['msg'] = $msg;
       }
        $query['date'][date('Y-m-d')][$username][$function] = $times;
        $settingdata = ['date'=>$query['date']];

        $updates = [
            [
                'q' => ['url' => $url],
                'u' => ['$set'=>
                    $settingdata
                ]
            ]
        ];
        $mongoLib->update($collection,$updates);

        $finalResult['status'] = true;
        $finalResult['submit'] = $settingdata;
        # $finalResult = $query;
    }

    ## 完事，我爱MongoDB
    return $finalResult;
}

# 作者的话：终于在一宿没睡，2020年4月22日凌晨7点整搞定了这个模块
# 最大的坎卡在了查询语句上，万万没想到mgdb是直接用{'data.foo.bar':'value'}
# 这样的方式给子元素赋值，我特么试了好久的json！坑死我了。
# 就是这个坎，卡了我好久，一迈过去瞬间整个人都舒服了。
# 真的，当发现数据库里的数据终于如我所愿的变化的一瞬间，
# 我差点就哭了。另外，我感觉我的头发又少了许多……
