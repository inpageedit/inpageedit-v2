<?php
/**
 * InPageEdit Analysis 3.0
 * @author: 机智的小鱼君
 * @tech used: PHP, MongoDB
 */
# ini_set('display_errors', 1);
# error_reporting(-1);
header('content-type:application/json');
header('Access-Control-Allow-Origin:*');

$action = isset($_GET['action']) ? $_GET['action'] : 'view';
$url = isset($_GET['url']) ? $_GET['url'] : false;
$sitename = isset($_GET['sitename']) ? $_GET['sitename'] : false;
$username = isset($_GET['username']) ? $_GET['username'] : false;
$date = isset($_GET['date']) ? $_GET['date'] : false;
$function = isset($_GET['function']) ? $_GET['function'] : false;
$limit = isset($_GET['limit']) ? $_GET['limit'] : 25;
$from = isset($_GET['from']) ? $_GET['from'] : 0;

$res = [];

switch ($action) {

  ## 查询
  case 'view':
  case 'query':
    require_once('@query.php');
    $res = _query($url, $sitename, $username, $date, $limit, $from);
  break;

    case 'log':
    case 'submit':
      require_once('@submit.php');
      $res = _submit($url, $sitename, $username, $function);
  break;

  ## 默认
  default:
    $res = [
      'status' => false,
      'msg' => 'Invalid param(s).',
      $action => ['error' => 'No such action.']
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
