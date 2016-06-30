<?php
namespace App\Model\Behavior;

use Cake\ORM\Behavior;
use Cake\Utility\Text;

/**
 * 各テーブルクラスのinitializeで、$this->addBehavior('App'); で利用
 */
class AppBehavior extends Behavior
{
    function beforeSave($event, $entity, $options)
    {

		/**
		 * 新規保存時処理
		 */
		if ($entity->isNew()) {

			//uuidセット 
			$uuid = Text::uuid();
			$uuid = str_replace('-', '', $uuid);
			$entity->set('uuid', $uuid);
			
		}

        return true;
    }
}