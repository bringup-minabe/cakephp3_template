<?php
/**
 * BuildFileHelper
 *
 * リビジョン管理ファイル取得Helper
 + 
 */
namespace App\View\Helper;
use Cake\View\Helper;
use Cake\Routing\Router;

class BuildFileHelper extends Helper {

    public function initialize(array $config)
    {
        $this->BuildFiles = self::getBuildFiles();
    }

    /**
     * getBuildFiles
     *
     * @return object
     */
    public function getBuildFiles()
    {
        $build_files = [];

        $rev_file = file_get_contents(ROOT . DS . 'rev-manifest.json');

        if (!empty($rev_file)) {
            $build_files = json_decode($rev_file);
        }

        return $build_files;
    }

    /**
     * css
     *
     * @return string
     */
    public function css($file)
    {
        if (isset($this->BuildFiles->$file)) {
            return '<link rel="stylesheet" href="' . Router::url('/') . 'css_rev' . DS . $this->BuildFiles->$file . '">';
        } else {
            return null;
        }
    }

    /**
     * js
     *
     * @return string
     */
    public function js($file)
    {
        if (isset($this->BuildFiles->$file)) {
            return '<script type="text/javascript" src="' . Router::url('/') . 'js' . DS . 'rev' . DS . $this->BuildFiles->$file . '"></script>';
        } else {
            return null;
        }
    }

}