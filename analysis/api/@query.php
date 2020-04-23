<?php
/**
 * 查询数据函数
 * @param url [string] Site URL
 * @param sitename [string] Site name
 * @param username [string] User name (not use)
 * @param date [string] Date (not use)
 * @param limit [num] Query limit (not use)
 * @param from [num] Query skip (not use)
 * @return finalResult [array]
 */
function _query($url, $sitename, $username, $date, $limit, $from)
{
    ## 调用封装库
    require_once('util.mongodb.class.php');
    $mongoLib = m_mgdb::i("inpageedit");
    $collection = 'analysis';

    ## 变量
    $command = [];
    $command['find'] = $collection;
    $finalResult = [];
    $finalResult['status'] = true;

    if ($sitename) {
        $command['filter'] = [
            'sitename' => $sitename
        ];
    } elseif ($url) {
        $command['filter'] = [
            'url' => $url
        ];
    }

    $resultSite = $mongoLib->command($command, []);
    $resultSite = $resultSite->toArray();

    $finalResult['msg'] = 'All query done.';
    $finalResult['query'] = $resultSite;

    ## END
    return $finalResult;
}