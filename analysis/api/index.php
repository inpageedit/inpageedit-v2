<?php
/**
 * InPageEdit Analysis 3.0
 * @author: 机智的小鱼君
 * @tech used: PHP, MongoDB
 */

// ini_set('display_errors', 1);
// error_reporting(-1);
header('content-type:application/json');
header('Access-Control-Allow-Origin:*');

if (isset($_GET['action'])) {
    $action = $_GET['action'];
} elseif (isset($_POST['action'])) {
    $action = $_POST['action'];
} else {
    $action =  'view';
}

$res = [];

switch ($action) {

  ## 查询
  case '':
  case 'view':
    $res = [
      'status' => true,
      'msg' => [
        'Hello World!'
      ],
      'error' => 'No action param'
    ];
  break;
  case 'query':
    require_once('@query.php');
    $res = _query($_GET);
  break;

    case 'log':
    case 'submit':
      require_once('@submit.php');
      $res = _submit($_POST);
  break;

  ## 默认
  default:
    $res = [
      'status' => false,
      'msg' => [
        'Invalid action: ' . $action
      ],
      $action => ['error' => 'No such action.']
    ];
    break;

}

## 加点骚话
$res['msg'][] = 'InPageEdit Analysis 3.0';
$res['msg'][] = 'Powered by MongoDB & PHP';
$res['msg'][] = 'Author: 机智的小鱼君';

// 美化输出
if (isset($_GET['pretty'])) {
    $json = json_encode($res, JSON_PRETTY_PRINT);
} else {
    $json = json_encode($res);
}
// JSONP
if (isset($_GET['callback'])) {
    echo $_GET['callback'] . '(' . $json . ')';
} else {
    echo $json;
}
