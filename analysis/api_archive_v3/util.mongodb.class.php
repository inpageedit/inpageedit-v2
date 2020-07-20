<?php
 
 
/**
 * mongoDB 简单封装
 * 请注意：mongoDB 支持版本 3.2+
 * 具体参数及相关定义请参见： https://docs.mongodb.com/manual/reference/command/
 *
 * @author color_wind
 */
final class m_mgdb
{
 
 
    //--------------  定义变量  --------------//
    private static $ins     = [];
    private static $def     = "default";
    private $_conn          = null;
    private $_db            = null;
    private static $_config = [
        "inpageedit" => ["url" => "mongodb://<dbuser>:<dbpassword>@localhost:27017","dbname" => "<dbname>"]
    ];
 
 
    /**
     * 创建实例
     * @param  string $confkey
     * @return \m_mgdb
     */
    public static function i($confkey = null)
    {
        if (!$confkey) {
            $confkey = self::$def;
        }
        if (!isset(self::$ins[$confkey]) && ($conf = self::$_config[$confkey])) {
            $m = new m_mgdb($conf);
            self::$ins[$confkey] = $m;
        }
        return self::$ins[$confkey];
    }
 
 
    /**
     * 构造方法
     * 单例模式
     */
    private function __construct(array $conf)
    {
        $this->_conn = new MongoDB\Driver\Manager($conf["url"]."/{$conf["dbname"]}");
        $this->_db   = $conf["dbname"];
    }
 
 
    /**
     * 插入数据
     * @param  string $collname
     * @param  array  $documents    [["name"=>"values", ...], ...]
     * @param  array  $writeOps     ["ordered"=>boolean,"writeConcern"=>array]
     * @return \MongoDB\Driver\Cursor
     */
    public function insert($collname, array $documents, array $writeOps = [])
    {
        $cmd = [
            "insert"    => $collname,
            "documents" => $documents,
        ];
        $cmd += $writeOps;
        return $this->command($cmd);
    }
 
 
    /**
     * 删除数据
     * @param  string $collname
     * @param  array  $deletes      [["q"=>query,"limit"=>int], ...]
     * @param  array  $writeOps     ["ordered"=>boolean,"writeConcern"=>array]
     * @return \MongoDB\Driver\Cursor
     */
    public function del($collname, array $deletes, array $writeOps = [])
    {
        foreach ($deletes as &$_) {
            if (isset($_["q"]) && !$_["q"]) {
                $_["q"] = (Object)[];
            }
            if (isset($_["limit"]) && !$_["limit"]) {
                $_["limit"] = 0;
            }
        }
        $cmd = [
            "delete"    => $collname,
            "deletes"   => $deletes,
        ];
        $cmd += $writeOps;
        return $this->command($cmd);
    }
 
 
    /**
     * 更新数据
     * @param  string $collname
     * @param  array  $updates      [["q"=>query,"u"=>update,"upsert"=>boolean,"multi"=>boolean], ...]
     * @param  array  $writeOps     ["ordered"=>boolean,"writeConcern"=>array]
     * @return \MongoDB\Driver\Cursor
     */
    public function update($collname, array $updates, array $writeOps = [])
    {
        $cmd = [
            "update"    => $collname,
            "updates"   => $updates,
        ];
        $cmd += $writeOps;
        return $this->command($cmd);
    }
 
 
    /**
     * 查询
     * @param  string $collname
     * @param  array  $filter     [query]     参数详情请参见文档。
     * @return \MongoDB\Driver\Cursor
     */
    public function query($collname, array $filter, array $writeOps = [])
    {
        $cmd = [
            "find"      => $collname,
            "filter"    => $filter
        ];
        $cmd += $writeOps;
        return $this->command($cmd);
    }
 
 
    /**
     * 执行MongoDB命令
     * @param array $param
     * @return \MongoDB\Driver\Cursor
     */
    public function command(array $param)
    {
        $cmd = new MongoDB\Driver\Command($param);
        return $this->_conn->executeCommand($this->_db, $cmd);
    }
 
 
    /**
     * 获取当前mongoDB Manager
     * @return MongoDB\Driver\Manager
     */
    public function getMongoManager()
    {
        return $this->_conn;
    }
}
