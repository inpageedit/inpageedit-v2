<?php
/**
 * InPageEdit Analysis 3.0
 * @Author: 机智的小鱼君
 * @Tech Used: PHP, MongoDB
 */

# ini_set('display_errors', 1);
# error_reporting(-1);
header('content-type:application/json');
header('Access-Control-Allow-Origin:*');

$action = isset($_GET['action']) ? $_GET['action'] : 'view';

$res = [];

switch ($action) {

  ## 查询
  case 'view':
  case 'query':
    require_once('@query.php');
    $sitename = isset($_GET['sitename']) ? $_GET['sitename'] : false;
    $url = isset($_GET['url']) ? $_GET['url'] : false;
    $res = _query($sitename, $url);
    break;

    case 'log':
      require_once('@log.php');
      $url = isset($_GET['url']) ? $_GET['url'] : false;
      $sitename = isset($_GET['sitename']) ? $_GET['sitename'] : false;
      $username = isset($_GET['username']) ? $_GET['username'] : false;
      $function = isset($_GET['function']) ? $_GET['function'] : false;
      $res = _log($url, $sitename, $username, $function);
    break;

  ## 默认
  default:
    $res = [
      'status' => false,
      'msg' => 'Invalid action.'
    ];
    break;

}

// 美化输出
if ( isset($_GET['pretty']) ) {
  $json = json_encode($res, JSON_PRETTY_PRINT);
} else {
  $json = json_encode($res);
}
// JSONP
if ( isset($_GET['callback']) ) {
  echo $_GET['callback'] . '(' . $json . ')';
} else {
  echo $json;
}
