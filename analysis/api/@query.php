<?php
/**
 * 查询函数
 * @param $sitename string Site Name
 * @param $url string SIte URL
 * @return $finalResult array
 */
function _query($sitename, $url)
{
    ## 调用工具类
    require_once('util.mongodb.class.php.php');
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
