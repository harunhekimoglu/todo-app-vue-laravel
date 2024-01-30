<?php

namespace App\Helpers;

use Illuminate\Support\Carbon;

class DateTimeHelper
{
    /**
     * getViewDateTimeMain
     *
     * @param  mixed $value
     * @param  string $format
     * @return string
     */
    private static function getViewDateTimeMain(mixed $value, string $format): string
    {
        if (!$value) {
            return "";
        }

        if (gettype($value) === 'string') {
            $value = new Carbon($value);
        }

        return $value->format($format);
    }

    /**
     * getViewDateTime
     *
     * @param  mixed $value
     * @return string
     */
    public static function getViewDateTime(mixed $value): string
    {
        return self::getViewDateTimeMain($value, 'Y/m/d H:i:s');
    }

    /**
     * getViewDate
     *
     * @param  mixed $value
     * @return string
     */
    public static function getViewDate(mixed $value): string
    {
        return self::getViewDateTimeMain($value, 'Y/m/d');
    }

    /**
     * getViewTime
     *
     * @param  mixed $value
     * @return string
     */
    public static function getViewTime(mixed $value): string
    {
        return self::getViewDateTimeMain($value, 'H:i:s');
    }
}
