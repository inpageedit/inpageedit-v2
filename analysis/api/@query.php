<?php
/**
 * 查询函数
 * @param $sitename string Site name
 * @param $url string SIte URL
 * @param $username string User name (not used)
 * @param $date string Date (not used)
 * @return $finalResult array
 */
function _query($url, $sitename, $username, $date)
{
    ## 调用封装库
    require_once('util.mongodb.class.php');
    $mongoLib = m_mgdb::i("inpageedit");
    $collection = 'test';

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
