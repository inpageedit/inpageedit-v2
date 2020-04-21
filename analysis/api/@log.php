<?php
/**
 * 录入数据函数
 * @param 懒得写，参数都是字面意思
 */
function _log($url, $sitename, $username, $function)
{
    ## 调用工具类
    require_once('/data/wwwroot/util/util.mongodb.class.php');
    $mongoLib = m_mgdb::i("inpageedit");
    $collection = 'test';

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
            'users' => array(
                $username => array(
                    $function => 1
                )
            )
        );

        $dbres = $mongoLib->insert($collection, [$insert]);
        $finalResult['msg'] = 'New Wiki inserted.';
        $finalResult['status'] = true;

    } else {
        ## Wiki存在，下一步
        $query = $query[0];
        $times = 1;
        ## 蛇皮操作转换数组，防止抑郁
        $query = json_encode($query);
        $query = json_decode($query, true);

       ## 是否含有该用户的数据
       if ( isset($query['users'][$username]) ) {
           ## 有该用户数据
           ## 是否有该功能记录
           if ( isset($query['users'][$username][$function]) ) {
               ## 不容易不容易，喜加一
               $times = $query['users'][$username][$function];
               $times = $times + 1;

               $finalResult['msg'] = 'Ok.';
           } else {
               $times = 1;
               $finalResult['msg'] = 'User using new function.';
           }
       } else {
           ## 没有该用户数据，插就完了
           $finalResult['msg'] = 'New user added.';
           $times = 1;
       }

        $updates = [
            [
                'q' => ['url' => $url],
                'u' => ['$set'=>['users.'.$username.'.'.$function=>$times]]
            ]
        ];
        $mongoLib->update($collection,$updates);

        $finalResult['status'] = true;
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
