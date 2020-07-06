<?php
/**
 * 查询数据函数
 * @param prop [string] Type of query
 * @param url [string] Site URL
 * @param sitename [string] Site name
 * @param username [string] User name (not use)
 * @param date [string] Date
 * @param limit [num] Query limit (not use)
 * @param from [num] Query skip (not use)
 * @return finalResult [array]
 */
function _query($data)
{
    ## 调用封装库
    require_once('util.mongodb.class.php');
    $mongoLib = m_mgdb::i("inpageedit");
    $collection = 'analysis';
    $collection_date = 'date';

    ## 变量
    $command = [];
    $msg = [];
    $finalResult = [];
    $type = $data['type'];
    $url = $data['url'];
    $sitename = $data['sitename'];
    $username = $data['username'];
    $function = $data['function'];
    $limit = $data['limit'] || 'max';
    $from = $data['from'] || 0;
    if ($limit === 'max'|| $limit > 25) {
        $limit = 25;
    }

    ## 查询哪种数据
    switch ($type) {
        case 'date':
            $msg[] = 'Find dates';
            $command['find'] = $collection_date;
            if ($date) {
                $command['filter'] = ['date' => $date];
            }
            $result = $mongoLib->command($command, []);
            $result = $result->toArray();
        break;
        case 'site':
        case 'wiki':
            $msg[] = 'Find wikis';
            $command['find'] = $collection;
            ## 是否查询特定 Wiki
            if ($sitename) {
                $msg[] = 'Find wiki with sitename: ' . $sitename;
                $command['filter'] = ['sitename' => $sitename];
            } elseif ($url) {
                $msg[] = 'Find wiki with URL: ' . $url;
                $command['filter'] = ['url' => $url];
            }
            ## 查询
            $result = $mongoLib->command($command, []);
            $result = $result->toArray();
            ## 是否设置了日期限制
            if ($date && ($sitename||$url)) {
                if (isset($result[0]->date->$date)) {
                    $msg[] = 'Find ' . $date . ' data on ' . $result[0]->sitename;
                    $result = $result[0]->date->$date;
                } else {
                    $msg[] = 'No data';
                    $result = [];
                }
            }
        break;
        ## type错误
        default:
            $msg[] = 'No such type: ' . $type;
            $finalResult['status'] = false;
            $finalResult['msg'] = $msg;
            $finalResult['query'] = [];
            return $finalResult;
        break;
    }

    $finalResult['status'] = true;
    $msg[] = 'All query done';
    $finalResult['msg'] = $msg;
    $finalResult['query'] = $result;

    ## END
    return $finalResult;
}
